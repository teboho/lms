"use client"
import { Provider, useReducer } from "react";
import { AUTH_CONTEXT_INITIAL_STATE, AUTH_REQUEST_TYPE, AuthContext, AUTH_OBJ_TYPE, REGISTER_REQ_TYPE } from "./context";
import { authReducer } from "./reducer";
import { postAuthErrorAction, postAuthRequestAction, postAuthSuccessAction } from "./actions";
import { useRouter } from 'next/navigation';
import { message } from "antd";

export const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [authState, dispatch] = useReducer(authReducer, AUTH_CONTEXT_INITIAL_STATE);
    const { push } = useRouter();
    const [messageApi, contextHolder] = message.useMessage();

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
     * @param loginObj login object
     */
    function login(loginObj: AUTH_REQUEST_TYPE): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = baseURL + "api/TokenAuth/Authenticate";
        
        fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(loginObj),
            mode: "cors"
        }).then(res => res.json())
        .then(data => {
            console.log("data", data);
            if (data.success) {
                const res: AUTH_OBJ_TYPE = data.result;
                dispatch(postAuthSuccessAction(res));
                console.log("Log in success");

                localStorage.setItem("accessToken", res.accessToken);
                localStorage.setItem("encryptedAccessToken", res.encryptedAccessToken);

                push("/Home");
            } else {
                console.log("Login is unsuccc");
                fail();
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(postAuthErrorAction());
        })
    }

    function register(registerObj: REGISTER_REQ_TYPE): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = baseURL + "api/services/app/User/Create";
        
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
                const res: AUTH_OBJ_TYPE = data.result;
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

    return (
        <AuthContext.Provider value={{authObj: authState.authObj, registerObj: authState.registerObj, login, logout, refreshToken, fail, register, isLoggedIn}}>
            {contextHolder}
            {children}
        </AuthContext.Provider>
    );
}