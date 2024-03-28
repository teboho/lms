"use client";
import { createAction } from "redux-actions";
import { LOAN_CONTEXT_STATE_TYPE, LOAN_OBJ_TYPE } from "./context";

// experiment
// export enum LoanActionEnums {
//     SetToken = "SET_TOKEN",
// }

export const LoanActionEnums = {
    PostLoanRequest: "POST_LOAN_REQUEST",
    PostLoanSuccess: "POST_LOAN_SUCCESS",
    PostLoanError: "POST_LOAN_ERROR"
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const postLoanRequestAction = createAction(
    LoanActionEnums.PostLoanRequest,
    (): LOAN_CONTEXT_STATE_TYPE => ({ isSuccess: false, isInProgress: true, isError: false, loanObj: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postLoanSuccessAction = createAction(
    LoanActionEnums.PostLoanSuccess,
    (loanObj: LOAN_OBJ_TYPE): any => ({ isSuccess: true, isInProgress: false, isError: false, loanObj})
);

/**
 * Sets the isError to true but then all else to false
 */
export const postLoanErrorAction = createAction(
    LoanActionEnums.PostLoanSuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, loanObj: {}})
);
