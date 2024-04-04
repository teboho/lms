"use client"
import { useEffect, useReducer } from "react";
import { LoanContext, LoanType, LOAN_CONTEXT_INITIAL_STATE } from "./context";
import { getLoanErrorAction, getLoanRequestAction, getLoansErrorAction, getLoansRequestAction, getLoansSuccessAction, getLoanSuccessAction, postLoanErrorAction, postLoanRequestAction, postLoanSuccessAction } from "./actions";
import { loanReducer } from "./reducer";
import { makeAxiosInstance } from "../authProvider";
import Utils from "@/utils";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function LoanProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [state, dispatch] = useReducer(loanReducer, LOAN_CONTEXT_INITIAL_STATE);

    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        console.log("Loan Provider is mounted");
        if (accessToken) {
            getLoans();
        }
    }, []);
    
    const makeLoan = (loanObj: LoanType): void => {
        const endpoint = "api/services/app/Loan/Create";
        dispatch(postLoanRequestAction());
        instance.post(`${apiURL}/${endpoint}`, loanObj)
            .then(res => {
                console.log("loan create", res.data);
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

    const updateLoan = (loanObj: LoanType): void => {
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

    const getLoans = (): void => {
        const endpoint = "api/services/app/Loan/GetAll";
        dispatch(getLoansRequestAction());
        instance.get(`${apiURL}/${endpoint}`)
            .then(res => {
                console.log("results of getting loans", res.data.result.items);
                console.log("results of getting loans----", res.data.success);
                if (res.data.success) {
                    dispatch(getLoansSuccessAction(res.data.result.items));
                } else {
                    dispatch(getLoansErrorAction());
                }
            })
            .catch(() => {
                dispatch(getLoansErrorAction());
            });
    }

    const getLoan = (loanId: string): void => {
        const endpoint = `api/services/app/Loan/Get?Id=${loanId}`;
        dispatch(getLoanRequestAction());
        instance.get(`${apiURL}/${endpoint}`)
            .then(res => {
                console.log("results of getting loan", res.data);
                if (res.data.success) {
                    dispatch(getLoanSuccessAction(res.data.result));
                } else {
                    dispatch(getLoanErrorAction());
                }
            })
            .catch(() => {
                dispatch(getLoanErrorAction());
            });
    }

    // get loans by patron
    const getLoansByPatron = (id: number): LoanType[] => {
        // const endpoint = `api/services/app/Loan/GetByPatron?patronId=${id}`;
        // dispatch(getLoansRequestAction());
        // instance.get(`${endpoint}`)
        //     .then(res => {
        //         console.log("results of getting loans by patron", res.data.result);
        //         if (res.data.success) {
        //             dispatch(getLoansSuccessAction(res.data.result.items));
        //         } else {
        //             dispatch(getLoansErrorAction());
        //         }
        //     })
        //     .catch(() => {
        //         dispatch(getLoansErrorAction());
        //     });
        return state.loans?.filter(loan => loan.patronId === id);
    }
    
    const  getLoansByBook = (id: string): LoanType[] => {
        // const endpoint = `api/services/app/Loan/GetByBook?bookId=${id}`;
        // dispatch(getLoansRequestAction());
        // instance.get(`${endpoint}`)
        //     .then(res => {
        //         console.log("results of getting loans by book", res.data);
        //         if (res.data.success) {
        //             dispatch(getLoansSuccessAction(res.data.result.items));
        //         } else {
        //             dispatch(getLoansErrorAction());
        //         }
        //     })
        //     .catch(() => {
        //         dispatch(getLoansErrorAction());
        //     });
        return state.loans?.filter(loan => loan.bookId === parseInt(id));
    }
    
    const getReturnedLoans = (): void => {
        const endpoint = `api/services/app/Loan/GetReturned`;
        dispatch(getLoansRequestAction());
        instance.get(`${endpoint}`)
            .then(res => {
                console.log("results of getting returned loans", res.data);
                if (res.data.success) {
                    dispatch(getLoansSuccessAction(res.data.result.items));
                } else {
                    dispatch(getLoansErrorAction());
                }
            })
            .catch(() => {
                dispatch(getLoansErrorAction());
            });
    }

    return (
        <LoanContext.Provider value={{ 
            loan: state.loan, 
            loans: state.loans, 
            makeLoan, updateLoan, getLoan, getLoans, getLoansByBook, getLoansByPatron, getReturnedLoans 
        }}>
            {children}
        </LoanContext.Provider>
    );
}