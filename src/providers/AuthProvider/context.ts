"use client";
import { register } from "module";
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

export interface REGISTER_RESP_TYPE {
    "userName": string,
    "name": string,
    "surname": string,
    "emailAddress": string,
    "isActive": false,
    "fullName": string,
    "lastLoginTime": string,
    "creationTime": string,
    "roleNames": Array<string>,
    "id": 0
}
export interface REGISTER_REQ_TYPE {
    "userName": string,
    "name": string,
    "surname": string,
    "emailAddress": string,
    "isActive": boolean,
    "roleNames": [
        string
    ],
    "password": string
}

export const AUTH_CONTEXT_INITIAL_STATE = {
    isInProgress: false,
    isError: false,
    isSuccess: false,
    authObj: {
        "accessToken": "",
        "encryptedAccessToken": "",
        "expireInSeconds": 0,
        "userId": 0
      },
    registerObj: {
        "userName": "",
        "name": "",
        "surname": "",
        "emailAddress": "",
        "isActive": false,
        "fullName": "",
        "lastLoginTime": "",
        "creationTime": "2024-03-25T11:34:09.5656397+02:00",
        "roleNames": [""],
        "id": 0
      },
}

/**
 * Default value that the provider will pass is an empty object
 */
export const AuthContext = createContext({ });
