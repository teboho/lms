"use client"
import React, { useContext, useEffect, useReducer } from "react";
import { authorsReducer } from "./reducer";
import AuthorsContext, { AuthorDataType, AuthorsContextInit, } from "./context";
import { baseURL, makeAxiosInstance } from "../AuthProvider";
import AuthContext from "../AuthProvider/context";
import { getAuthorErrorAction, getAuthorRequestAction, getAuthorsErrorAction, getAuthorsRequestAction, getAuthorsSuccessAction, getAuthorSuccessAction } from "./actions";

export default function AuthorsProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [authorsState, dispatch] = useReducer(authorsReducer, AuthorsContextInit);
    const { authObj } = useContext(AuthContext);

    const instance = makeAxiosInstance(authObj.accessToken);

    useEffect(() => {
        if (authObj.accessToken) {
            getAuthors();
        }
    }, [authObj]);

    const getAuthor = (id: string): void => {
        dispatch(getAuthorRequestAction());
        instance.get(`app/Authors/Get?Id=${id}`)
            .then((response) => {
                console.log("response", response);
                dispatch(getAuthorSuccessAction(response.data));
            })
            .catch((error) => {
                dispatch(getAuthorErrorAction());
                console.error(error);
            });
    }

    const getAuthors = (): void => {
        dispatch(getAuthorsRequestAction());
        instance.get(`${baseURL}/authors`)
            .then((response) => {
                console.log("response", response);
                dispatch(getAuthorsSuccessAction(response.data));
            })
            .catch((error) => {
                dispatch(getAuthorsErrorAction());
                console.error(error);
            });
    }

    const setAuthors = (authors: AuthorDataType[]): void => {
        
    }

    return (
        <AuthorsContext.Provider value={{
            authorsState,
            getAuthor,
            getAuthors,
            setAuthors
        }}>
            {children}
        </AuthorsContext.Provider>
    );
}