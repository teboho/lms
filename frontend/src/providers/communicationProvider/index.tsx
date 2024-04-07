"use client";

import { useEffect, useReducer } from "react";
import { communicationReducer } from "./reducer";
import CommunicationContext, { communicationInitialState, EmailType } from "./context";
import { makeAxiosInstance } from "../authProvider";
import Utils from "@/utils";
import { message } from "antd";
import { sendEmailErrorAction, sendEmailRequestAction, sendEmailSuccessAction } from "./actions";

const CommunicationProvider = ({ children }: { children: React.ReactNode }) => {
    // we will make the state with the reducers
    const [state, dispatch] = useReducer(communicationReducer, communicationInitialState);
    const [messageApi, contextHolder] = message.useMessage();
    
    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        console.log("Communication Provider is mounted");
    }, []);

    const sendEmail = (email: EmailType) => {
        const endpoint = "api/services/app/Communication/SendEmail";
        dispatch(sendEmailRequestAction());
        instance.post(`${endpoint}`, email)
            .then(res => {
                console.log("results", res.data);
                if (res.data.success) {
                    dispatch(sendEmailSuccessAction(res.data.result));
                    messageApi.success("Email sent successfully");
                } else {
                    dispatch(sendEmailErrorAction());
                    messageApi.error("Email failed to send");
                }
            })
            .catch(() => {
                dispatch(sendEmailErrorAction());
                messageApi.error("Email failed to send");
            });
    }

    return (
        <CommunicationContext.Provider value={{ sendEmail }}>
            {children}
            {contextHolder}
        </CommunicationContext.Provider>
    );
}

export default CommunicationProvider;