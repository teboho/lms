"use client";
import { createContext } from "react";

export interface Admin_OBJ_TYPE {
    "accessToken": string;
    "encryptedAccessToken": string;
    "expireInSeconds": number;
    "userId": number;
  }

export interface Admin_CONTEXT_STATE_TYPE {
    isInProgress: boolean;
    isSuccess: boolean;
    isError: boolean;
    AdminObj?: Admin_OBJ_TYPE;
}

export interface Admin_REQUEST_TYPE {
    "userNameOrEmailAddress": string;
    "password": string;
    "rememberClient": boolean;
}

export const Admin_CONTEXT_INITIAL_STATE = {
    isInProgress: false,
    isError: false,
    isSuccess: false,
    AdminObj: {
        "accessToken": "string",
        "encryptedAccessToken": "string",
        "expireInSeconds": 0,
        "userId": 0
      }
}

/**
 * Default value that the provider will pass is an empty object
 */
export const AdminContext = createContext({ });
