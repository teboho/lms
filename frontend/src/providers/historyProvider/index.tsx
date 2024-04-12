"use client"

import { useEffect, useReducer } from "react";
import { HISTORY_CONTEXT_INITIAL_STATE, HistoryContext, HistoryType } from "./context";
import { historyReducer } from "./reducer";
import { makeAxiosInstance } from "../authProvider";
import Utils from "@/utils";
import { 
    getHistoryDataErrorAction, 
    getHistoryDataRequestAction, 
    getHistoryDataSuccessAction, 
    postHistoryErrorAction, 
    postHistoryRequestAction, 
    postHistorySuccessAction, 
    upViewCountAction 
} from "./actions";

export default function HistoryProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(historyReducer, HISTORY_CONTEXT_INITIAL_STATE);
    
    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        console.log("History Provider is mounted for first time.")
        if (accessToken) {
            getHistoryData();
        }
    }, []);

    /**
     * Gets all the History data
     */
    function getHistoryData() {
        const endpoint = "/api/services/app/History/GetAll";
        dispatch(getHistoryDataRequestAction());
        instance.get(endpoint)
            .then((response) => {
                if (response.data.success) {
                    dispatch(getHistoryDataSuccessAction(response.data.result.items));
                } else {
                    dispatch(getHistoryDataErrorAction());
                }
            })
            .catch((error) => {
                dispatch(getHistoryDataErrorAction());
            });
    }

    /**
     * Sends history item to the backend
     * @param data the new history object
     */
    function postHistory(data: HistoryType) {
        const endpoint = "/api/services/app/History/Create";
        dispatch(postHistoryRequestAction());
        instance.post(endpoint, data)
            .then((response) => {
                if (response.data.success) {
                    dispatch(postHistorySuccessAction(response.data.result));
                } else {
                    dispatch(postHistoryErrorAction());
                }
            })
            .catch((error) => {
                dispatch(postHistoryErrorAction());
            });
    }

    /**
     * 
     * @param patronId the patron id whose history we seek
     */
    function getHistoryByPatron(patronId: number) {
        const endpoint = "/api/services/app/History/GetByPatron";
        dispatch(getHistoryDataRequestAction());
        instance.get(`${endpoint}?patronId=${patronId}`, { params: { patronId } })
            .then((response) => {
                if (response.data.success) {
                    dispatch(getHistoryDataSuccessAction(response.data.result));
                } else {
                    dispatch(getHistoryDataErrorAction());
                }
            })
            .catch((error) => {
                dispatch(getHistoryDataErrorAction());
            });
    }

    /**
     * 
     * @param bookId for the book whose history we want to see
     */
    function getHistoryByBook(bookId: string) {
        const endpoint = "/api/services/app/History/GetByBookId";
        dispatch(getHistoryDataRequestAction());
        instance.get(`${endpoint}?bookId=${bookId}`, { params: { bookId } })
            .then((response) => {
                if (response.data.success) {
                    dispatch(getHistoryDataSuccessAction(response.data.result.items));
                } else {
                    dispatch(getHistoryDataErrorAction());
                }
            })
            .catch((error) => {
                dispatch(getHistoryDataErrorAction());
            });
    }

    function upViewCount() {
        dispatch(upViewCountAction());
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