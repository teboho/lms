"use client";
import { Preferences } from "@/app/(authorized)/Survey/page";
import { createContext } from "react";

export interface BOOK {
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
    results: BOOK[];
    bookObj: BOOK;
}

export const BOOK_CONTEXT_INITIAL_STATE: BOOK_CONTEXT_STATE_TYPE = {
    isInProgress: false,
    isError: false,
    isSuccess: false,
    results: [],
    bookObj: undefined
}

/**
 * Default value that the provider will pass is an empty object
 */
export const BookContext = createContext({bookState: BOOK_CONTEXT_INITIAL_STATE, search: function (term: string) {}, savePreferences: (prefs: Preferences) => {}, getBook: (bookId: string) => {}});
