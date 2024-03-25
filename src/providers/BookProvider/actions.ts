"use client";
import { createAction } from "redux-actions";

export const BookActionEnums = {
    GetBooksRequest: "POST_Book_REQUEST",
    GetBooksSuccess: "POST_Book_SUCCESS",
    GetBooksError: "POST_Book_ERROR"
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const getBooksRequestAction = createAction(
    BookActionEnums.GetBooksRequest,
    (): any => ({ isSuccess: false, isInProgress: true, isError: false, BookObj: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getBooksSuccessAction = createAction(
    BookActionEnums.GetBooksSuccess,
    (bookObj: any): any => ({ isSuccess: true, isInProgress: false, isError: false, bookObj})
);

/**
 * Sets the isError to true but then all else to false
 */
export const getBooksErrorAction = createAction(
    BookActionEnums.GetBooksSuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, BookObj: undefined})
);
