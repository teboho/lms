"use client";
import { createContext } from "react";

export interface History_OBJ_TYPE {
    "accessToken": string;
    "encryptedAccessToken": string;
    "expireInSeconds": number;
    "userId": number;
  }

export interface History_CONTEXT_STATE_TYPE {
    isInProgress: boolean;
    isSuccess: boolean;
    isError: boolean;
    HistoryObj?: History_OBJ_TYPE;
}

export interface History_REQUEST_TYPE {
    "userNameOrEmailAddress": string;
    "password": string;
    "rememberClient": boolean;
}

export const History_CONTEXT_INITIAL_STATE = {
    isInProgress: false,
    isError: false,
    isSuccess: false,
    HistoryObj: {
        "accessToken": "string",
        "encryptedAccessToken": "string",
        "expireInSeconds": 0,
        "userId": 0
      }
}

/**
 * Default value that the provider will pass is an empty object
 */
export const HistoryContext = createContext({ });
