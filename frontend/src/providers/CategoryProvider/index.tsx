"use client"
import { Provider, useContext, useEffect, useReducer } from "react";
import { categoryReducer } from "./reducer";
import { getCategoriesErrorAction, getCategoriesRequestAction, getCategoriesSuccessAction, getCategoryErrorAction, getCategoryRequestAction, getCategorySuccessAction } from "./actions";
import { baseURL, makeAxiosInstance } from "../AuthProvider";
import axios, { Axios, AxiosInstance } from "axios";
import AuthContext from "../AuthProvider/context";
import CategoryContext, { CATEGORY_CONTEXT_INITIAL_STATE, CategoryType } from "./context";
import Utils from "@/utils";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function CategoryProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reduce3rs
    const [categoryState, dispatch] = useReducer(categoryReducer, CATEGORY_CONTEXT_INITIAL_STATE);

    const accessToken = Utils.getAccessToken(); // localStorage.getItem("accessToken");
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        // get the categories
        if (accessToken) {
            getAllCategories();
        }
    }, []);

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
                    if (res.data.result !== null)
                    {
                        dispatch(getCategoriesSuccessAction(res.data.result.items))
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

        // dispatch(getCategorySuccessAction(category));

        return category;
    }

    return (
        <CategoryContext.Provider value={{categories: categoryState.categories, category: categoryState.category, getAllCategories: getAllCategories, getCategory}}>
            {children}
        </CategoryContext.Provider>
    );
}