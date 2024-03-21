"use client";
import { createAction } from "redux-actions";
import { Admin_CONTEXT_STATE_TYPE, Admin_OBJ_TYPE } from "./context";

// experiment
// export enum AdminActionEnums {
//     SetToken = "SET_TOKEN",
// }

export const AdminActionEnums = {
    PostAdminRequest: "POST_Admin_REQUEST",
    PostAdminSuccess: "POST_Admin_SUCCESS",
    PostAdminError: "POST_Admin_ERROR"
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const postAdminRequestAction = createAction(
    AdminActionEnums.PostAdminRequest,
    (): Admin_CONTEXT_STATE_TYPE => ({ isSuccess: false, isInProgress: true, isError: false, AdminObj: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postAdminSuccessAction = createAction(
    AdminActionEnums.PostAdminSuccess,
    (AdminObj: Admin_OBJ_TYPE): any => ({ isSuccess: true, isInProgress: false, isError: false, AdminObj})
);

/**
 * Sets the isError to true but then all else to false
 */
export const postAdminErrorAction = createAction(
    AdminActionEnums.PostAdminSuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, AdminObj: {}})
);
