"use client"
import { useContext, useEffect, useReducer, useState } from "react";
import { LoanContext, LoanType, LOAN_CONTEXT_INITIAL_STATE } from "./context";
import { clearLoanAction, getLoanErrorAction, getLoanRequestAction, getLoansErrorAction, getLoansRequestAction, getLoansSuccessAction, getLoanSuccessAction, postLoanErrorAction, postLoanRequestAction, postLoanSuccessAction, putLoanErrorAction, putLoanRequestAction, putLoanSuccessAction } from "./actions";
import { loanReducer } from "./reducer";
import { makeAxiosInstance } from "../authProvider";
import Utils from "@/utils";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
import CommunicationContext, { EmailType } from "../communicationProvider/context";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function LoanProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [state, dispatch] = useReducer(loanReducer, LOAN_CONTEXT_INITIAL_STATE);
    const [messageApi, contextHolder] = message.useMessage();
    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);
    const [emailAdd, setEmailAdd] = useState(null);
    const { sendEmail } = useContext(CommunicationContext);

    useEffect(() => {
        console.log("Loan Provider is mounted");
        if (accessToken) {
            getLoans();
            const decoded = jwtDecode(accessToken);
            console.log("email----------------", decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
            setEmailAdd(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
        }
    }, []);
    
    const makeLoan = (loanObj: LoanType): void => {
        const endpoint = "api/services/app/Loan/Create";
        dispatch(postLoanRequestAction());
        instance.post(`${apiURL}/${endpoint}`, loanObj)
            .then(res => {
                console.log("loan create result", res.data);
                if (res.data.success) {
                    dispatch(postLoanSuccessAction(res.data.result));
                    const email: EmailType = {
                        subject: "Book Loan",
                        message: `You have successfully borrowed the book ${loanObj.bookId}, which is due on ${loanObj.dateDue}. Please return the book on time.`,
                        toEmail: emailAdd
                    }
                    sendEmail(email);
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

    const getLoansByPatron = (id: number): LoanType[] => {
        return state.loans?.filter(loan => loan.patronId === id);
    }
    
    const  getLoansByBook = (id: string): LoanType[] => {
        return state.loans?.filter(loan => loan.bookId === id);
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

    function putLoan(loan: LoanType) {
        const endpoint = `api/services/app/Loan/Update`;
        dispatch(putLoanRequestAction());
        instance.put(`${endpoint}`, loan)
            .then(res => {
                console.log("results of updating loan", res.data);
                if (res.data.success) {
                    dispatch(putLoanSuccessAction(res.data.result));
                    messageApi.success("Book loan confirmed");
                    
                } else {
                    dispatch(putLoanErrorAction());
                    messageApi.error("Book loan confirmation unsuccessful")
                }
            })
            .catch(() => {
                dispatch(putLoanErrorAction());
                messageApi.error("Book loan confirmation unsuccessful");
            });
    }

    function getReturnLoan(id: string): void {
        const endpoint = `api/services/app/Loan/ReturnLoan`;
        dispatch(putLoanRequestAction()); // using this because we are updating the loan
        instance.get(`${endpoint}?Id=${id}`)
            .then(res => {
                console.log("results of returning loan", res.data);
                if (res.data.success) {
                    dispatch(putLoanSuccessAction(res.data.result));
                    messageApi.success("Book loan returned");
                } else {
                    dispatch(putLoanErrorAction());
                    messageApi.error("Book loan return unsuccessful")
                }
            })
            .catch(() => {
                dispatch(putLoanErrorAction());
                messageApi.error("Book loan return unsuccessful");
            });
    }

    function clearLoan() {
        dispatch(clearLoanAction())
    }

    return (
        <LoanContext.Provider value={{ 
            loan: state.loan, 
            loans: state.loans,
            clearLoan, 
            makeLoan, updateLoan, getLoan, getLoans, getLoansByBook, getLoansByPatron, getReturnedLoans, putLoan, getReturnLoan
        }}>
            {contextHolder}
            {children}
        </LoanContext.Provider>
    );
}