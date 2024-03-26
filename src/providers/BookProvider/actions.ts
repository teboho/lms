"use client";
import { createAction } from "redux-actions";
import { BOOK_RESP_TYPE } from "./context";

export const BookActionEnums = {
    GetBooksRequest: "POST_BOOK_REQUEST",
    GetBooksSuccess: "POST_BOOK_SUCCESS",
    GetBooksError: "POST_BOOK_ERROR"
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
    (booksObj: BOOK_RESP_TYPE[]): any => ({ isSuccess: true, isInProgress: false, isError: false, results: booksObj})
);

/**
 * Sets the isError to true but then all else to false
 */
export const getBooksErrorAction = createAction(
    BookActionEnums.GetBooksSuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, booksObj: []})
);
