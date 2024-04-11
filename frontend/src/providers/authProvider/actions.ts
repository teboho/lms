"use client";

import { createAction } from "redux-actions";
import { AUTH_RESPONSE_TYPE, REGISTER_RESPONSE_TYPE, UserType, AuthValueType } from "./context";

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

    ClearAuth: "CLEAR_AUTH",

    GetProfilePictureRequest: "GET_PROFILE_PICTURE_REQUEST",
    GetProfilePictureSuccess: "GET_PROFILE_PICTURE_SUCCESS",
    GetProfilePictureError: "GET_PROFILE_PICTURE_ERROR"
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const postAuthRequestAction = createAction(
    AuthActionEnums.PostAuthRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, authObj: undefined, userObj: undefined })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postAuthSuccessAction = createAction(
    AuthActionEnums.PostAuthSuccess,
    (authObj: AUTH_RESPONSE_TYPE) => ({ isSuccess: true, isPending: false, isError: false, authObj })
);

/**
 * Sets the isError to true but then all else to false
 */
export const postAuthErrorAction = createAction(
    AuthActionEnums.PostAuthError,
    () => ({ isSuccess: false, isPending: false, isError: true, authObj: undefined, registerObj: undefined, userObj: undefined })
);

/**
 * set the isPending to false and isError to true
 */
export const postRegisterRequestAction = createAction(
    AuthActionEnums.PostRegisterRequest,
    (): any => ({ isSuccess: false, isPending: true, isError: false, registerObj: undefined })
);


/**
 * Sets the isSuccess to true but then all else to false
 */
export const postRegisterSuccessAction = createAction(
    AuthActionEnums.PostRegisterSuccess,
    (registerObj: REGISTER_RESPONSE_TYPE) => ({ isSuccess: true, isPending: false, isError: false, registerObj })
);


export const getUserRequestAction = createAction(
    AuthActionEnums.GetUserRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, authObj: undefined, userObj: undefined })
);

export const getUserSuccessAction = createAction(
    AuthActionEnums.GetUserSuccess,
    (userObj: UserType) => ({ isSuccess: true, isPending: false, isError: false, userObj })
);  

export const getUserErrorAction = createAction(
    AuthActionEnums.GetUserError,
    () => ({ isSuccess: false, isPending: false, isError: true, userObj: undefined })
);

/**
 * Clears the auth object
 */
export const clearAuthAction = createAction(
    AuthActionEnums.ClearAuth,
    () => ({ isSuccess: false, isPending: false, isError: false, authObj: undefined, registerObj: undefined, userObj: undefined })
);

export const getProfilePictureRequestAction = createAction(
    AuthActionEnums.GetProfilePictureRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, profilePic: "" })
);

export const getProfilePictureSuccessAction = createAction(
    AuthActionEnums.GetProfilePictureSuccess,
    (profilePic: string) => ({ isSuccess: true, isPending: false, isError: false, profilePic })
);

export const getProfilePictureErrorAction = createAction(
    AuthActionEnums.GetProfilePictureError,
    () => ({ isSuccess: false, isPending: false, isError: true, profilePic: "" })
);