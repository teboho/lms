import { handleActions } from "redux-actions";
import { PreferenceActionEnums } from "./actions";
import { PreferenceContextStateInit } from "./context";

export const preferenceReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [PreferenceActionEnums.GetPreferenceRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [PreferenceActionEnums.GetPreferenceSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), // this handler will change the value of the isError in the state
        [PreferenceActionEnums.GetPreferenceError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        
        [PreferenceActionEnums.GetPreferenceDataRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PreferenceActionEnums.GetPreferenceDataSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PreferenceActionEnums.GetPreferenceDataError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [PreferenceActionEnums.PostPreferenceRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PreferenceActionEnums.PostPreferenceSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PreferenceActionEnums.PostPreferenceError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
    },
    PreferenceContextStateInit
)