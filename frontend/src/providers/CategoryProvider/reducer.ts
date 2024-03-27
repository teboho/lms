import { handleActions } from "redux-actions";
import { CategoryActionEnums } from "./actions";
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
        [CategoryActionEnums.GetCategorySuccess]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    {}
)