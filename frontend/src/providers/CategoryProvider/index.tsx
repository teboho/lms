"use client";
import { useContext, useEffect, useReducer } from "react";
import { categoryReducer } from "./reducer";
import { getCategoriesErrorAction, getCategoriesRequestAction, getCategoriesSuccessAction } from "./actions";
import { makeAxiosInstance } from "../authProvider";
import CategoryContext, { CATEGORY_CONTEXT_INITIAL_STATE, CategoryType } from "./context";
import Utils from "@/utils";
import AuthContext from "../authProvider/context";

export default function CategoryProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reduce3rs
    const [categoryState, dispatch] = useReducer(categoryReducer, CATEGORY_CONTEXT_INITIAL_STATE);
    const { authObj } = useContext(AuthContext);

    const accessToken = Utils.getAccessToken(); // localStorage.getItem("accessToken");
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        console.log("Category Provider is mounted for first time.")
    }, []);

    useEffect(() => {
        // get the categories
        // if (accessToken) {
        //     getAllCategories();
        // }
        console.log("auth object has changed...", authObj);
    }, [authObj]);

    // get the categories
    function getAllCategories() {
        // before we make the http request, we set pending to true via dispatch
        dispatch(getCategoriesRequestAction());
        // the we make the call
        instance.get(`/api/services/app/Category/GetAll?skipCount=0&maxResultCount=1000`)
            .then(res => {
                console.log("results", res.data.result.items)
                if (res.data.success) {
                    // disptach for success
                    if (res.data.result)
                    {
                        dispatch(getCategoriesSuccessAction(res.data.result.items))
                    } else{
                        // dispatch for error
                        dispatch(getCategoriesErrorAction());
                    }
                } else {
                    // dispatch for erroe
                    dispatch(getCategoriesErrorAction());
                }
            });
    }

    // get the category by id
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