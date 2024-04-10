"use client";
import { createContext } from "react";

export interface PreferenceType {
    id?: string;
    patronId: number;
    primaryCategoryId: string;
    secondaryCategoryId: string;
    tertiaryCategoryId: string;
}

export const PreferenceInit: PreferenceType = {
    id: "",
    patronId: 0,
    primaryCategoryId: "",
    secondaryCategoryId: "",
    tertiaryCategoryId: ""
}

export interface PreferenceContextStateType {
    isInProgress: boolean;
    isSuccess: boolean;
    isError: boolean;
    preference?: PreferenceType;
    preferenceData?: PreferenceType[];
}

export const PreferenceContextStateInit: PreferenceContextStateType = {
    isInProgress: false,
    isError: false,
    isSuccess: false,
    preference: PreferenceInit,
    preferenceData: [] as PreferenceType[]
}

export interface PreferenceContextValueType {
    preference?: PreferenceType;
    preferenceData?: PreferenceType[];
    getPreferenceData: () => void;
    postPreference: (prefs: PreferenceType) => void;
    getPreferenceByPatron: (patronId: number) => PreferenceType;
}

export const PreferenceContextValueDefault: PreferenceContextValueType = {
    preference: PreferenceInit,
    preferenceData: [],
    getPreferenceData: () => {},
    postPreference: (prefs: PreferenceType) => {},
    getPreferenceByPatron: (patronId: number) => PreferenceInit
}

/**
 * Default value that the provider will pass is an empty object
 */
export const PreferenceContext = createContext<PreferenceContextValueType>(PreferenceContextValueDefault);
