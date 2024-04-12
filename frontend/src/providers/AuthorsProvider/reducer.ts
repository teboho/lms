import { handleActions } from "redux-actions";
import { AuthorsActionEnums } from "./actions";
import { AuthorsContextStateInit, AuthorsContextStateType } from "./context";

export const authorsReducer = handleActions<AuthorsContextStateType>({
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
        }),
        
        [AuthorsActionEnums.GetAuthorRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [AuthorsActionEnums.GetAuthorSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [AuthorsActionEnums.GetAuthorError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
    },
    AuthorsContextStateInit
);