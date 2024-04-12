"use client";
import { createContext } from "react";

export type EmailType = {
    subject: string;
    message: string;
    toEmail: string;
}

export const emailInit = {
    subject: "",
    message: "",
    toEmail: ""
}

export type CommunicationContextValueType = {
    sendEmail: (email: EmailType) => void;
}

export const CommunicationContextValueDefault = {
    sendEmail: (email: EmailType) => {}
}

export type CommunicationContextStateType = {
    email?: EmailType;
    isError: boolean;
    isPending: boolean;
    isSuccess: boolean;
};

export const CommunicationContextStateInit: CommunicationContextStateType = {
    email: emailInit,
    isError: false,
    isPending: false,
    isSuccess: false
}

const CommunicationContext = createContext<CommunicationContextValueType>(CommunicationContextValueDefault);

export default CommunicationContext;