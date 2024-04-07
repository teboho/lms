"use client";
import { createAction } from "redux-actions";
import { History_CONTEXT_STATE_TYPE, HistoryType } from "./context";
import { HistoryState } from "next/dist/shared/lib/router/router";

export const HistoryActionEnums = {
    GetHistoryRequest: "GET_History_REQUEST",
    GetHistorySuccess: "GET_History_SUCCESS",
    GetHistoryError: "GET_History_ERROR",

    GetHistoryDataRequest: "GET_History_DATA_REQUEST",
    GetHistoryDataSuccess: "GET_History_DATA_SUCCESS",
    GetHistoryDataError: "GET_History_DATA_ERROR",

    PostHistoryRequest: "POST_History_REQUEST",
    PostHistorySuccess: "POST_History_SUCCESS",
    PostHistoryError: "POST_History_ERROR",

    UpViewCount: "UP_VIEW_COUNT"
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const getHistoryRequestAction = createAction(
    HistoryActionEnums.GetHistoryRequest,
    () => ({ isSuccess: false, isInProgress: true, isError: false, history: undefined, historyData: undefined, viewCount: 0 })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getHistorySuccessAction = createAction(
    HistoryActionEnums.GetHistorySuccess,
    (history: HistoryType): any => ({ isSuccess: true, isInProgress: false, isError: false, history, historyData: undefined, viewCount: 0 })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getHistoryErrorAction = createAction(
    HistoryActionEnums.GetHistoryError,
    () => ({ isSuccess: false, isInProgress: false, isError: true, history: undefined, historyData: undefined, viewCount: 0 })
);

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const getHistoryDataRequestAction = createAction(
    HistoryActionEnums.GetHistoryDataRequest,
    () => ({ isSuccess: false, isInProgress: true, isError: false, history: undefined, historyData: undefined, viewCount: 0 })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getHistoryDataSuccessAction = createAction(
    HistoryActionEnums.GetHistoryDataSuccess,
    (historyData: HistoryType[]): any => ({ isSuccess: true, isInProgress: false, isError: false, history: undefined, historyData, viewCount: 0})
);

/**
 * Sets the isError to true but then all else to false
 */
export const getHistoryDataErrorAction = createAction(
    HistoryActionEnums.GetHistoryDataError,
    () => ({ isSuccess: false, isInProgress: false, isError: true, history: undefined, historyData: undefined, viewCount: 0 })
);

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const postHistoryRequestAction = createAction(
    HistoryActionEnums.PostHistoryRequest,
    () => ({ isSuccess: false, isInProgress: true, isError: false, history: undefined, historyData: undefined, viewCount: 0 })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postHistorySuccessAction = createAction(
    HistoryActionEnums.PostHistorySuccess,
    (history: HistoryType): any => ({ isSuccess: true, isInProgress: false, isError: false, history, historyData: undefined, viewCount: 0})
);

/**
 * Sets the isError to true but then all else to false
 */
export const postHistoryErrorAction = createAction(
    HistoryActionEnums.PostHistoryError,
    () => ({ isSuccess: false, isInProgress: false, isError: true, history: undefined, historyData: undefined, viewCount: 0 })
);

export const upViewCountAction = createAction(
    HistoryActionEnums.UpViewCount,
    (state: History_CONTEXT_STATE_TYPE) => ({ ...state, viewCount: 1 })
);