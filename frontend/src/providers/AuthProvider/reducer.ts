import { handleActions } from "redux-actions";
import { AuthActionEnums } from "./actions";
import { AuthContextStateInit, AuthContextStateType } from "./context";

/**
 * A reducer to handle the authentication
 */
export const authReducer = handleActions<AuthContextStateType>(
    {
        [AuthActionEnums.PostAuthRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  
        [AuthActionEnums.PostAuthSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), 
        [AuthActionEnums.PostAuthError]: (state, action) => ({
            ...state,
            ...action.payload
        }),  

        [AuthActionEnums.PostRegisterRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [AuthActionEnums.PostRegisterSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [AuthActionEnums.PostRegisterError]: (state, action) => ({
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
    AuthContextStateInit
)