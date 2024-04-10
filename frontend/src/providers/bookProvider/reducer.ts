import { handleActions } from "redux-actions";
import { BookActionEnums } from "./actions";
import { BookContextStateInit, BookContextStateType } from "./context";

/**
 * A reducer t
 */
export const bookReducer = handleActions<BookContextStateType>(
    {
        [BookActionEnums.GetBooksRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [BookActionEnums.GetBooksSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), 
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
    BookContextStateInit
)