"use client";
import { createAction } from "redux-actions";
import { Book_CONTEXT_STATE_TYPE, Book_OBJ_TYPE } from "./context";

// experiment
// export enum BookActionEnums {
//     SetToken = "SET_TOKEN",
// }

export const BookActionEnums = {
    PostBookRequest: "POST_Book_REQUEST",
    PostBookSuccess: "POST_Book_SUCCESS",
    PostBookError: "POST_Book_ERROR"
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const postBookRequestAction = createAction(
    BookActionEnums.PostBookRequest,
    (): Book_CONTEXT_STATE_TYPE => ({ isSuccess: false, isInProgress: true, isError: false, BookObj: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postBookSuccessAction = createAction(
    BookActionEnums.PostBookSuccess,
    (BookObj: Book_OBJ_TYPE): any => ({ isSuccess: true, isInProgress: false, isError: false, BookObj})
);

/**
 * Sets the isError to true but then all else to false
 */
export const postBookErrorAction = createAction(
    BookActionEnums.PostBookSuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, BookObj: {}})
);
