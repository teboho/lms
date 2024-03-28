"use client"
import { useReducer } from "react";
import { LOAN_CONTEXT_INITIAL_STATE, LOAN_REQUEST_TYPE, LoanContext, LOAN_OBJ_TYPE } from "./context";
import { loanReducer } from "./reducer";
import { postLoanErrorAction, postLoanRequestAction, postLoanSuccessAction } from "./actions";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function LoanProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [loanState, dispatch] = useReducer(loanReducer, LOAN_CONTEXT_INITIAL_STATE);

    return (
        <LoanContext.Provider value={{loanObj: loanState.loanObj, login, logout, refreshToken}}>
            {children}
        </LoanContext.Provider>
    );
}