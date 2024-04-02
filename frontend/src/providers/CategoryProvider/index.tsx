"use client"
import { Provider, useContext, useEffect, useReducer } from "react";
import { categoryReducer } from "./reducer";
import { getCategoryErrorAction, getCategoryRequestAction, getCategorySuccessAction } from "./actions";
import { baseURL, makeAxiosInstance } from "../AuthProvider";
import axios, { Axios, AxiosInstance } from "axios";
import AuthContext from "../AuthProvider/context";
import CategoryContext from "./context";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function CategoryProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reduce3rs
    const [categoryState, dispatch] = useReducer(categoryReducer, {});
    const { authObj } = useContext(AuthContext);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const instance = makeAxiosInstance(accessToken);

        // get the categories
        if (accessToken) {
            getCategories(instance);
        }
    }, []);

    // get the categories
    function getCategories(instance: AxiosInstance) {
        // before we make the http request, we set pending to true via dispatch
        dispatch(getCategoryRequestAction());
        // the we make the call
        instance.get(`/api/services/app/Category/GetAll?skipCount=0&maxResultCount=1000`)
            .then(res => {
                console.log("results", res.data.result.items)
                if (res.data.success) {
                    // disptach for success
                    if (res.data.result !== null)
                    {
                        dispatch(getCategorySuccessAction(res.data.result.items))
                    }
                } else {
                    // dispatch for erroe
                    dispatch(getCategoryErrorAction());
                }
            });
    }

    return (
        <CategoryContext.Provider value={{getCategories, categoryState}}>
            {children}
        </CategoryContext.Provider>
    );
}