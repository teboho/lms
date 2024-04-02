"use client"
import { useReducer } from "react";
import { LoanContext, LOAN_OBJ_TYPE, LOAN_CONTEXT_INITIAL_STATE } from "./context";
import { postLoanErrorAction, postLoanRequestAction, postLoanSuccessAction } from "./actions";
import { loanReducer } from "./reducer";
import { makeAxiosInstance } from "../AuthProvider";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function LoanProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [state, dispatch] = useReducer(loanReducer, LOAN_CONTEXT_INITIAL_STATE);

    const accessToken = localStorage.getItem("accessToken");
    const instance = makeAxiosInstance(accessToken);
    
    const makeLoan = (loanObj: LOAN_OBJ_TYPE): void => {
        const endpoint = "api/services/app/Loan/Create";
        dispatch(postLoanRequestAction());
        instance.post(`${apiURL}/${endpoint}`, loanObj)
            .then(res => {
                console.log("results", res.data);
                if (res.data.success) {
                    dispatch(postLoanSuccessAction(res.data.result));
                } else {
                    dispatch(postLoanErrorAction());
                }
            })
            .catch(() => {
                dispatch(postLoanErrorAction());
            });
    }

    const updateLoan = (loanObj: LOAN_OBJ_TYPE): void => {
        const endpoint = "api/services/app/Loan/Update";
        dispatch(postLoanRequestAction());
        instance.put(`${apiURL}/${endpoint}`, loanObj)
            .then(res => {
                console.log("results", res.data);
                if (res.data.success) {
                    dispatch(postLoanSuccessAction(res.data.result));
                } else {
                    dispatch(postLoanErrorAction());
                }
            })
            .catch(() => {
                dispatch(postLoanErrorAction());
            });
    }

    return (
        <LoanContext.Provider value={{ loanState: state, makeLoan, updateLoan }}>
            {children}
        </LoanContext.Provider>
    );
}