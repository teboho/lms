"use client";
import { createAction } from "redux-actions";
import { AUTH_CONTEXT_STATE_TYPE, AUTH_OBJ_TYPE, REGISTER_REQUEST_TYPE, REGISTER_RESP_TYPE } from "./context";

// experiment
// export enum AuthActionEnums {
//     SetToken = "SET_TOKEN",
// }

export const AuthActionEnums = {
    PostAuthRequest: "POST_AUTH_REQUEST",
    PostAuthSuccess: "POST_AUTH_SUCCESS",
    PostRegisterSuccess: "POST_REGISTER_SUCCESS",
    PostAuthError: "POST_AUTH_ERROR"
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const postAuthRequestAction = createAction(
    AuthActionEnums.PostAuthRequest,
    (): AUTH_CONTEXT_STATE_TYPE => ({ isSuccess: false, isInProgress: true, isError: false, authObj: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postAuthSuccessAction = createAction(
    AuthActionEnums.PostAuthSuccess,
    (authObj: AUTH_OBJ_TYPE): any => ({ isSuccess: true, isInProgress: false, isError: false, authObj})
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postRegisterSuccessAction = createAction(
    AuthActionEnums.PostAuthSuccess,
    (regObj: REGISTER_RESP_TYPE): any => ({ isSuccess: true, isInProgress: false, isError: false, registerObj: {}})
);

/**
 * Sets the isError to true but then all else to false
 */
export const postAuthErrorAction = createAction(
    AuthActionEnums.PostAuthSuccess,
    (): any => ({ isSuccess: false, isInProgress: false, isError: true, authObj: {}})
);
