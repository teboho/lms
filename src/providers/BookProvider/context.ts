"use client";
import { createContext } from "react";

export interface SEARCH_OBJ_TYPE {
    "accessToken": string;
    "encryptedAccessToken": string;
    "expireInSeconds": number;
    "userId": number;
  }

export interface SEARCH_CONTEXT_STATE_TYPE {
    isInProgress: boolean;
    isSuccess: boolean;
    isError: boolean;
    results: object[];
}

export const SEARCH_CONTEXT_INITIAL_STATE = {
    isInProgress: false,
    isError: false,
    isSuccess: false,
    results: [{ }]
}

/**
 * Default value that the provider will pass is an empty object
 */
export const SearchContext = createContext({ });
