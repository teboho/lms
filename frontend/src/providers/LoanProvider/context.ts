"use client";
import { createContext } from "react";

// Loan type
export interface LoanType {
    id: string;
    patronId: number;
    bookId: string;
    dateCreated: string;
    dateDue: string;
    dateReturned: string;
    isReturned: boolean;
    isOverdue: boolean;
    confirmed?: boolean;
}

export const LoanInit: LoanType = {
    "id": "",
    "patronId": 0,
    "bookId": "",
    "dateCreated": "",
    "dateDue": "2024-04-02T12:39:20.538Z",
    "dateReturned": "2024-04-02T12:39:20.538Z",
    "isReturned": true,
    "isOverdue": true,
    "confirmed": false
}

export interface LoanContextType {
    loan: LoanType;
    loans: LoanType[];
    makeLoan: (loan: LoanType) => void;
    updateLoan: (loan: LoanType) => void;
    getLoans: () => void;
    getLoan: (loanId: string) => void;
    getLoansByPatron: (id: number) => LoanType[];
    getLoansByBook: (id: string) => LoanType[];
    getReturnedLoans: () => void;
    putLoan: (loan: LoanType) => void;
    getReturnLoan: (id: string) => void;
    clearLoan: () => void;
}

export const LoanContextDefault: LoanContextType = {
    loan: LoanInit,
    loans: [] as LoanType[],
    makeLoan: () => {},
    updateLoan: () => {},
    getLoans: () => {},
    getLoan: () => {},
    getLoansByPatron: (id: number) => [] as LoanType[],
    getLoansByBook: (id: string) => [] as LoanType[],
    getReturnedLoans: () => {},
    putLoan: (loan: LoanType) => {},
    getReturnLoan: (id: string) => {},
    clearLoan: () => {},
}

// export const LoanValueDefault: LoanContextType  = {
//     loans: [] as LoanType[],
//     loan: LoanInit,
//     makeLoan: () => {},
//     updateLoan: () => {},
//     getLoans: () => {},
//     getLoan: (loanId) => {},
//     getLoansByPatron: (id) => [] as LoanType[],
//     getLoansByBook: (id) => [] as LoanType[],
//     getReturnedLoans: () => {},
//     putLoan: (loan) => {}
// }

/**
 * Default value that the provider will pass is an empty
 * object
 */
export interface LoanStateType {
    loan: LoanType;
    loans: LoanType[];
    isPending: boolean;
    isSuccess: boolean;
    isError: boolean;
}

export const LOAN_CONTEXT_INITIAL_STATE = {
    loan: LoanInit,
    loans: [] as LoanType[],
    isPending: false,
    isSuccess: false,
    isError: false
}

/**
 * Default value that the provider will pass is an empty object
 */
export const LoanContext = createContext<LoanContextType>(LoanContextDefault);
