"use client";
import { createAction } from "redux-actions";
import { LoanType } from "./context";

export const LoanActionEnums = {
    PostLoanRequest: "POST_LOAN_REQUEST",
    PostLoanSuccess: "POST_LOAN_SUCCESS",
    PostLoanError: "POST_LOAN_ERROR",

    GetLoanRequest: "GET_LOAN_REQUEST",
    GetLoanSuccess: "GET_LOAN_SUCCESS",
    GetLoanError: "GET_LOAN_ERROR",

    GetLoansRequest: "GET_LOANS_REQUEST",
    GetLoansSuccess: "GET_LOANS_SUCCESS",
    GetLoansError: "GET_LOANS_ERROR",

    PutLoanRequest: "PUT_LOAN_REQUEST",
    PutLoanSuccess: "PUT_LOAN_SUCCESS",
    PutLoanError: "PUT_LOAN_ERROR",

    ClearLoan: "CLEAR_LOAN"
}

// Actions for the loan context
// Each action should only change the specific values in the state that it is supposed to change not the whole state!!

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const postLoanRequestAction = createAction(
    LoanActionEnums.PostLoanRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, loan: undefined, loans: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postLoanSuccessAction = createAction(
    LoanActionEnums.PostLoanSuccess,
    (loan: LoanType): any => ({ isSuccess: true, isPending: false, isError: false, loan})
);

/**
 * Sets the isError to true but then all else to false
 */
export const postLoanErrorAction = createAction(
    LoanActionEnums.PostLoanError,
    () => ({ isSuccess: false, isPending: false, isError: true, loan: undefined, loans: undefined })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getLoanRequestAction = createAction(
    LoanActionEnums.GetLoanRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, loan: undefined, loans: undefined })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getLoanSuccessAction = createAction(
    LoanActionEnums.GetLoanSuccess,
    (loan: LoanType) => ({ isSuccess: true, isPending: false, isError: false, loan, loans: undefined })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getLoanErrorAction = createAction(
    LoanActionEnums.GetLoanError,
    () => ({ isSuccess: false, isPending: false, isError: true, loan: undefined })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getLoansRequestAction = createAction(
    LoanActionEnums.GetLoansRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, loans: undefined })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getLoansSuccessAction = createAction(
    LoanActionEnums.GetLoansSuccess,
    (loans: LoanType[]) => {
        return ({ isSuccess: true, isPending: false, isError: false, loans })
    }
);

/**
 * Sets the isError to true but then all else to false
 */
export const getLoansErrorAction = createAction(
    LoanActionEnums.GetLoansError,
    () => ({ isSuccess: false, isPending: false, isError: true, loan: undefined, loans: undefined })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const putLoanRequestAction = createAction(
    LoanActionEnums.PutLoanRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, loan: undefined })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const putLoanSuccessAction = createAction(
    LoanActionEnums.PutLoanSuccess,
    (loan: LoanType): any => ({ isSuccess: true, isPending: false, isError: false, loan})
);

/**
 * Sets the isError to true but then all else to false
 */
export const putLoanErrorAction = createAction(
    LoanActionEnums.PutLoanError,
    () => ({ isSuccess: false, isPending: false, isError: true, loan: undefined, loans: undefined })
);

export const clearLoanAction = createAction(
    LoanActionEnums.ClearLoan,
    () => ({ isSuccess: false, isPending: false, isError: false, loan: undefined, loans: undefined })
)