"use client";
import { get } from "https";
import { createContext } from "react";

export interface SessionUser {
    "id": number,
    "name": string,
    "surname": string,
    "userName": string,
    "emailAddress": string
}

export const SESSION_INITIAL_STATE = {
    "id": 0,
    "name": "",
    "surname": "",
    "userName": "",
    "emailAddress": ""
}

type getInfoType = () => void;

/**
 * Default value that the provider will pass is an empty object
 */
export const SessionContext = createContext({});
