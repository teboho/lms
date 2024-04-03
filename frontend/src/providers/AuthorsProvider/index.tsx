"use client"
import React, { useContext, useEffect, useReducer } from "react";
import { authorsReducer } from "./reducer";
import AuthorsContext, { AuthorDataType, AuthorsContextInit, } from "./context";
import { baseURL, makeAxiosInstance } from "../AuthProvider";
import AuthContext from "../AuthProvider/context";
import { getAuthorErrorAction, getAuthorRequestAction, getAuthorsErrorAction, getAuthorsRequestAction, getAuthorsSuccessAction, getAuthorSuccessAction } from "./actions";
import Utils from "@/utils";

export default function AuthorsProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [authorsState, dispatch] = useReducer(authorsReducer, AuthorsContextInit);
    const { authObj } = useContext(AuthContext);

    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        if (accessToken) {
            getAuthors();
        }
    }, [authObj]);

    const getAuthor = (id: string): void => {
        dispatch(getAuthorRequestAction());
        instance.get(`/api/services/app/Author/Get?Id=${id}`)
            .then((response) => {
                console.log("author response", response.data.result);
                dispatch(getAuthorSuccessAction(response.data.result));
            })
            .catch((error) => {
                dispatch(getAuthorErrorAction());
                console.error(error);
            });
    }

    const getAuthors = (): void => {
        const endpoint = "/api/services/app/Author/GetAll?skipCount=0&maxResultCount=1000";
        dispatch(getAuthorsRequestAction());
        instance.get(`${endpoint}`)
            .then((response) => {
                console.log("authors", response);
                dispatch(getAuthorsSuccessAction(response.data.result.items));
            })
            .catch((error) => {
                dispatch(getAuthorsErrorAction());
                console.error(error);
            });
    }

    const setAuthors = (authors: AuthorDataType[]): void => {
        
    }

    function getAuthorById(id: string) {
        return authorsState.authors?.filter((author: AuthorDataType) => author.id === id)[0];
    }

    return (
        <AuthorsContext.Provider value={{
            authorsState,
            getAuthor,
            getAuthors,
            setAuthors,
            getAuthorById
        }}>
            {children}
        </AuthorsContext.Provider>
    );
}