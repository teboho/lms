"use client"

import { use, useEffect, useReducer } from "react";
import { HISTORY_CONTEXT_INITIAL_STATE, HistoryContext, HistoryType } from "./context";
import { historyReducer } from "./reducer";
import { makeAxiosInstance } from "../authProvider";
import Utils from "@/utils";
import { getHistoryDataErrorAction, getHistoryDataRequestAction, getHistoryDataSuccessAction, postHistoryErrorAction, postHistoryRequestAction, postHistorySuccessAction, upViewCountAction } from "./actions";
import { stat } from "fs";

export default function HistoryProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(historyReducer, HISTORY_CONTEXT_INITIAL_STATE);
    
    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        // get history data
        if (accessToken) {
            getHistoryData();
        }
        console.log("History Provider is mounted for first time.")
    }, []);

    function getHistoryData() {
        // get all history 
        const endpoint = "/api/services/app/History/GetAll";
        dispatch(getHistoryDataRequestAction());
        instance.get(endpoint)
            .then((response) => {
                console.log(response.data.result);
                if (response.data.success) {
                    // dispatch success action
                    dispatch(getHistoryDataSuccessAction(response.data.result.items));
                } else {
                    // dispatch error action
                    dispatch(getHistoryDataErrorAction());
                }
            })
            .catch((error) => {
                // dispatch error action
                dispatch(getHistoryDataErrorAction());
            });
    }

    function postHistory(data: HistoryType) {
        // post history data
        const endpoint = "/api/services/app/History/Create";
        dispatch(postHistoryRequestAction());
        instance.post(endpoint, data)
            .then((response) => {
                if (response.data.success) {
                    // dispatch success action
                    console.log(response.data.result);
                    dispatch(postHistorySuccessAction(response.data.result));
                } else {
                    // dispatch error action
                    dispatch(postHistoryErrorAction());
                }
            })
            .catch((error) => {
                // dispatch error action
                dispatch(postHistoryErrorAction());
            });
    }

    function getHistoryByPatron(patronId: number) {
        // get history by patron id
        const endpoint = "/api/services/app/History/GetByPatron";
        dispatch(getHistoryDataRequestAction());
        instance.get(`${endpoint}?patronId=${patronId}`, { params: { patronId } })
            .then((response) => {
                console.log("history data..", response.data.result);
                if (response.data.success) {
                    // dispatch success action
                    dispatch(getHistoryDataSuccessAction(response.data.result));
                } else {
                    // dispatch error action
                    dispatch(getHistoryDataErrorAction());
                }
            })
            .catch((error) => {
                // dispatch error action
                dispatch(getHistoryDataErrorAction());
            });
    }

    function getHistoryByBook(bookId: string) {
        // get history by book id
        const endpoint = "/api/services/app/History/GetByBookId";
        dispatch(getHistoryDataRequestAction());
        instance.get(`${endpoint}?bookId=${bookId}`, { params: { bookId } })
            .then((response) => {
                console.log(response.data.result);
                if (response.data.success) {
                    // dispatch success action
                    dispatch(getHistoryDataSuccessAction(response.data.result.items));
                } else {
                    // dispatch error action
                    dispatch(getHistoryDataErrorAction());
                }
            })
            .catch((error) => {
                // dispatch error action
                dispatch(getHistoryDataErrorAction());
            });
    }

    function upViewCount() {
        dispatch(upViewCountAction(state));
    }

    return (
        <HistoryContext.Provider value={{ 
            history: state.history,
            historyData: state.historyData,
            getHistoryData,
            postHistory,
            getHistoryByBook,
            getHistoryByPatron,
            viewCount: state.viewCount,
            upViewCount
        }}>
            {children}
        </HistoryContext.Provider>
    );
}