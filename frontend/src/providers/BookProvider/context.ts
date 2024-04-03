"use client";
import { Preferences } from "@/app/(authorized)/Patron/Survey/page";
import { createContext } from "react";
import { CATEGORY_INIT, CategoryType } from "../CategoryProvider/context";
import { AuthorDataType, AuthorInitialData } from "../AuthorsProvider/context";
import { CreateBookType } from "./types";

export enum BookType {
    "Physical",
    "Digital",
    "Both",
}

export interface BookDataType {
    name: string,
    description: string,
    type: BookType,
    year: number,
    imageURL: string,
    isbn: string,
    categoryId: string,
    authorId: string,
    id: string
}


export const BOOK_INIT: BookDataType = {
    "name": "",
    "description": "",
    "type": 0,
    "year": 0,
    "imageURL": "",
    "isbn": "",
    "categoryId": "",
    "authorId": "",
    "id": ""
}

export interface BOOK_STATE_TYPE {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    books: BookDataType[] | undefined;
    book?: BookDataType;
    searchTerm: string;
    searchBooks?: SearchBookType;
}

export const BOOK_CONTEXT_INITIAL_STATE: BOOK_STATE_TYPE = {
    isPending: false,
    isError: false,
    isSuccess: false,
    books: undefined,
    book: BOOK_INIT,
    searchTerm: "",
    searchBooks: undefined
}

export interface BookContextType {
    book: BookDataType;
    books: BookDataType[];
    searchBooks?: SearchBookType;
    search: (term: string) => void;
    savePreferences: (prefs: Preferences) => void;
    getBook: (bookId: string) => void;
    getAll: () => void;
    searchTerm: string;
    searchDB: (term: string) => void;
    /**
     * adding new book to the db
     * @param book new book dto
     * @returns void
     */
    sendBook: (book: CreateBookType) => void;
}


export interface SearchBookDataType {
    item1?: BookDataType;
    item2?: CategoryType;
    item3?: AuthorDataType;
}

export const SearchBookInit = {
    item1: BOOK_INIT,
    item2: CATEGORY_INIT,
    item3: AuthorInitialData
}

export interface SearchBookType {
    result?: SearchBookDataType[];
}

export const SearchBookInitState: SearchBookType = {
    result: [SearchBookInit]
}

/**
 * Default value that the provider will pass is an empty object
 */
const BookContext = createContext<BookContextType>({ 
    book: BOOK_INIT,
    books: [],
    searchBooks: SearchBookInitState,
    search: function (term: string) {}, 
    savePreferences: (prefs: Preferences) => {}, 
    getBook: (bookId: string) => {}, 
    getAll: () => {},
    searchTerm: "",
    searchDB: (term: string) => {},
    sendBook: (book: CreateBookType) => {}
});

export default BookContext;