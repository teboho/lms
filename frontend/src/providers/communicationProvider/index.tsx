"use client";
import { useContext, useEffect, useMemo, useReducer } from "react";
import { communicationReducer } from "./reducer";
import CommunicationContext, { CommunicationContextStateInit, EmailType } from "./context";
import { makeAxiosInstance } from "../authProvider";
import Utils from "@/utils";
import { message } from "antd";
import { sendEmailErrorAction, sendEmailRequestAction, sendEmailSuccessAction } from "./actions";
import AuthContext from "../authProvider/context";

const CommunicationProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(communicationReducer, CommunicationContextStateInit);
    const {authObj} = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();
    
    let accessToken = useMemo(() => authObj?.accessToken, []);
    accessToken = useMemo(() => authObj?.accessToken, [authObj]);
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        console.log("Communication Provider is mounted");
    }, []);

    const sendEmail = (email: EmailType) => {
        const endpoint = "api/services/app/Communication/SendEmail";
        dispatch(sendEmailRequestAction());
        instance.post(`${endpoint}`, email)
            .then(res => {
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