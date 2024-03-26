import { handleActions } from "redux-actions";
import { AdminActionEnums } from "./actions";
import { Admin_CONTEXT_INITIAL_STATE } from "./context";

/**
 * A reducer t
 */
export const AdminReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [AdminActionEnums.PostAdminRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [AdminActionEnums.PostAdminSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), // this handler will change the value of the isError in the state
        [AdminActionEnums.PostAdminError]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    Admin_CONTEXT_INITIAL_STATE
)