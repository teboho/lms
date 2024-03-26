"use client";
import { createAction } from "redux-actions";
import { History_CONTEXT_STATE_TYPE, History_OBJ_TYPE } from "./context";

// experiment
// export enum HistoryActionEnums {
//     SetToken = "SET_TOKEN",
// }

export const HistoryActionEnums = {
    PostHistoryRequest: "POST_History_REQUEST",
    PostHistorySuccess: "POST_History_SUCCESS",
    PostHistoryError: "POST_History_ERROR"
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const postHistoryRequestAction = createAction(
    HistoryActionEnums.PostHistoryRequest,
    (): History_CONTEXT_STATE_TYPE => ({ isSuccess: false, isInProgress: true, isError: false, HistoryObj: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postHistorySuccessAction = createAction(
    HistoryActionEnums.PostHistorySuccess,
    (HistoryObj: History_OBJ_TYPE): any => ({ isSuccess: true, isInProgress: false, isError: false, HistoryObj})
);

/**
 * Sets the isError to true but then all else to false
 */
export const postHistoryErrorAction = createAction(
    HistoryActionEnums.PostHistorySuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, HistoryObj: {}})
);
