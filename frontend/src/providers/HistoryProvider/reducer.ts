import { handleActions } from "redux-actions";
import { HistoryActionEnums } from "./actions";
import { HISTORY_CONTEXT_INITIAL_STATE } from "./context";

export const historyReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [HistoryActionEnums.GetHistoryRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [HistoryActionEnums.GetHistorySuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), // this handler will change the value of the isError in the state
        [HistoryActionEnums.GetHistoryError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [HistoryActionEnums.GetHistoryDataRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [HistoryActionEnums.GetHistoryDataSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [HistoryActionEnums.GetHistoryDataError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [HistoryActionEnums.PostHistoryRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [HistoryActionEnums.PostHistorySuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [HistoryActionEnums.PostHistoryError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [HistoryActionEnums.UpViewCount]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    HISTORY_CONTEXT_INITIAL_STATE
)