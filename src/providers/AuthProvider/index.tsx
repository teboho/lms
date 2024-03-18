"use client"
import { Provider, useReducer } from "react";
import { AUTH_CONTEXT_INITIAL_STATE, AUTH_REQUEST_TYPE, AuthContext } from "./context";
import { authReducer } from "./reducer";
import { postAuthErrorAction, postAuthRequestAction, postAuthSuccessAction } from "./actions";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [authState, dispatch] = useReducer(authReducer, { });

    /**
     * 
     * @param loginObj login object
     */
    function login(loginObj: AUTH_REQUEST_TYPE): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = apiURL + "api/TokenAuth/Authenticate";
        console.log(endpoint);
        console.log(loginObj);
        
        fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(loginObj),
            mode: "cors"
        }).then(res => res.json())
        .then(data => {
            console.log(data.result);
            if (data.result.success) {
                dispatch(postAuthSuccessAction(data.result))
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(postAuthErrorAction());
        })
    }
    function logout(): void {

    }
    function refreshToken() {

    }

    return (
        <AuthContext.Provider value={{authObj: authState.authObj, login, logout, refreshToken}}>
            {children}
        </AuthContext.Provider>
    );
}