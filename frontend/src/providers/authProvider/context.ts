"use client";
import { createContext } from "react";

export interface AUTH_RESPONSE_TYPE {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: number;
}

export interface REGISTER_RESPONSE_TYPE {
    "userName": string,
    "name": string,
    "surname": string,
    "emailAddress": string,
    "isActive": boolean,
    "fullName": string,
    "lastLoginTime": string,
    "creationTime": string,
    "roleNames": string[],
    "id": number
}

export interface UserType {
    "id": number,
    "name": string,
    "surname": string,
    "userName": string,
    "emailAddress": string,
    roleNames?: string[],
    fullName?: string
}

export interface AUTH_REQUEST_TYPE {
    "userNameOrEmailAddress": string;
    "password": string;
    "rememberClient": boolean;
}

export interface REGISTER_REQUEST_TYPE {
    "userName": string,
    "name": string,
    "surname": string,
    "emailAddress": string,
    "isActive": boolean,
    "roleNames": string[],
    "password": string
}

export const AUTH_REQUEST_INIT = {
    "userNameOrEmailAddress": "",
    "password": "",
    "rememberClient": false
}

export const REGISTER_REQUEST_INIT = {
    "userName": "",
    "name": "",
    "surname": "",
    "emailAddress": "",
    "isActive": false,
    "roleNames": [
        ""
    ],
    "password": ""
}

export const User_Init: UserType = {
    "id": 0,
    "name": "",
    "surname": "",
    "userName": "",
    "emailAddress": "",
    roleNames: [""],
    fullName: ""
}

export interface AuthContextStateType {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    profilePic?: string;
    authObj?: AUTH_RESPONSE_TYPE;
    registerObj?: REGISTER_RESPONSE_TYPE;
    userObj?: UserType;
}

export const AuthContextStateInit: AuthContextStateType = {
    isPending: false,
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
        "creationTime": "",
        "roleNames": [""],
        "id": 0
    },
    userObj: User_Init,
    profilePic: ""
}

// auth value type
export interface AuthValueType {
    authObj?: AUTH_RESPONSE_TYPE;
    registerObj?: REGISTER_RESPONSE_TYPE;
    userObj?: UserType;
    login: (authObj: AUTH_REQUEST_TYPE) => void;
    logout: () => void;
    refreshToken: () => void;
    fail: () => void;
    register: (registerObj: REGISTER_REQUEST_TYPE) => void;
    getUserInfo: (id: number) => void;
    isLoggedIn: () => boolean;
    getUserId: () => number;
    getPatronInfo: (id: number) => Promise<UserType>;
    getProfilePic: () => string;
}

/**
 * Default value that the provider will pass down to the children
 */
const AuthContext = createContext<AuthValueType>({
    authObj: AuthContextStateInit.authObj, 
    registerObj: AuthContextStateInit.registerObj, 
    userObj: User_Init,
    login: (authObj: AUTH_REQUEST_TYPE) => {}, 
    logout: () => {}, 
    refreshToken: () => {}, 
    fail: () => {}, 
    register: (registerObj: REGISTER_REQUEST_TYPE) => {}, 
    getUserInfo: (id: number) => {},
    isLoggedIn: () => false, 
    getUserId: () => 0,
    getPatronInfo: (id: number) => Promise.resolve(User_Init),
    getProfilePic: () => ""
});

export default AuthContext;