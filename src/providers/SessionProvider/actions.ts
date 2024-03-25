"use client";
import { createAction } from "redux-actions";
import { SessionUser } from "./context";

export const SessionActionEnums = {
    PostSessionRequest: "POST_SESSION_REQUEST",
    PostSessionSuccess: "POST_SESSION_SUCCESS",
    PostSessionError: "POST_SESSION_ERROR"
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const postSessionRequestAction = createAction(
    SessionActionEnums.PostSessionRequest,
    (): any => ({ isSuccess: false, isInProgress: true, isError: false, sessionUser: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postSessionSuccessAction = createAction(
    SessionActionEnums.PostSessionSuccess,
    (sessionUser: SessionUser): any => ({ isSuccess: true, isInProgress: false, isError: false, user: sessionUser})
);

/**
 * Sets the isError to true but then all else to false
 */
export const postSessionErrorAction = createAction(
    SessionActionEnums.PostSessionSuccess,
    (): any => ({ isSuccess: false, isInProgress: false, isError: true, sessionUser: {}})
);
