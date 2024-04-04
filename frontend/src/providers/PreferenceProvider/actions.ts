"use client";
import { createAction } from "redux-actions";
import { Preference_CONTEXT_STATE_TYPE, PreferenceType } from "./context";

export const PreferenceActionEnums = {
    GetPreferenceRequest: "GET_Preference_REQUEST",
    GetPreferenceSuccess: "GET_Preference_SUCCESS",
    GetPreferenceError: "GET_Preference_ERROR",

    GetPreferenceDataRequest: "GET_Preference_DATA_REQUEST",
    GetPreferenceDataSuccess: "GET_Preference_DATA_SUCCESS",
    GetPreferenceDataError: "GET_Preference_DATA_ERROR",

    PostPreferenceRequest: "POST_Preference_REQUEST",
    PostPreferenceSuccess: "POST_Preference_SUCCESS",
    PostPreferenceError: "POST_Preference_ERROR",
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const getPreferenceRequestAction = createAction(
    PreferenceActionEnums.GetPreferenceRequest,
    () => ({ isSuccess: false, isInProgress: true, isError: false, preference: undefined, preferenceData: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getPreferenceSuccessAction = createAction(
    PreferenceActionEnums.GetPreferenceSuccess,
    (preference: PreferenceType): any => ({ isSuccess: true, isInProgress: false, isError: false, preference, preferenceData: undefined })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getPreferenceErrorAction = createAction(
    PreferenceActionEnums.GetPreferenceSuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, preference: undefined, preferenceData: undefined})
);

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const getPreferenceDataRequestAction = createAction(
    PreferenceActionEnums.GetPreferenceDataRequest,
    () => ({ isSuccess: false, isInProgress: true, isError: false, preference: undefined, preferenceData: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getPreferenceDataSuccessAction = createAction(
    PreferenceActionEnums.GetPreferenceDataSuccess,
    (preferenceData: PreferenceType[]): any => ({ isSuccess: true, isInProgress: false, isError: false, preference: undefined, preferenceData })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getPreferenceDataErrorAction = createAction(
    PreferenceActionEnums.GetPreferenceDataError,
    () => ({ isSuccess: false, isInProgress: false, isError: true, preference: undefined, preferenceData: undefined})
);

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const postPreferenceRequestAction = createAction(
    PreferenceActionEnums.PostPreferenceRequest,
    () => ({ isSuccess: false, isInProgress: true, isError: false, preference: undefined, preferenceData: undefined})
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postPreferenceSuccessAction = createAction(
    PreferenceActionEnums.PostPreferenceSuccess,
    (preference: PreferenceType): any => ({ isSuccess: true, isInProgress: false, isError: false, preference, preferenceData: undefined })
);

/**
 * Sets the isError to true but then all else to false
 */
export const postPreferenceErrorAction = createAction(
    PreferenceActionEnums.PostPreferenceError,
    () => ({ isSuccess: false, isInProgress: false, isError: true, preference: undefined, preferenceData: undefined})
);
