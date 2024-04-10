"use client"
import { useEffect, useReducer } from "react";
import AuthContext, { AUTH_INITIAL_STATE, AUTH_REQUEST_TYPE, AUTH_RESPONSE_TYPE, REGISTER_REQUEST_TYPE, UserType } from "./context";
import { authReducer } from "./reducer";
import { clearAuthAction, getUserErrorAction, getUserRequestAction, getUserSuccessAction, postAuthErrorAction, postAuthRequestAction, postAuthSuccessAction } from "./actions";
import { useRouter } from 'next/navigation';
import { message } from "antd";
import axios from "axios";
import Utils from "@/utils";
import { jwtDecode } from "jwt-decode";

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 
 * @param accessToken access token
 * @returns an axios instance
 */
export function makeAxiosInstance(accessToken:string) {
    return axios.create({
        baseURL: baseURL,
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [authState, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const { push } = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    
    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        if (accessToken) {
            dispatch(postAuthSuccessAction({
                accessToken: accessToken,
                encryptedAccessToken: localStorage.getItem("encryptedAccessToken"),
                expireInSeconds: parseInt(localStorage.getItem("expireInSeconds")),
                userId: parseInt(localStorage.getItem("userId"))
            }));

            const userId = parseInt(localStorage.getItem("userId"));
            getUserInfo(userId);
            
            console.log("AuthProvider mounts for the first time.");
        }
    }, []);

    const getUserInfo = (id: number): void => {
        const endpoint = `/api/services/app/User/Get?Id=${id}`;

        dispatch(getUserRequestAction());
        instance.get(endpoint)
            .then(response => {
                const data = response.data;
                if (data.success) {
                    const res = data.result;
                    dispatch(getUserSuccessAction(res));
                } else {
                    throw new Error("Login unsuccessful");
                }
            })
            .catch(error => {
                dispatch(getUserErrorAction());
            });
    }

    /**
     * 
     * @param id user id
     * @returns the user object in a promise
     */
    const getPatronInfo = async (id: number): Promise<UserType> => {
        const endpoint = `/api/services/app/User/Get?Id=${id}`;

        const accessToken = Utils.getAccessToken(); 
        const instance = makeAxiosInstance(accessToken);

        return instance.get(endpoint)
            .then(response => {
                return response.data.result;
            })
            .catch(error => {
                console.log(error);
            });
    }

    const fail = (): void => {
        messageApi.open({
            type: "error",
            content: "Login Attempt Unsuccessful"
        })
    }

    const success = (): void => {
        messageApi.open({
            type: "success",
            content: "Registeration Attempt Successful"
        })
    }

    /**
     * 
     * @param authObj login object
     */
    function login(authObj: AUTH_REQUEST_TYPE): void {
        const endpoint = baseURL + "/api/TokenAuth/Authenticate";
        
        dispatch(postAuthRequestAction());
        fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(authObj),
            mode: "cors"
        }).then(res => res.json())
        .then(data => {
            if (data.success) {
                const res = data.result;
                dispatch(postAuthSuccessAction(res));

                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("encryptedAccessToken", res.encryptedAccessToken);
                localStorage.setItem("expireInSeconds", res.expireInSeconds.toString());
                localStorage.setItem("userId", res.userId.toString());

                getUserInfo(res.userId);

                window.location.href = "/";
            } else {
                fail();
                throw new Error();
            }
        })
        .catch(err => {
            dispatch(postAuthErrorAction());
        })
    }

    /**
     * 
     * @param registerObj registration object
     */
    function register(registerObj: REGISTER_REQUEST_TYPE): void {
        const endpoint = baseURL + "/api/services/app/User/Create";
        
        dispatch(postAuthRequestAction());
        fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(registerObj),
            mode: "cors"
        }).then(res => res.json())
        .then(data => {
            if (data.success) {
                const res: AUTH_RESPONSE_TYPE = data.result;
                dispatch(postAuthSuccessAction(res));

                success();
                setTimeout(() => push("/login"), 300);
            } else {
                fail();
                throw new Error("Registration unsuccessful");
            }
        })
        .catch(err => {
            dispatch(postAuthErrorAction());
        })
    }

    /**
     * Logs the user out
     */
    function logout(): void {
        push("/login");
        
        localStorage.clear();
        messageApi.open({
            type: "success",
            content: "Logout Successful"
        })

        dispatch(clearAuthAction());
    }

    function refreshToken() {
        // ideally it would be better to record the time we first log in so that we can compare the lifespan of the token to how long it has existed since creation
    }

    /**
     * 
     * @returns whether the user is logged in or not
     */
    function isLoggedIn(): boolean {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            return true;
        }
        return false;
    }

    /**
     * 
     * @returns the user id
     */
    function getUserId(): number {
        if (authState.authObj) return authState.authObj.userId;
        else {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                const decoded = jwtDecode(accessToken);
                return Number.parseInt(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            }
        }
    }

    return (
        <AuthContext.Provider 
            value={{
                authObj: authState?.authObj, 
                registerObj: authState.registerObj,
                userObj: authState.userObj, 
                login, 
                logout, 
                refreshToken, 
                fail, 
                register, 
                isLoggedIn, 
                getUserId,
                getUserInfo,
                getPatronInfo
        }}>
            {contextHolder}
            {children}
        </AuthContext.Provider>
    );
}