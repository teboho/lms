import { handleActions } from "redux-actions";
import { HistoryActionEnums } from "./actions";
import { HISTORY_CONTEXT_INITIAL_STATE } from "./context";

/**
 * A reducer t
 */
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
        })
    },
    HISTORY_CONTEXT_INITIAL_STATE
)