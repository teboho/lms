"use client";
import { Preferences } from "@/app/(authorized)/Patron/Survey/page";
import { createContext } from "react";

export enum BookType {
    "Physical",
    "Digital",
    "Both",
}

export interface BookDataType {
    "name": string,
    "description": string,
    "type": BookType,
    "year": number,
    "imageURL": string,
    "isbn": string,
    "categoryId": number,
    "authorId": string,
    "id": number
}

export const BOOK_INIT: BookDataType = {
    "name": "",
    "description": "",
    "type": 0,
    "year": 0,
    "imageURL": "",
    "isbn": "",
    "categoryId": 0,
    "authorId": "",
    "id": 0
}

export interface BOOK_STATE_TYPE {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    books: BookDataType[] | undefined;
    book: BookDataType | undefined;
    searchTerm: string;
}

export const BOOK_CONTEXT_INITIAL_STATE: BOOK_STATE_TYPE = {
    isPending: false,
    isError: false,
    isSuccess: false,
    books: undefined,
    book: BOOK_INIT,
    searchTerm: ""
}

export interface BookContextType {
    book: BookDataType;
    books: BookDataType[];
    search: (term: string) => void;
    savePreferences: (prefs: Preferences) => void;
    getBook: (bookId: string) => void;
    getAll: () => void;
    searchTerm: string;
}

/**
 * Default value that the provider will pass is an empty object
 */
const BookContext = createContext<BookContextType>({ 
    book: BOOK_INIT,
    books: [],
    search: function (term: string) {}, 
    savePreferences: (prefs: Preferences) => {}, 
    getBook: (bookId: string) => {}, 
    getAll: () => {},
    searchTerm: ""
});

export default BookContext;