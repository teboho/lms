"use client";
import { createContext } from "react";

export interface History_Type {
    "accessToken": string;
    "encryptedAccessToken": string;
    "expireInSeconds": number;
    "userId": number;
  }

export interface History_CONTEXT_STATE_TYPE {
    isInProgress: boolean;
    isSuccess: boolean;
    isError: boolean;
    history?: History_Type;
    historyData?: History_Type[];
}

export interface History_REQUEST_TYPE {
    "userNameOrEmailAddress": string;
    "password": string;
    "rememberClient": boolean;
}

export const HISTORY_CONTEXT_INITIAL_STATE = {
    isInProgress: false,
    isError: false,
    isSuccess: false,
    history: {
        "accessToken": "string",
        "encryptedAccessToken": "string",
        "expireInSeconds": 0,
        "userId": 0
    },
    historyData: [] as History_Type[]
}

export interface HistoryContextType {
    history: History_Type;
    historyData: History_Type[];
    getHistoryData: () => void;
}

/**
 * Default value that the provider will pass is an empty object
 */
export const HistoryContext = createContext({ });
