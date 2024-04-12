import { handleActions } from "redux-actions";
import { HistoryActionEnums } from "./actions";
import { HISTORY_CONTEXT_INITIAL_STATE, History_CONTEXT_STATE_TYPE } from "./context";

export const historyReducer = handleActions(
    {
        [HistoryActionEnums.GetHistoryRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  
        [HistoryActionEnums.GetHistorySuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), 
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