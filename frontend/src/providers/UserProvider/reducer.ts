import { handleActions } from "redux-actions";
import { UserActionEnums } from "./actions";
import { USER_INITIAL_STATE } from "./context";

/**
 * A reducer t
 */
export const userReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [UserActionEnums.GetUserRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [UserActionEnums.GetUserSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), // this handler will change the value of the isError in the state
        [UserActionEnums.GetUserError]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    USER_INITIAL_STATE
)