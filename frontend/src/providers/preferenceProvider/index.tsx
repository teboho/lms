"use client";

import { useEffect, useReducer } from "react";
import { PreferenceContextStateInit, PreferenceContext, PreferenceType } from "./context";
import { preferenceReducer } from "./reducer";
import { makeAxiosInstance } from "../authProvider";
import Utils from "@/utils";
import { 
    getPreferenceDataErrorAction, 
    getPreferenceDataRequestAction, 
    getPreferenceDataSuccessAction, 
    getPreferenceSuccessAction, 
    postPreferenceErrorAction, 
    postPreferenceRequestAction, 
    postPreferenceSuccessAction 
} from "./actions";
import { message } from "antd";

export default function PreferenceProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(preferenceReducer, PreferenceContextStateInit);
    
    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        if (accessToken) {
            getPreferenceData();
        }
    }, []);

    /**
     * Get all preferences
     */
    function getPreferenceData() {
        const endpoint = "/api/services/app/Preference/GetAll";
        dispatch(getPreferenceDataRequestAction());
        instance.get(endpoint)
            .then((response) => {
                if (response.data.success) {
                    dispatch(getPreferenceDataSuccessAction(response.data.result.items));
                } else {
                    dispatch(getPreferenceDataErrorAction());
                }
            })
            .catch((error) => {
                dispatch(getPreferenceDataErrorAction());
            });
    }
    
    /**
     * 
     * @param prefs preferences object
     */
    function postPreference(prefs: PreferenceType): void {
        const endpoint = "/api/services/app/Preference/Create";
        dispatch(postPreferenceRequestAction());
        instance.post(`${endpoint}`, prefs)
            .then(res => {
                if (res.data.success) {
                    if (res.data.result !== null)
                    {
                        dispatch(postPreferenceSuccessAction(res.data.result))
                        message.success("Preferences saved successfully!");
                    }
                } else {
                    dispatch(postPreferenceErrorAction());
                    message.error("Preferences save unsuccessful!");
                }
            })
            .catch(err =>  {
                dispatch(postPreferenceErrorAction());
                message.error("Preferences save unsuccessful!");
            });
    }

    function getPreferenceByPatron(patronId: number): PreferenceType {
        const preference = state.preferenceData?.find((item) => item.patronId === patronId);
        dispatch(getPreferenceSuccessAction(preference));
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