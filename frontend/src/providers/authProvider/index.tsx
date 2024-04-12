"use client"
import { useEffect, useMemo, useReducer } from "react";
import AuthContext, { AuthContextStateInit, AUTH_REQUEST_TYPE, AUTH_RESPONSE_TYPE, REGISTER_REQUEST_TYPE, UserType } from "./context";
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
 * @param accessToken? the access token
 * @returns an axios instance
 */
export function makeAxiosInstance(accessToken?:string) {
    return axios.create({
        baseURL: baseURL,
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(authReducer, AuthContextStateInit);
    const { push } = useRouter();
    const [messageApi, contextHolder] = message.useMessage();
    
    let accessToken = useMemo(() => state.authObj?.accessToken, [state.authObj]);
    let encryptedAccessToken = useMemo(() => state.authObj?.encryptedAccessToken, [state.authObj]);
    let expireInSeconds = useMemo(() => state.authObj?.expireInSeconds, [state.authObj]);
    let userId = useMemo(() => state.authObj?.userId, [state.authObj]);
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        const sessionAuthObject: AUTH_RESPONSE_TYPE = {
            accessToken: sessionStorage.getItem("accessToken"),
            encryptedAccessToken: sessionStorage.getItem("encryptedAccessToken"),
            expireInSeconds: Number.parseInt(sessionStorage.getItem("expireInSeconds")),
            userId: Number.parseInt(sessionStorage.getItem("userId"))
        }
        if (accessToken) {
            dispatch(postAuthSuccessAction(sessionAuthObject));

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

        // const accessToken = Utils.getAccessToken(); 
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
                const res: AUTH_RESPONSE_TYPE = data.result;
                dispatch(postAuthSuccessAction(res));

                // localStorage.setItem("accessToken", res.accessToken);
                sessionStorage.setItem("accessToken", res.accessToken);
                // localStorage.setItem("encryptedAccessToken", res.encryptedAccessToken);
                sessionStorage.setItem("encryptedAccessToken", res.encryptedAccessToken);
                // localStorage.setItem("expireInSeconds", res.expireInSeconds.toString())
                sessionStorage.setItem("expireInSeconds", res.expireInSeconds.toString());
                // localStorage.setItem("userId", res.userId.toString());
                sessionStorage.setItem("userId", res.userId.toString());

                getUserInfo(res.userId);

                push("/");
            } else {
                fail();
                dispatch(postAuthErrorAction());
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
        
        sessionStorage.clear();
        messageApi.open({
            type: "success",
            content: "Logout Successful"
        })

        dispatch(clearAuthAction());
        // clear the entire application state
                
    }

    function refreshToken() {
        // ideally it would be better to record the time we first log in so that we can compare the lifespan of the token to how long it has existed since creation
    }

    /**
     * 
     * @returns whether the user is logged in or not
     */
    function isLoggedIn(): boolean {
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
        if (state.authObj) return state.authObj.userId;
        else {
            if (accessToken) {
                const decoded = jwtDecode(accessToken);
                return Number.parseInt(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
            }
        }
    }

    function getProfilePic() {
        return state?.profilePic;
    }

    return (
        <AuthContext.Provider 
            value={{
                authObj: state.authObj, 
                registerObj: state.registerObj,
                userObj: state.userObj, 
                login, 
                logout, 
                refreshToken, 
                fail, 
                register, 
                isLoggedIn, 
                getUserId,
                getUserInfo,
                getPatronInfo, getProfilePic
        }}>
            {contextHolder}
            {children}
        </AuthContext.Provider>
    );
}