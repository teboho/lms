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

export type communicationContextType = {
    sendEmail: (email: EmailType) => void;
}

export const communicationContextDefault = {
    sendEmail: (email: EmailType) => {}
}

export type communicationStateType = {
    email: EmailType;
    isError: boolean;
    isPending: boolean;
    isSuccess: boolean;
};

export const communicationInitialState: communicationStateType = {
    email: emailInit,
    isError: false,
    isPending: false,
    isSuccess: false
}

const CommunicationContext = createContext<communicationContextType>(communicationContextDefault);

export default CommunicationContext;