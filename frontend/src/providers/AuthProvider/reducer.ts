import { handleActions } from "redux-actions";
import { AuthActionEnums } from "./actions";
import { AUTH_INITIAL_STATE, AUTH_STATE_TYPE } from "./context";

/**
 * A reducer to handle the authentication
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
        [AuthActionEnums.PostAuthError]: (state: AUTH_STATE_TYPE, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [AuthActionEnums.PostRegisterSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [AuthActionEnums.GetUserRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [AuthActionEnums.GetUserSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [AuthActionEnums.GetUserError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [AuthActionEnums.ClearAuth]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    AUTH_INITIAL_STATE
)