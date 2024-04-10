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

export interface CategoryContextStateType {
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    categories?: CategoryType[];
    category?: CategoryType;
}

export const CategoryContextStateInit: CategoryContextStateType = {
    isPending: false,
    isError: false,
    isSuccess: false,
    categories: [] as CategoryType[],
    category: CATEGORY_INIT
}

export interface CategoryContextValueType {
    category: CategoryType | undefined;
    categories: CategoryType[] | undefined;
    getCategory: (categoryId: string) => CategoryType | undefined;
    getAllCategories: () => void;
}

const CategoryContext = createContext<CategoryContextValueType>({
    category: CATEGORY_INIT,
    categories: [] as CategoryType[],
    getCategory: (categoryId: string) => CATEGORY_INIT,
    getAllCategories: () => {}
});

export default CategoryContext;
