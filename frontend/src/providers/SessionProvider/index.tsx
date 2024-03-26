"use client"
import { Provider, useReducer } from "react";
import { SESSION_INITIAL_STATE, SessionContext, SessionUser,} from "./context";
import { sessionReducer } from "./reducer";
import { postSessionErrorAction, postSessionRequestAction, postSessionSuccessAction } from "./actions";
import { useRouter } from 'next/navigation';
import { message } from "antd";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

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
    
    function getCurrentLoginInformations(): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = apiURL + "api/services/app/Session/GetCurrentLoginInformations";
        const accessToken = localStorage.getItem("accessToken");
        fetch(endpoint, {
            headers: {
                "Content-Type": "*/*",
                "Authorization": `Bearer ${accessToken}`
            },
        }).then(res => res.json())
        .then(data => {
            console.log("data", data);
            if (data.success) {
                const res: SessionUser = data.result.user;
                dispatch(postSessionSuccessAction(res));
                console.log("GetCurrentLoginInformations success");
                // console.log(res)

            } else {
                console.log("GetCurrentLoginInformations unsuccessful");
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(postSessionErrorAction());
        })
    }


    return (
        <SessionContext.Provider value={{ getInfo: getCurrentLoginInformations, sessionState }}>
            {contextHolder}
            {children}
        </SessionContext.Provider>
    );
}