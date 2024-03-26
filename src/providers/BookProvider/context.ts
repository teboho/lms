"use client";
import { createContext } from "react";

export interface BOOK_RESP_TYPE     {
    "name": string,
    "description": string,
    "type": number,
    "year": number,
    "imageURL": string,
    "isbn": string,
    "categoryId": number,
    "authorId": string,
    "id": number
}

export interface BOOK_CONTEXT_STATE_TYPE {
    isInProgress: boolean;
    isSuccess: boolean;
    isError: boolean;
    results: BOOK_RESP_TYPE[];
}

export const BOOK_CONTEXT_INITIAL_STATE = {
    isInProgress: false,
    isError: false,
    isSuccess: false,
    results: [{}]
}

/**
 * Default value that the provider will pass is an empty object
 */
export const BookContext = createContext({ });
