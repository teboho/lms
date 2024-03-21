"use client";
import { createAction } from "redux-actions";
import { Patron_CONTEXT_STATE_TYPE, Patron_OBJ_TYPE } from "./context";

// experiment
// export enum PatronActionEnums {
//     SetToken = "SET_TOKEN",
// }

export const PatronActionEnums = {
    PostPatronRequest: "POST_Patron_REQUEST",
    PostPatronSuccess: "POST_Patron_SUCCESS",
    PostPatronError: "POST_Patron_ERROR"
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const postPatronRequestAction = createAction(
    PatronActionEnums.PostPatronRequest,
    (): Patron_CONTEXT_STATE_TYPE => ({ isSuccess: false, isInProgress: true, isError: false, PatronObj: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postPatronSuccessAction = createAction(
    PatronActionEnums.PostPatronSuccess,
    (PatronObj: Patron_OBJ_TYPE): any => ({ isSuccess: true, isInProgress: false, isError: false, PatronObj})
);

/**
 * Sets the isError to true but then all else to false
 */
export const postPatronErrorAction = createAction(
    PatronActionEnums.PostPatronSuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, PatronObj: {}})
);
