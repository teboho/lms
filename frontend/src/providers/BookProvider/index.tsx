"use client"
import { use, useContext, useEffect, useReducer } from "react";
import { bookReducer } from "./reducer";
import BookContext, { BOOK_CONTEXT_INITIAL_STATE } from "./context";
import axios from "axios";
import { baseURL } from "../AuthProvider";
import { getBooksErrorAction, getBooksRequestAction, getBooksSuccessAction,
    getBookErrorAction, getBookRequestAction, getBookSuccessAction, 
    setSearchTermAction
} from "./actions";
import { Preferences } from "@/app/(authorized)/Survey/page";
import AuthContext from "../AuthProvider/context";

export default function BookProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [bookState, dispatch] = useReducer(bookReducer, BOOK_CONTEXT_INITIAL_STATE);
    const { authObj } = useContext(AuthContext);

    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        // check the AuthProvider for the accesToken
        if (accessToken) {
            getAll();
        }
    }, []);

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
        const endpoint = "api/services/app/Book/GetSearchBooks";
        console.log(endpoint);
        console.log(term);

        dispatch(setSearchTermAction(term));
        
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
    /**
     * get all books (we need to do by category)
     */
    function getAll(): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = "api/services/app/Book/GetAll?maxResultCount=10000";
        console.log(endpoint);
        // console.log(term);
        
        // before we make the http request, we set pending to true via dispatch
        dispatch(getBooksRequestAction());
        // the we make the call
        instance.get(`${endpoint}`)
            .then(res => {
                console.log("results", res.data)
                if (res.data.success) {
                    // disptach for success
                    if (res.data.result !== null)
                    {
                        dispatch(getBooksSuccessAction(res.data.result.items))
                    }
                } else {
                    // dispatch for erroe
                    dispatch(getBooksErrorAction());
                }
            })
    }

    /**
     * 
     * @param bookId book id
     */
    function getBook(bookId: string): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = "api/services/app/Book/Get?Id=" + bookId;
        
        // before we make the http request, we set pending to true via dispatch
        dispatch(getBookRequestAction());
        // the we make the call
        instance.get(`${endpoint}`)
            .then(res => {
                console.log("book result", res.data.result)
                if (res.data.success) {
                    // disptach for success
                    if (res.data.result !== null)
                    {
                        dispatch(getBookSuccessAction(res.data.result))
                    }
                } else {
                    // dispatch for erroe
                    dispatch(getBookErrorAction());
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
        <BookContext.Provider value={{books: bookState.books, book: bookState.book, searchTerm: bookState.searchTerm, search, savePreferences, getBook, getAll}}>
            {children}
        </BookContext.Provider>
    );
}