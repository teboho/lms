"use client";
import { createAction } from "redux-actions";
import { PreferenceContextStateType, PreferenceType } from "./context";

export const PreferenceActionEnums = {
    GetPreferenceRequest: "GET_PREFERENCE_REQUEST",
    GetPreferenceSuccess: "GET_PREFERENCE_SUCCESS",
    GetPreferenceError: "GET_PREFERENCE_ERROR",

    GetPreferenceDataRequest: "GET_PREFERENCE_DATA_REQUEST",
    GetPreferenceDataSuccess: "GET_PREFERENCE_DATA_SUCCESS",
    GetPreferenceDataError: "GET_PREFERENCE_DATA_ERROR",

    PostPreferenceRequest: "POST_PREFERENCE_REQUEST",
    PostPreferenceSuccess: "POST_PREFERENCE_SUCCESS",
    PostPreferenceError: "POST_PREFERENCE_ERROR",
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const getPreferenceRequestAction = createAction(
    PreferenceActionEnums.GetPreferenceRequest,
    () => ({ isSuccess: false, isInProgress: true, isError: false, preference: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getPreferenceSuccessAction = createAction(
    PreferenceActionEnums.GetPreferenceSuccess,
    (preference: PreferenceType) => ({ isSuccess: true, isInProgress: false, isError: false, preference })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getPreferenceErrorAction = createAction(
    PreferenceActionEnums.GetPreferenceError,
    () => ({ isSuccess: false, isInProgress: false, isError: true, preference: undefined })
);

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const getPreferenceDataRequestAction = createAction<PreferenceContextStateType>(
    PreferenceActionEnums.GetPreferenceDataRequest,
    () => ({ isSuccess: false, isInProgress: true, isError: false, preferenceData: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getPreferenceDataSuccessAction = createAction(
    PreferenceActionEnums.GetPreferenceDataSuccess,
    (preferenceData: PreferenceType[]) => ({ isSuccess: true, isInProgress: false, isError: false, preferenceData })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getPreferenceDataErrorAction = createAction(
    PreferenceActionEnums.GetPreferenceDataError,
    () => ({ isSuccess: false, isInProgress: false, isError: true, preferenceData: undefined})
);

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const postPreferenceRequestAction = createAction(
    PreferenceActionEnums.PostPreferenceRequest,
    () => ({ isSuccess: false, isInProgress: true, isError: false, preference: undefined })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postPreferenceSuccessAction = createAction(
    PreferenceActionEnums.PostPreferenceSuccess,
    (preference: PreferenceType) => ({ isSuccess: true, isInProgress: false, isError: false, preference  })
);

/**
 * Sets the isError to true but then all else to false
 */
export const postPreferenceErrorAction = createAction(
    PreferenceActionEnums.PostPreferenceError,
    () => ({ isSuccess: false, isInProgress: false, isError: true, preference: undefined })
);
