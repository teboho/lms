"use client"
import { useContext, useEffect, useReducer, useState } from "react";
import { bookReducer } from "./reducer";
import BookContext, { BookContextStateInit } from "./context";
import axios from "axios";
import { baseURL } from "../authProvider";
import { getBooksErrorAction, getBooksRequestAction, getBooksSuccessAction,
    getBookErrorAction, getBookRequestAction, getBookSuccessAction, 
    setSearchTermAction,
    getSearchBooksRequestAction,
    getSearchBooksSuccessAction,
    getSearchBooksErrorAction,
    postBookRequestAction,
    postBookSuccessAction,
    postBookErrorAction
} from "./actions";
import AuthContext from "../authProvider/context";
import { Preferences } from "@/app/(authorized)/patron/preferences-survey/page";
import { CreateBookType } from "./types";
import { message } from "antd";

export default function BookProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [bookState, dispatch] = useReducer(bookReducer, BookContextStateInit);
    const { authObj } = useContext(AuthContext);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);

    const accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        // check the AuthProvider for the accesToken
        if (accessToken) {
            getAll();
        }
        console.log("Book Provider is mounted for first time.")
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
     * Searching the Google API
     * @param term search term
     */
    function search(term: string): void {
        const endpoint = "/api/services/app/AskGoogle/SearchVolumes";
        
        dispatch(getSearchBooksRequestAction());
        dispatch(setSearchTermAction(term));
        setLoading(true);
        instance.get(`${endpoint}?query=${term}`)
            .then(res => {
                setLoading(false);
                
                if (res.data.success) {
                    if (res.data.result !== null)
                    {
                        dispatch(getSearchBooksSuccessAction({
                            result: res.data.result
                        }))
                    }
                } else {
                    setLoading(false);
                    dispatch(getSearchBooksErrorAction());
                }
            })
    }

   function searchDB(term: string): void {
        const endpoint = "api/services/app/Book/GetSearchBooks";
        dispatch(getBooksRequestAction());
        instance.get(`${endpoint}?name=${term}`)
            .then(res => {
                if (res.data.success) {
                    if (res.data.result !== null)
                    {
                        dispatch(getBooksSuccessAction(res.data.result))
                    }
                } else {
                    dispatch(getBooksErrorAction());
                }
            })
            .catch(err =>  dispatch(getBooksErrorAction()));
   }

    /**
     * get all books (we need to do by category)
     */
    function getAll(): void {
        const endpoint = "api/services/app/Book/GetAll?maxResultCount=10000";
        dispatch(getBooksRequestAction());        
        instance.get(`${endpoint}`)
            .then(res => {
                if (res.data.success) {
                    if (res.data.result !== null)
                    {
                        dispatch(getBooksSuccessAction(res.data.result.items))
                    }
                } else {
                    dispatch(getBooksErrorAction());
                }
            })
            .catch(err =>  dispatch(getBooksErrorAction()));
    }

    /**
     * 
     * @param bookId book id
     */
    function getBook(bookId: string): void {
        const endpoint = "api/services/app/Book/Get?Id=" + bookId;
        dispatch(getBookRequestAction());
        instance.get(`${endpoint}`)
            .then(res => {
                if (res.data.success) {
                    dispatch(getBookSuccessAction(res.data.result))
                } else {
                    dispatch(getBookErrorAction());
                }
            })
            .catch(err =>  dispatch(getBookErrorAction()));
    }

    function savePreferences(prefs: Preferences): void {
        const endpoint = "/api/services/app/Preference/Create";
        dispatch(getBooksRequestAction());
        instance.post(`${endpoint}`, prefs)
            .then(res => {
                if (res.data.success) {
                    if (res.data.result !== null)
                    {
                        dispatch(getBooksSuccessAction(res.data.result))
                    }
                } else {
                    dispatch(getBooksErrorAction());
                }
                    dispatch(getBooksErrorAction());
            })
            .catch(err =>  dispatch(getBooksErrorAction()));
    }

    /**
     * Send a new book to the backend
     * @param book book object
     */
    function sendBook(book: CreateBookType): void {
        const endpoint = "/api/services/app/Book/PostCreateBook";        
        dispatch(postBookRequestAction());
        instance.post(`${endpoint}`, book)
            .then(res => {
                if (res.data.success) {
                    if (res.data.result !== null)
                    {
                        dispatch(postBookSuccessAction(res.data.result));
                        success();
                    }
                } else {
                    dispatch(postBookErrorAction());
                }
            })
            .catch(err =>  dispatch(postBookErrorAction()));
    }

    const success = () => {
        messageApi.success('Book added successfully!');
    }

    const error = () => {
        messageApi.error('An error occurred. Please try again.');
    }

    function getLocalBook(bookId: string) {
        const book = bookState.books?.find(b => b.id === bookId);
        return book;
    }

    return (
        <BookContext.Provider value={{
            books: bookState.books,
            book: bookState.book, 
            searchTerm: bookState.searchTerm, 
            search, savePreferences, getBook, getAll, searchDB, sendBook, getLocalBook,
            searchBooks: bookState.searchBooks,
            loading: loading
        }}>
            {contextHolder}
            {children}
        </BookContext.Provider>
    );
}