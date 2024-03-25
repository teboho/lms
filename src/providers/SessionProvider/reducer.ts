import { handleActions } from "redux-actions";
import { SessionActionEnums } from "./actions";
import { SESSION_INITIAL_STATE } from "./context";

/**
 * A reducer t
 */
export const sessionReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [SessionActionEnums.PostSessionRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [SessionActionEnums.PostSessionSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), // this handler will change the value of the isError in the state
        [SessionActionEnums.PostSessionError]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    SESSION_INITIAL_STATE
)