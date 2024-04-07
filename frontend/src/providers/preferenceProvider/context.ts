"use client";
import { createContext } from "react";

// {
    // "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    // "patronId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    // "primaryCategoryId": 0,
    // "secondaryCategoryId": 0,
    // "tertiaryCategoryId": 0
//   }
export interface PreferenceType {
    id: string;
    patronId: number;
    primaryCategoryId: string;
    secondaryCategoryId: string;
    tertiaryCategoryId: string;
}

export const PREFERENCE_INIT: PreferenceType = {
    id: "",
    patronId: 0,
    primaryCategoryId: "",
    secondaryCategoryId: "",
    tertiaryCategoryId: ""
}

export interface Preference_CONTEXT_STATE_TYPE {
    isInProgress: boolean;
    isSuccess: boolean;
    isError: boolean;
    preference?: PreferenceType;
    preferenceData?: PreferenceType[];
}

export const PREFERENCE_CONTEXT_INITIAL_STATE = {
    isInProgress: false,
    isError: false,
    isSuccess: false,
    preference: PREFERENCE_INIT,
    preferenceData: [] as PreferenceType[]
}

export interface PreferenceContextType {
    preference: PreferenceType;
    preferenceData: PreferenceType[];
    getPreferenceData: () => void;
    postPreference: (data: PreferenceType) => void;
    getPreferenceByPatron: (patronId: number) => PreferenceType;
}

export const PreferenceContextDefault: PreferenceContextType = {
    preference: PREFERENCE_INIT,
    preferenceData: [],
    getPreferenceData: () => {},
    postPreference: (data: PreferenceType) => {},
    getPreferenceByPatron: (patronId: number) => PREFERENCE_INIT
}

/**
 * Default value that the provider will pass is an empty object
 */
export const PreferenceContext = createContext<PreferenceContextType>(PreferenceContextDefault);
