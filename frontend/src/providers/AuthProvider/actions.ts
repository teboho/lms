"use client";
import { Action, ActionFunction0, createAction } from "redux-actions";
import { AUTH_STATE_TYPE, AUTH_RESPONSE_TYPE, REGISTER_RESPONSE_TYPE, UserType, AuthValueType } from "./context";
import { use } from "react";

export const AuthActionEnums = {
    PostAuthRequest: "POST_AUTH_REQUEST",
    PostAuthSuccess: "POST_AUTH_SUCCESS",
    PostAuthError: "POST_AUTH_ERROR",

    PostRegisterRequest: "POST_REGISTER_REQUEST",
    PostRegisterSuccess: "POST_REGISTER_SUCCESS",
    PostRegisterError: "POST_REGISTER_ERROR",

    GetUserRequest: "GET_USER_REQUEST",
    GetUserSuccess: "GET_USER_SUCCESS",
    GetUserError: "GET_USER_ERROR",

    ClearAuth: "CLEAR_AUTH"
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const postAuthRequestAction = createAction(
    AuthActionEnums.PostAuthRequest,
    (): any => ({ isSuccess: false, isPending: true, isError: false, authObj: undefined, registerObj: undefined, userObj: undefined })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postAuthSuccessAction = createAction(
    AuthActionEnums.PostAuthSuccess,
    (authObj: AUTH_RESPONSE_TYPE) => ({ isSuccess: true, isPending: false, isError: false, authObj, registerObj: undefined as REGISTER_RESPONSE_TYPE, userObj: undefined })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postRegisterSuccessAction = createAction(
    AuthActionEnums.PostAuthSuccess,
    (registerObj: REGISTER_RESPONSE_TYPE) => ({ isSuccess: true, isPending: false, isError: false, registerObj, authObj: undefined as AUTH_RESPONSE_TYPE, userObj: undefined })
);

/**
 * Sets the isError to true but then all else to false
 */
export const postAuthErrorAction = createAction(
    AuthActionEnums.PostAuthSuccess,
    () => ({ isSuccess: false, isPending: false, isError: true, authObj: undefined, registerObj: undefined, userObj: undefined })
);

export const getUserRequestAction = createAction(
    AuthActionEnums.GetUserRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, authObj: undefined, registerObj: undefined, userObj: undefined })
);

export const getUserSuccessAction = createAction(
    AuthActionEnums.GetUserSuccess,
    (userObj: UserType) => ({ isSuccess: true, isPending: false, isError: false, authObj: undefined as AUTH_RESPONSE_TYPE, registerObj: undefined as REGISTER_RESPONSE_TYPE, userObj })
);  

export const getUserErrorAction = createAction(
    AuthActionEnums.GetUserError,
    () => ({ isSuccess: false, isPending: false, isError: true, authObj: undefined, registerObj: undefined, userObj: undefined })
);

/**
 * Clears the auth object
 */
export const clearAuthAction = createAction(
    AuthActionEnums.ClearAuth,
    () => ({ isSuccess: false, isPending: false, isError: false, authObj: undefined, registerObj: undefined, userObj: undefined })
);