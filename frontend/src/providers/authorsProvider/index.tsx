"use client";

import React, { useContext, useEffect, useReducer } from "react";
import AuthorsContext, { AuthorDataType, AuthorsContextStateInit, } from "./context";
import { makeAxiosInstance } from "../authProvider";
import { getAuthorErrorAction, getAuthorRequestAction, getAuthorsErrorAction, getAuthorsRequestAction, getAuthorsSuccessAction, getAuthorSuccessAction } from "./actions";
import Utils from "@/utils";
import { authorsReducer } from "./reducer";
import AuthContext from "../authProvider/context";

export default function AuthorsProvider({ children }: { children: React.ReactNode }) {
    const [authorsState, dispatch] = useReducer(authorsReducer, AuthorsContextStateInit);
    const { authObj } = useContext(AuthContext);

    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        console.log("Authors Provider is mounted for first time.")
    }, []);

    useEffect(() => {
        if (accessToken) {
            getAuthors();
        }
    }, [authObj]);

    /**
     * 
     * @param id the author id
     */
    const getAuthor = (id: string): void => {
        dispatch(getAuthorRequestAction());
        instance.get(`/api/services/app/Author/Get?Id=${id}`)
            .then((response) => {
                dispatch(getAuthorSuccessAction(response.data.result));
            })
            .catch((error) => {
                dispatch(getAuthorErrorAction());
            });
    }

    /**
     * 
     * @param id the author id
     * @returns the author object
     */
    const _getAuthor = (id: string) => {
        return authorsState.authors?.filter((author: AuthorDataType) => author.id === id)[0];
    }

    /**
     * Get all the authors
     */
    const getAuthors = (): void => {
        const endpoint = "/api/services/app/Author/GetAll?skipCount=0&maxResultCount=1000";
        dispatch(getAuthorsRequestAction());
        instance.get(`${endpoint}`)
            .then((response) => {
                dispatch(getAuthorsSuccessAction(response.data.result.items));
            })
            .catch((error) => {
                dispatch(getAuthorsErrorAction());
                console.error(error);
            });
    }

    const setAuthors = (authors: AuthorDataType[]): void => {
        
    }

    /**
     * 
     * @param id the author id
     * @returns the author object
     */
    function getAuthorById(id: string) {
        return authorsState.authors?.filter((author: AuthorDataType) => author.id === id)[0];
    }

    return (
        <AuthorsContext.Provider value={{
            authorsState,
            getAuthor,
            getAuthors,
            setAuthors,
            getAuthorById,
            _getAuthor
        }}>
            {children}
        </AuthorsContext.Provider>
    );
}