"use client";
import { createAction } from "redux-actions";
import { CategoryType } from "./context";

export const CategoryActionEnums = {
    GetCategoryRequest: "GET_CATEGORY_REQUEST",
    GetCategorySuccess: "GET_CATEGORY_SUCCESS",
    GetCategoryError: "GET_CATEGORY_ERROR",

    GetCategoriesRequest: "GET_CATEGORIES_REQUEST",
    GetCategoriesSuccess: "GET_CATEGORIES_SUCCESS",
    GetCategoriesError: "GET_CATEGORIES_ERROR"
}

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getCategoryRequestAction = createAction(
    CategoryActionEnums.GetCategoryRequest,
    ():any => ({ isSuccess: false, isPending: true, isError: false, categories: undefined, category: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getCategorySuccessAction = createAction(
    CategoryActionEnums.GetCategorySuccess,
    (category: CategoryType) => ({ isSuccess: true, isPending: false, isError: false, categories: undefined, category })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getCategoryErrorAction = createAction(
    CategoryActionEnums.GetCategoryError,
    () => ({ isSuccess: false, isPending: false, isError: true, categories: undefined, category: undefined})
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getCategoriesRequestAction = createAction(
    CategoryActionEnums.GetCategoriesRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, categories: undefined, category: undefined })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getCategoriesSuccessAction = createAction(
    CategoryActionEnums.GetCategoriesSuccess,
    (categories: CategoryType[]) => ({ isSuccess: true, isPending: false, isError: false, category: undefined, categories })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getCategoriesErrorAction = createAction(
    CategoryActionEnums.GetCategoriesError,
    () => ({ isSuccess: false, isPending: false, isError: true, categories: undefined, category: undefined})
);
