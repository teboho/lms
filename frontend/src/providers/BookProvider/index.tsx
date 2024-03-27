"use client"
import { Provider, useReducer } from "react";
import { BookReducer } from "./reducer";
import { BookContext } from "./context";
import axios from "axios";
import { baseURL } from "../AuthProvider";
import { getBooksErrorAction, getBooksRequestAction, getBooksSuccessAction } from "./actions";
import { Preferences } from "@/app/(authorized)/Survey/page";

export default function BookProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [bookState, dispatch] = useReducer(BookReducer, {
        results: []
    });
    const accessToken = localStorage.getItem("accessToken");
    // Axios instance
    const instance = axios.create({
        baseURL: baseURL,
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    });

    /**
     * 
     * @param term search term
     */
    function search(term: string): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = "api/services/app/Book/GetSearchBooks";
        console.log(endpoint);
        console.log(term);
        
        // before we make the http request, we set pending to true via dispatch
        dispatch(getBooksRequestAction());
        // the we make the call
        instance.get(`${endpoint}?name=${term}`)
            .then(res => {
                console.log("results", res.data)
                if (res.data.success) {
                    // disptach for success
                    if (res.data.result !== null)
                    {
                        dispatch(getBooksSuccessAction(res.data.result))
                    }
                } else {
                    // dispatch for erroe
                    dispatch(getBooksErrorAction());
                }
            })
    }

    function savePreferences(prefs: Preferences): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = "/api/services/app/Preference/Create";
        console.log(endpoint);
        console.log(prefs);
        
        // // before we make the http request, we set pending to true via dispatch
        // dispatch(getBooksRequestAction());
        // // the we make the call
        // instance.post(`${endpoint}`, prefs)
        //     .then(res => {
        //         console.log("results", res.data)
        //         if (res.data.success) {
        //             // disptach for success
        //             if (res.data.result !== null)
        //             {
        //                 dispatch(getBooksSuccessAction(res.data.result))
        //             }
        //         } else {
        //             // dispatch for erroe
        //             dispatch(getBooksErrorAction());
        //         }
        //             dispatch(getBooksErrorAction());
        //     }).catch(err =>  dispatch(getBooksErrorAction()));
    }

    return (
        <BookContext.Provider value={{bookState, search, savePreferences}}>
            {children}
        </BookContext.Provider>
    );
}