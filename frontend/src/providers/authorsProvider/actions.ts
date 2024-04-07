"use client";
import { createAction } from "redux-actions";
import { AuthorDataType, AuthorsContextType, AuthorsContextValueType } from "./context";

export const AuthorsActionEnums = {
    GetAuthorsRequest: "GET_AUTHORS_REQUEST",
    GetAuthorsSuccess: "GET_AUTHORS_SUCCESS",
    GetAuthorsError: "GET_AUTHORS_ERROR",

    GetAuthorRequest: "GET_AUTHOR_REQUEST",
    GetAuthorSuccess: "GET_AUTHOR_SUCCESS",
    GetAuthorError: "GET_AUTHOR_ERROR",
}

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getAuthorsRequestAction = createAction(
    AuthorsActionEnums.GetAuthorsRequest,
    (): AuthorsContextType => ({ isSuccess: false, isPending: true, isError: false, authors: undefined, author: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getAuthorsSuccessAction = createAction(
    AuthorsActionEnums.GetAuthorsSuccess,
    (authors: AuthorDataType[]): AuthorsContextType => ({ isSuccess: true, isPending: false, isError: false, authors, author: undefined })
);

/**
 * Sets the isError to true
 */
export const getAuthorsErrorAction = createAction(
    AuthorsActionEnums.GetAuthorsError,
    (): AuthorsContextType => ({ isSuccess: false, isPending: false, isError: true, authors: undefined, author: undefined })
);

/**
 * Sets the isPending to true
 * The result author is not there yet
 */
export const getAuthorRequestAction = createAction(
    AuthorsActionEnums.GetAuthorRequest,
    (): AuthorsContextType => ({ isSuccess: false, isPending: true, isError: false, authors: undefined, author: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getAuthorSuccessAction = createAction(
    AuthorsActionEnums.GetAuthorSuccess,
    (author: AuthorDataType): AuthorsContextType => ({ isSuccess: true, isPending: false, isError: false, authors: undefined, author })
);

/**
 * Sets the isError to true
 */
export const getAuthorErrorAction = createAction(
    AuthorsActionEnums.GetAuthorError,
    (): AuthorsContextType => ({ isSuccess: false, isPending: false, isError: true, authors: undefined, author: undefined })
);