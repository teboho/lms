"use client"

import { useEffect, useReducer } from "react";
import { PREFERENCE_CONTEXT_INITIAL_STATE, PreferenceContext, PreferenceType } from "./context";
import { preferenceReducer } from "./reducer";
import { makeAxiosInstance } from "../authProvider";
import Utils from "@/utils";
import { getPreferenceDataErrorAction, getPreferenceDataRequestAction, getPreferenceDataSuccessAction, postPreferenceErrorAction, postPreferenceRequestAction, postPreferenceSuccessAction } from "./actions";

export default function PreferenceProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(preferenceReducer, PREFERENCE_CONTEXT_INITIAL_STATE);
    
    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        // get preference data
        if (accessToken) {
            getPreferenceData();
        }
    }, []);

    function getPreferenceData() {
        // get all preference 
        const endpoint = "/api/services/app/Preference/GetAll";
        dispatch(getPreferenceDataRequestAction());
        instance.get(endpoint)
            .then((response) => {
                console.log(response.data.result);
                if (response.data.success) {
                    // dispatch success action
                    dispatch(getPreferenceDataSuccessAction(response.data.result.items));
                } else {
                    // dispatch error action
                    dispatch(getPreferenceDataErrorAction());
                }
            })
            .catch((error) => {
                // dispatch error action
                dispatch(getPreferenceDataErrorAction());
            });
    }

    function postPreference(data: PreferenceType) {
        // post preference data
        const endpoint = "/api/services/app/Preference/Create";
        dispatch(postPreferenceRequestAction());
        instance.post(endpoint, data)
            .then((response) => {
                if (response.data.success) {
                    // dispatch success action
                    console.log(response.data.result);
                    dispatch(postPreferenceSuccessAction(response.data.result));
                } else {
                    // dispatch error action
                    dispatch(postPreferenceErrorAction());
                }
            })
            .catch((error) => {
                // dispatch error action
                dispatch(postPreferenceErrorAction());
            });
    }

    function getPreferenceByPatron(patronId: number): PreferenceType {
        // get preference by patron id
        const preference = state.preferenceData.find((item) => item.patronId === patronId);
        return preference;
    }

    return (
        <PreferenceContext.Provider value={{ 
            preference: state.preference,
            preferenceData: state.preferenceData,
            getPreferenceData,
            postPreference,
            getPreferenceByPatron
        }}>
            {children}
        </PreferenceContext.Provider>
    );
}