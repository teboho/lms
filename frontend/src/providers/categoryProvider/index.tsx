"use client";
import { useContext, useEffect, useReducer } from "react";
import { categoryReducer } from "./reducer";
import { getCategoriesErrorAction, getCategoriesRequestAction, getCategoriesSuccessAction } from "./actions";
import { makeAxiosInstance } from "../authProvider";
import CategoryContext, { CategoryContextStateInit, CategoryType } from "./context";
import Utils from "@/utils";
import AuthContext from "../authProvider/context";

export default function CategoryProvider({ children }: { children: React.ReactNode }) {
    const [categoryState, dispatch] = useReducer(categoryReducer, CategoryContextStateInit);
    const { authObj } = useContext(AuthContext);

    let accessToken = authObj?.accessToken;
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        console.log("Category Provider is mounted for first time.")
        accessToken = authObj?.accessToken;
    }, []);

    useEffect(() => {
        accessToken = authObj?.accessToken;
    }, [authObj]);

    /**
     * Get all the categories
     */
    function getAllCategories() {
        dispatch(getCategoriesRequestAction());
        instance.get(`/api/services/app/Category/GetAll?skipCount=0&maxResultCount=1000`)
            .then(res => {
                if (res.data.success) {
                    if (res.data.result)
                    {
                        dispatch(getCategoriesSuccessAction(res.data.result.items))
                    } else{
                        dispatch(getCategoriesErrorAction());
                    }
                } else {
                    dispatch(getCategoriesErrorAction());
                }
            });
    }

    /**
     * 
     * @param id the id of the category
     * @returns the category
     */
    function getCategory(id: string): CategoryType | undefined {
        const category = categoryState.categories?.filter((category: CategoryType) => category.id === id)[0];
        return category;
    }

    return (
        <CategoryContext.Provider value={{categories: categoryState.categories, category: categoryState.category, getAllCategories: getAllCategories, getCategory}}>
            {children}
        </CategoryContext.Provider>
    );
}