"use client";
import { createContext } from "react";

// Loan type
export interface LOAN_OBJ_TYPE {
    id?: string;
    patronId: number;
    bookId: number;
    dateCreated?: string;
    dateDue?: string;
    dateReturned?: string;
    isReturned?: boolean;
    isOverdue?: boolean;
}

export const LOAN_INIT_VALUE = {
    "id": "",
    "patronId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "bookId": 0,
    "dateCreated": "2024-04-02T12:39:20.538Z",
    "dateDue": "2024-04-02T12:39:20.538Z",
    "dateReturned": "2024-04-02T12:39:20.538Z",
    "isReturned": true,
    "isOverdue": true
}

export const LOAN_CONTEXT_INITIAL_STATE = {
    loanObj: LOAN_INIT_VALUE,
    isPending: false,
    isSuccess: false,
    isError: false,
    loans: [] as LOAN_OBJ_TYPE[]
}

/**
 * Default value that the provider will pass is an empty
 * object
 */
export interface LoanStateType {
    loanObj: LOAN_OBJ_TYPE;
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
    loans: LOAN_OBJ_TYPE[];
}

export interface LoanValueType {
    loanState: LoanStateType;
    makeLoan: (loan: LOAN_OBJ_TYPE) => void;
    updateLoan: (loan: LOAN_OBJ_TYPE) => void;
}

export const LoanValueDefault: LoanValueType = {
    loanState: LOAN_CONTEXT_INITIAL_STATE,
    makeLoan: () => {},
    updateLoan: () => {},
}

/**
 * Default value that the provider will pass is an empty object
 */
export const LoanContext = createContext<LoanValueType>(LoanValueDefault);
