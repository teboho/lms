"use client"
import { Provider, useReducer } from "react";
import { SESSION_INITIAL_STATE, SessionContext, SessionUser,} from "./context";
import { sessionReducer } from "./reducer";
import { postSessionErrorAction, postSessionRequestAction, postSessionSuccessAction } from "./actions";
import { useRouter } from 'next/navigation';
import { message } from "antd";
import axios from "axios";
import { baseURL } from "../AuthProvider";

export default function SessionProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [sessionState, dispatch] = useReducer(sessionReducer, SESSION_INITIAL_STATE);
    const [messageApi, contextHolder] = message.useMessage();

    const fail = (): void => {
        messageApi.open({
            type: "error",
            content: "Login Attempt Unsuccessful"
        })
    }

    
    const accessToken = localStorage.getItem("accessToken");
    const instance = axios.create({
        baseURL: baseURL,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    
    function getCurrentLoginInformations(): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = "/api/services/app/Session/GetCurrentLoginInformations";

        instance.get(endpoint)
            .then(response => {
                const data = response.data;
                console.log("data", data);
                if (data.success) {
                    const res = data.result.user;
                    dispatch(postSessionSuccessAction(res));
                    console.log("GetCurrentLoginInformations success");
                    // getUserInformations()
                } else {
                    console.log("GetCurrentLoginInformations unsuccessful");
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(postSessionErrorAction());
            });
    }

    function getUserInformations(id: number): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = `/api/services/app/User/Get?Id=${id}`;

        instance.get(endpoint)
            .then(response => {
                const data = response.data;
                console.log("data", data);
                if (data.success) {
                    const res = data.result.user;
                    dispatch(postSessionSuccessAction(res));
                    console.log("getUserInformations success");
                } else {
                    console.log("getUserInformations unsuccessful");
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(postSessionErrorAction());
            });
    }

    return (
        <SessionContext.Provider value={{ getInfo: getCurrentLoginInformations, sessionState }}>
            {contextHolder}
            {children}
        </SessionContext.Provider>
    );
}