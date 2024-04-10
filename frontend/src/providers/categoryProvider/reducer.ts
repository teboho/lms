import { handleActions } from "redux-actions";
import { CategoryActionEnums } from "./actions";
import { CategoryContextStateInit, CategoryContextStateType, } from "./context";
/**
 * A reducer t
 */
export const categoryReducer = handleActions<CategoryContextStateType>(
    {
        [CategoryActionEnums.GetCategoryRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }), 
        [CategoryActionEnums.GetCategorySuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), 
        [CategoryActionEnums.GetCategoryError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [CategoryActionEnums.GetCategoriesRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [CategoryActionEnums.GetCategoriesSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [CategoryActionEnums.GetCategoriesError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
    },
    CategoryContextStateInit
)