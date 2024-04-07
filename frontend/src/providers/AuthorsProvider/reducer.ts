import { handleActions } from "redux-actions";
import { AuthorsActionEnums } from "./actions";
import { AuthorsContextInit } from "./context";

export const authorsReducer = handleActions({
        [AuthorsActionEnums.GetAuthorsRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [AuthorsActionEnums.GetAuthorsSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [AuthorsActionEnums.GetAuthorsError]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    AuthorsContextInit
);