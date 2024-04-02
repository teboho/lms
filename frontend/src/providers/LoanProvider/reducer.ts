import { handleActions } from "redux-actions";
import { LOAN_CONTEXT_INITIAL_STATE } from "./context";
import { LoanActionEnums } from "./actions";

/**
 * A reducer t
 */
export const loanReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [LoanActionEnums.PostLoanRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [LoanActionEnums.PostLoanSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), // this handler will change the value of the isError in the state
        [LoanActionEnums.PostLoanError]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    LOAN_CONTEXT_INITIAL_STATE
)