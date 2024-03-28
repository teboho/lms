"use client"
import { Provider, useReducer } from "react";
import { USER_INITIAL_STATE, UserContext, UserUser,} from "./context";
import { userReducer } from "./reducer";
import { getUserErrorAction, getUserRequestAction, getUserSuccessAction } from "./actions";
import { useRouter } from 'next/navigation';
import { message } from "antd";
import axios from "axios";
import { baseURL } from "../AuthProvider";

export default function UserProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [userState, dispatch] = useReducer(userReducer, USER_INITIAL_STATE);
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
    
    function getUserProfile(id: number): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = `/api/services/app/User/Get?Id=${id}`;

        instance.get(endpoint)
            .then(response => {
                const data = response.data;
                console.log("data", data.result);
                if (data.success) {
                    const res = data.result;
                    dispatch(getUserSuccessAction(res));
                    console.log("getUserInformations success");
                } else {
                    console.log("getUserInformations unsuccessful");
                }
            })
            .catch(error => {
                console.log(error);
                dispatch(getUserErrorAction());
            });
    }

    return (
        <UserContext.Provider value={{ getUserProfile, userState }}>
            {contextHolder}
            {children}
        </UserContext.Provider>
    );
}