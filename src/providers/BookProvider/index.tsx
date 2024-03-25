"use client"
import { Provider, useReducer } from "react";
import { BookReducer } from "./reducer";
import { postBookErrorAction, postBookRequestAction, postBookSuccessAction } from "./actions";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function BookProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [BookState, dispatch] = useReducer(BookReducer, {});

    /**
     * 
     * @param loginObj login object
     */
    function search(loginObj: Book_REQUEST_TYPE): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = apiURL + "api/TokenBook/Bookenticate";
        console.log(endpoint);
        console.log(loginObj);
        
        fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(loginObj),
            mode: "cors"
        }).then(res => res.json())
        .then(data => {
            console.log(data.result);
            if (data.result.success) {
                const res: Book_OBJ_TYPE = data.result;
                dispatch(postBookSuccessAction(res));
                
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(postBookErrorAction());
        })
    }
    function logout(): void {

    }
    function refreshToken() {

    }

    return (
        <BookContext.Provider value={{BookObj: BookState.BookObj, login, logout, refreshToken}}>
            {children}
        </BookContext.Provider>
    );
}