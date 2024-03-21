import { handleActions } from "redux-actions";
import { BookActionEnums } from "./actions";
import { Book_CONTEXT_INITIAL_STATE } from "./context";

/**
 * A reducer t
 */
export const BookReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [BookActionEnums.PostBookRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [BookActionEnums.PostBookSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), // this handler will change the value of the isError in the state
        [BookActionEnums.PostBookError]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    Book_CONTEXT_INITIAL_STATE
)