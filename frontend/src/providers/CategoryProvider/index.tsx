"use client"
import { Provider, useContext, useEffect, useReducer } from "react";
import { CategoryContext } from "./context";
import { categoryReducer } from "./reducer";
import { getCategoryErrorAction, getCategoryRequestAction, getCategorySuccessAction } from "./actions";
import { baseURL } from "../AuthProvider";
import axios from "axios";
import { AuthContext } from "../AuthProvider/context";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function CategoryProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [categoryState, dispatch] = useReducer(categoryReducer, {});
    const { authObj } = useContext(AuthContext);
    
    useEffect(() => {
        getCategories();
    }, [])

    const instance = axios.create({
        baseURL: baseURL,
        headers: {
            "Authorization": `Bearer ${authObj.accessToken}`,
            "Content-Type": "application/json"
        }
    });

    // get the categories
    function getCategories() {
        // before we make the http request, we set pending to true via dispatch
        dispatch(getCategoryRequestAction());
        // the we make the call
        instance.get(`/api/services/app/Category/GetAll`)
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