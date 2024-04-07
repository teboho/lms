import { handleActions } from "redux-actions";
import { CategoryActionEnums } from "./actions";
import { CATEGORY_CONTEXT_INITIAL_STATE, } from "./context";
/**
 * A reducer t
 */
export const categoryReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [CategoryActionEnums.GetCategoryRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [CategoryActionEnums.GetCategorySuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), // this handler will change the value of the isError in the state
        [CategoryActionEnums.GetCategoryError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        // this handler will change the value of the isPending in the state
        [CategoryActionEnums.GetCategoriesRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        // this handler will change the value of the isSuccess in the state
        [CategoryActionEnums.GetCategoriesSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        // this handler will change the value of the isError in the state
        [CategoryActionEnums.GetCategoriesError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
    },
    CATEGORY_CONTEXT_INITIAL_STATE
)