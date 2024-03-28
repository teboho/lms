"use client"
import { useEffect, useReducer } from "react";
import AuthContext, { AUTH_INITIAL_STATE, AUTH_REQUEST_TYPE, AUTH_RESPONSE_TYPE, REGISTER_REQUEST_TYPE } from "./context";
import { authReducer } from "./reducer";
import { clearAuthAction, getUserErrorAction, getUserRequestAction, getUserSuccessAction, postAuthErrorAction, postAuthRequestAction, postAuthSuccessAction } from "./actions";
import { useRouter } from 'next/navigation';
import { message } from "antd";
import axios from "axios";

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
    // we will make the state with the reducers
    const [authState, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
    const { push } = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        // check if the user is logged in
        if (accessToken) {
            // if the user is logged in, then we should get the user info
            const userId = parseInt(localStorage.getItem("userId"));
            getUserInfo(userId);
        }
    }, []);

    const getUserInfo = (id: number): void => {
        // conduct the fetch and dispatch based on the response
        const endpoint = `/api/services/app/User/Get?Id=${id}`;

        const accessToken = localStorage.getItem("accessToken");
        const instance = makeAxiosInstance(accessToken);

        dispatch(getUserRequestAction());
        instance.get(endpoint)
            .then(response => {
                const data = response.data;
                console.log("User GET...", data);
                if (data.success) {
                    const res = data.result;
                    dispatch(getUserSuccessAction(res));
                    console.log("User GET success");
                } else {
                    console.log("User GET unsuccessful");
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(getUserErrorAction());
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
        // conduct the fetch and dispatch based on the response
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
            console.log("data", data);
            if (data.success) {
                const res: AUTH_RESPONSE_TYPE = data.result;
                dispatch(postAuthSuccessAction(res));
                console.log("Log in success");

                console.log("saving token", res.accessToken, "|", res.encryptedAccessToken)
                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("encryptedAccessToken", res.encryptedAccessToken);
                localStorage.setItem("expireInSeconds", res.expireInSeconds.toString());
                localStorage.setItem("userId", res.userId.toString());

                getUserInfo(res.userId);

                push("/Home");
            } else {
                console.log("Login is unsuccessful");
                fail();
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(postAuthErrorAction());
        })
    }

    function register(registerObj: REGISTER_REQUEST_TYPE): void {
        // conduct the fetch and dispatch based on the response
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
            console.log("data", data);
            if (data.success) {
                const res: AUTH_RESPONSE_TYPE = data.result;
                dispatch(postAuthSuccessAction(res));
                console.log("Register success");

                success();
                setTimeout(() => push("/Login"), 300);
            } else {
                console.log("Register is unsuccc");
                fail();
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(postAuthErrorAction());
        })
    }

    function logout(): void {
        localStorage.clear();
        push("/Login");
        
        messageApi.open({
            type: "success",
            content: "Logout Successful"
        })

        dispatch(clearAuthAction());
    }

    function refreshToken() {
        // ideally it would be better to record the time we first log in so that we can compare the lifespan of the token to how long it has existed since creation
    }

    function isLoggedIn(): boolean {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            return true;
        }
        return false;
    }

    function getUserId() {
        return authState.authObj.userId;
    }

    return (
        <AuthContext.Provider 
            value={{
                authObj: authState.authObj, 
                registerObj: authState.registerObj,
                userObj: authState.userObj, 
                login, 
                logout, 
                refreshToken, 
                fail, 
                register, 
                isLoggedIn, 
                getUserId,
                getUserInfo
        }}>
            {contextHolder}
            {children}
        </AuthContext.Provider>
    );
}