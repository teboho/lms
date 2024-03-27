"use client";
import { createAction } from "redux-actions";

export const CategoryActionEnums = {
    GetCategoryRequest: "POST_CATEGORY_REQUEST",
    GetCategorySuccess: "POST_CATEGORY_SUCCESS",
    GetCategoryError: "POST_CATEGORY_ERROR"
}

export type Category = {
    name: string;
    description: string;
    location: string;
    id: string;
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const getCategoryRequestAction = createAction(
    CategoryActionEnums.GetCategoryRequest,
    ():any => ({ isSuccess: false, isInProgress: true, isError: false, categories: []})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getCategorySuccessAction = createAction(
    CategoryActionEnums.GetCategorySuccess,
    (categories: Category[]): any => ({ isSuccess: true, isInProgress: false, isError: false, categories})
);

/**
 * Sets the isError to true but then all else to false
 */
export const getCategoryErrorAction = createAction(
    CategoryActionEnums.GetCategorySuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, categories: []})
);
