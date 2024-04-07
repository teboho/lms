"use client";
import { createContext } from "react";

export interface HistoryType {
    id?: string;
    patronId: number;
    dateRead: string;
    bookId: string;
}

export const HISTORY_INIT: HistoryType = {
    id: "",
    patronId: 0,
    dateRead: "",
    bookId: ""
}

export interface History_CONTEXT_STATE_TYPE {
    isInProgress: boolean;
    isSuccess: boolean;
    isError: boolean;
    history: HistoryType | undefined;
    historyData: HistoryType[] | undefined;
}

export const HISTORY_CONTEXT_INITIAL_STATE = {
    isInProgress: false,
    isError: false,
    isSuccess: false,
    history: HISTORY_INIT,
    historyData: [] as HistoryType[],
    viewCount: 0
}

export interface HistoryContextType {
    history: HistoryType;
    historyData: HistoryType[];
    getHistoryData: () => void;
    postHistory: (data: HistoryType) => void;
    getHistoryByBook: (bookId: string) => void;
    getHistoryByPatron: (patronId: number) => void;
    viewCount: number;
    upViewCount: () => void;
}

export const HistoryContextDefault: HistoryContextType = {
    history: HISTORY_INIT,
    historyData: [],
    getHistoryData: () => {},
    postHistory: (data: HistoryType) => {},
    getHistoryByBook: (bookId: string) => {},
    getHistoryByPatron: (patronId: number) => {},
    viewCount: 0,
    upViewCount: () => {}
}

/**
 * Default value that the provider will pass is an empty object
 */
export const HistoryContext = createContext<HistoryContextType>(HistoryContextDefault);
