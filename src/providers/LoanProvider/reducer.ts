import { handleActions } from "redux-actions";
import { AuthActionEnums } from "./actions";
import { AUTH_CONTEXT_INITIAL_STATE } from "./context";

/**
 * A reducer t
 */
export const authReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [AuthActionEnums.PostAuthRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [AuthActionEnums.PostAuthSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), // this handler will change the value of the isError in the state
        [AuthActionEnums.PostAuthError]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    AUTH_CONTEXT_INITIAL_STATE
)