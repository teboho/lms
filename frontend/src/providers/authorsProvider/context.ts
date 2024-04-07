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

export interface AuthorsContextType {
    author: AuthorDataType;
    authors: AuthorDataType[];
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
};

export const AuthorsContextInit: AuthorsContextType = {
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
    authorsState: AuthorsContextInit,
    getAuthorById: (id: string) => AuthorInitialData,
    _getAuthor: (id: string) => AuthorInitialData,
};

export interface AuthorsContextValueType {
    setAuthors: (authors: AuthorDataType[]) => void;
    getAuthors: () => void;
    getAuthor: (authorsId: string) => void;
    authorsState: AuthorsContextType;
    getAuthorById: (id: string) => AuthorDataType | undefined;
    _getAuthor: (id: string) => AuthorDataType;
}

/**
 * Default value that the provider will pass is an empty object
 */
const AuthorsContext = createContext<AuthorsContextValueType>(AuthorsContextDefaultValue);

export default AuthorsContext;