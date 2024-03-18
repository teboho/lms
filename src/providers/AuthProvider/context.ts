"use client";
import { createContext } from "react";

export interface AUTH_OBJ_TYPE {
    "accessToken": string;
    "encryptedAccessToken": string;
    "expireInSeconds": number;
    "userId": number;
  }

export interface AUTH_CONTEXT_STATE_TYPE {
    isInProgress: boolean;
    isSuccess: boolean;
    isError: boolean;
    authObj?: AUTH_OBJ_TYPE;
}

export interface AUTH_REQUEST_TYPE {
    "userNameOrEmailAddress": string;
    "password": string;
    "rememberClient": boolean;
}

export const AUTH_CONTEXT_INITIAL_STATE = {
    isInProgress: false,
    isError: false,
    isSuccess: false,
    authObj: {
        "accessToken": "string",
        "encryptedAccessToken": "string",
        "expireInSeconds": 0,
        "userId": 0
      }
}

/**
 * Default value that the provider will pass is an empty object
 */
export const AuthContext = createContext({ });
