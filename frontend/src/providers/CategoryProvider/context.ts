"use client";
import { createContext } from "react";
import { categoryReducer } from "./reducer";

export interface CategoryType {
    "id": number,
    "name": string
}

export const CATEGORY_INIT: CategoryType = {
    "id": 0,
    "name": ""
}

export interface CATEGORY_STATE_TYPE {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    categories: CategoryType[] | undefined;
    category: CategoryType | undefined;
    searchTerm: string;
}

export const CATEGORY_CONTEXT_INITIAL_STATE: CATEGORY_STATE_TYPE = {
    isPending: false,
    isError: false,
    isSuccess: false,
    categories: undefined,
    category: CATEGORY_INIT,
    searchTerm: ""
}

/**
 * Default value that the provider will pass is an empty object
 */
const CategoryContext = createContext({  });

export default CategoryContext;
