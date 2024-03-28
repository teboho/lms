"use client";
import { createAction } from "redux-actions";
import { BOOK } from "./context";
import Book from "@/components/Book";

export const BookActionEnums = {
    GetBooksRequest: "GET_BOOKS_REQUEST",
    GetBooksSuccess: "GET_BOOKS_SUCCESS",
    GetBooksError: "GET_BOOKS_ERROR",

    GetBookRequest: "GET_BOOK_REQUEST",
    GetBookSuccess: "GET_BOOK_SUCCESS",
    GetBookError: "GET_BOOK_ERROR",
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const getBooksRequestAction = createAction(
    BookActionEnums.GetBooksRequest,
    () => ({ isSuccess: false, isInProgress: true, isError: false, booksObj: []})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getBooksSuccessAction = createAction(
    BookActionEnums.GetBooksSuccess,
    (booksObj: BOOK[]): any => ({ isSuccess: true, isInProgress: false, isError: false, results: booksObj})
);

/**
 * Sets the isError to true but then all else to false
 */
export const getBooksErrorAction = createAction(
    BookActionEnums.GetBooksSuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, booksObj: []})
);

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const getBookRequestAction = createAction(
    BookActionEnums.GetBookRequest,
    () => ({ isSuccess: false, isInProgress: true, isError: false, bookObj: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getBookSuccessAction = createAction(
    BookActionEnums.GetBookSuccess,
    (bookObj: BOOK): any => ({ isSuccess: true, isInProgress: false, isError: false, bookObj: bookObj})
);

/**
 * Sets the isError to true but then all else to false
 */
export const getBookErrorAction = createAction(
    BookActionEnums.GetBookSuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, bookObj: undefined})
);
