"use client";
import { get } from "http";
import { createContext } from "react";

export interface AuthorDataType {
    firstName: string;
    lastName: string;
    id: string;
}

export const AuthorInitialData: AuthorDataType = {
    firstName: "",
    lastName: "",
    id: ""
};

export interface AuthorsContextStateType {
    author?: AuthorDataType;
    authors?: AuthorDataType[];
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
};

export const AuthorsContextStateInit: AuthorsContextStateType = {
    author: AuthorInitialData,
    authors: [AuthorInitialData],
    isPending: false,
    isSuccess: false,
    isError: false,
};

export const AuthorsContextDefaultValue = {
    setAuthors: (authors: AuthorDataType[]) => {},
    getAuthors: () => {},
    getAuthor: (authorsId: string) => {},
    authorsState: AuthorsContextStateInit,
    getAuthorById: (id: string) => AuthorInitialData,
    _getAuthor: (id: string) => AuthorInitialData,
};

export interface AuthorsContextValueType {
    setAuthors: (authors: AuthorDataType[]) => void;
    getAuthors: () => void;
    getAuthor: (authorsId: string) => void;
    authorsState: AuthorsContextStateType;
    getAuthorById: (id: string) => AuthorDataType | undefined;
    _getAuthor: (id: string) => AuthorDataType;
}

/**
 * Default value that the provider will pass is an empty object
 */
const AuthorsContext = createContext<AuthorsContextValueType>(AuthorsContextDefaultValue);

export default AuthorsContext;