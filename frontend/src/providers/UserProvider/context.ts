"use client";
import { get } from "https";
import { createContext } from "react";

export interface User {
    "id": number,
    "name": string,
    "surname": string,
    "userName": string,
    "emailAddress": string,
    roleNames?: string[],
    fullName?: string
}

export const USER_INITIAL_STATE = {
    "id": 0,
    "name": "",
    "surname": "",
    "userName": "",
    "emailAddress": "",
    roleNames: Array<string>(),
    fullName: ""
}

type getInfoType = () => void;

/**
 * Default value that the provider will pass is an empty object
 */
export const UserContext = createContext<{}>({});
