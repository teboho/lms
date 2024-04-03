"use client";
import { createContext } from "react";

export type CategoryType = {
    name: string;
    description: string;
    location: string;
    id?: string;
}
export const CATEGORY_INIT: CategoryType = {
    id: "",
    name: "",
    location: "",
    description: ""
}

export interface CATEGORY_STATE_TYPE {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    categories?: CategoryType[] | undefined;
    category?: CategoryType | undefined;
}

export const CATEGORY_CONTEXT_INITIAL_STATE: CATEGORY_STATE_TYPE = {
    isPending: false,
    isError: false,
    isSuccess: false,
    categories: [] as CategoryType[],
    category: CATEGORY_INIT
}

export interface CategoryContextType {
    category: CategoryType;
    categories: CategoryType[];
    getCategory: (categoryId: string) => CategoryType | undefined;
    getAllCategories: () => void;
}

/**
 * Default value that the provider will pass is an empty object
 */
const CategoryContext = createContext<CategoryContextType>({
    category: CATEGORY_INIT,
    categories: [] as CategoryType[],
    getCategory: (categoryId: string) => CATEGORY_INIT,
    getAllCategories: () => {}
});

export default CategoryContext;
