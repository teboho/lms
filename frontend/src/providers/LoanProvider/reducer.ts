import { handleActions } from "redux-actions";
import { LoanContextStateInit, LoanContextStateType } from "./context";
import { LoanActionEnums } from "./actions";

/**
 * A reducer for the loan context
 */
export const loanReducer = handleActions<LoanContextStateType>(
    {
        [LoanActionEnums.PostLoanRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  
        [LoanActionEnums.PostLoanSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), 
        [LoanActionEnums.PostLoanError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        
        [LoanActionEnums.GetLoanRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }), 
        [LoanActionEnums.GetLoanSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), 
        [LoanActionEnums.GetLoanError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [LoanActionEnums.GetLoansRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  
        [LoanActionEnums.GetLoansSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), 
        [LoanActionEnums.GetLoansError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        
        [LoanActionEnums.PutLoanRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [LoanActionEnums.PutLoanSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [LoanActionEnums.PutLoanError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [LoanActionEnums.ClearLoan]: (state, action) => ({
            ...state,
            ...action.payload
        })
    },
    LoanContextStateInit
)