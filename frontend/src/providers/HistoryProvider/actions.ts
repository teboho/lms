"use client";
import { createAction } from "redux-actions";
import { History_CONTEXT_STATE_TYPE, History_Type } from "./context";

// experiment
// export enum HistoryActionEnums {
//     SetToken = "SET_TOKEN",
// }

export const HistoryActionEnums = {
    GetHistoryRequest: "GET_History_REQUEST",
    GetHistorySuccess: "GET_History_SUCCESS",
    GetHistoryError: "GET_History_ERROR",

    GetHistoryDataRequest: "GET_History_DATA_REQUEST",
    GetHistoryDataSuccess: "GET_History_DATA_SUCCESS",
    GetHistoryDataError: "GET_History_DATA_ERROR",
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const getHistoryRequestAction = createAction(
    HistoryActionEnums.GetHistoryRequest,
    () => ({ isSuccess: false, isInProgress: true, isError: false, history: undefined, historyData: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getHistorySuccessAction = createAction(
    HistoryActionEnums.GetHistorySuccess,
    (history: History_Type): any => ({ isSuccess: true, isInProgress: false, isError: false, history, historyData: undefined })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getHistoryErrorAction = createAction(
    HistoryActionEnums.GetHistorySuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, history: undefined, historyData: undefined})
);

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const getHistoryDataRequestAction = createAction(
    HistoryActionEnums.GetHistoryDataRequest,
    () => ({ isSuccess: false, isInProgress: true, isError: false, history: undefined, historyData: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getHistoryDataSuccessAction = createAction(
    HistoryActionEnums.GetHistoryDataSuccess,
    (historyData: History_Type[]): any => ({ isSuccess: true, isInProgress: false, isError: false, history: undefined, historyData })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getHistoryDataErrorAction = createAction(
    HistoryActionEnums.GetHistoryDataError,
    () => ({ isSuccess: false, isInProgress: false, isError: true, history: undefined, historyData: undefined})
);