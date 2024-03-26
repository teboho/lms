"use client";
import { createAction } from "redux-actions";
import { Preference_CONTEXT_STATE_TYPE, Preference_OBJ_TYPE } from "./context";

// experiment
// export enum PreferenceActionEnums {
//     SetToken = "SET_TOKEN",
// }

export const PreferenceActionEnums = {
    PostPreferenceRequest: "POST_Preference_REQUEST",
    PostPreferenceSuccess: "POST_Preference_SUCCESS",
    PostPreferenceError: "POST_Preference_ERROR"
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const postPreferenceRequestAction = createAction(
    PreferenceActionEnums.PostPreferenceRequest,
    (): Preference_CONTEXT_STATE_TYPE => ({ isSuccess: false, isInProgress: true, isError: false, PreferenceObj: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postPreferenceSuccessAction = createAction(
    PreferenceActionEnums.PostPreferenceSuccess,
    (PreferenceObj: Preference_OBJ_TYPE): any => ({ isSuccess: true, isInProgress: false, isError: false, PreferenceObj})
);

/**
 * Sets the isError to true but then all else to false
 */
export const postPreferenceErrorAction = createAction(
    PreferenceActionEnums.PostPreferenceSuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, PreferenceObj: {}})
);
