import { handleActions } from "redux-actions";
import { HistoryActionEnums } from "./actions";
import { History_CONTEXT_INITIAL_STATE } from "./context";

/**
 * A reducer t
 */
export const historyReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [HistoryActionEnums.PostHistoryRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [HistoryActionEnums.PostHistorySuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), // this handler will change the value of the isError in the state
        [HistoryActionEnums.PostHistoryError]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    History_CONTEXT_INITIAL_STATE
)