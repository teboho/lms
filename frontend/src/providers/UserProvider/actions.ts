"use client";
import { createAction } from "redux-actions";
import { User } from "./context";

export const UserActionEnums = {
    GetUserRequest: "GET_USER_REQUEST",
    GetUserSuccess: "GET_USER_SUCCESS",
    GetUserError: "GET_USER_ERROR"
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const getUserRequestAction = createAction(
    UserActionEnums.GetUserRequest,
    (): any => ({ isSuccess: false, isInProgress: true, isError: false, user: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getUserSuccessAction = createAction(
    UserActionEnums.GetUserSuccess,
    (user: User): any => ({ isSuccess: true, isInProgress: false, isError: false, user: user})
);

/**
 * Sets the isError to true but then all else to false
 */
export const getUserErrorAction = createAction(
    UserActionEnums.GetUserSuccess,
    (): any => ({ isSuccess: false, isInProgress: false, isError: true, userUser: undefined})
);
