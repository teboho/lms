import { handleActions } from "redux-actions";
import { BookActionEnums } from "./actions";
import { BOOK_CONTEXT_INITIAL_STATE } from "./context";

/**
 * A reducer t
 */
export const bookReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [BookActionEnums.GetBooksRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [BookActionEnums.GetBooksSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), // this handler will change the value of the isError in the state
        [BookActionEnums.GetBooksError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [BookActionEnums.GetBookRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [BookActionEnums.GetBookSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [BookActionEnums.GetBookError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [BookActionEnums.SetSearchTerm]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [BookActionEnums.GetSearchBooksRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [BookActionEnums.GetSearchBooksSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [BookActionEnums.GetSearchBooksError]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    BOOK_CONTEXT_INITIAL_STATE
)