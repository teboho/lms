"use client"
import { useContext, useEffect, useMemo, useReducer, useState } from "react";
import { LoanContext, LoanType, LoanContextStateInit } from "./context";
import { clearLoanAction, getLoanErrorAction, getLoanRequestAction, getLoansErrorAction, getLoansRequestAction, getLoansSuccessAction, getLoanSuccessAction, postLoanErrorAction, postLoanRequestAction, postLoanSuccessAction, putLoanErrorAction, putLoanRequestAction, putLoanSuccessAction } from "./actions";
import { loanReducer } from "./reducer";
import { makeAxiosInstance } from "../authProvider";
import Utils from "@/utils";
import { message } from "antd";
import { jwtDecode } from "jwt-decode";
import CommunicationContext, { EmailType } from "../communicationProvider/context";
import AuthContext from "../authProvider/context";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function LoanProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(loanReducer, LoanContextStateInit);
    const [messageApi, contextHolder] = message.useMessage();
    const [emailAdd, setEmailAdd] = useState(null);
    const { sendEmail } = useContext(CommunicationContext);
    const { authObj } = useContext(AuthContext);
    
    let accessToken = useMemo(() => {
        return authObj?.accessToken;
    }, [authObj]);
    let instance = useMemo(() => makeAxiosInstance(accessToken), [accessToken]);

    useEffect(() => {
        console.log("Loan Provider is mounted for the first time.");
        if (accessToken) {
            getLoans();
            const decoded = jwtDecode(accessToken);
            setEmailAdd(decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"]);
        }
    }, []);
    
    /**
     * 
     * @param loanObj the loan object to create
     */
    const makeLoan = (loanObj: LoanType): void => {
        const endpoint = "api/services/app/Loan/Create";
        dispatch(postLoanRequestAction());
        instance.post(`${apiURL}/${endpoint}`, loanObj)
            .then(res => {
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

    /**
     * 
     * @param loanObj the loan object to update
     */
    const updateLoan = (loanObj: LoanType): void => {
        const endpoint = "api/services/app/Loan/Update";
        dispatch(postLoanRequestAction());
        instance.put(`${apiURL}/${endpoint}`, loanObj)
            .then(res => {
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

    /**
     * Get all the loans
     */
    const getLoans = (): void => {
        const endpoint = "api/services/app/Loan/GetAll";
        dispatch(getLoansRequestAction());
        instance.get(`${apiURL}/${endpoint}`)
            .then(res => {
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

    /**
     * 
     * @param loanId the loan id to get
     */
    const getLoan = (loanId: string): void => {
        const endpoint = `api/services/app/Loan/Get?Id=${loanId}`;
        dispatch(getLoanRequestAction());
        instance.get(`${apiURL}/${endpoint}`)
            .then(res => {
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

    /**
     * 
     * @param id the patron id to get loans for
     * @returns the loans for the patron
     */
    const getLoansByPatron = (id: number): LoanType[] => {
        return state.loans?.filter(loan => loan.patronId === id);
    }
    
    /**
     * 
     * @param id the book id to get loans for
     * @returns the loans for the book
     */
    const  getLoansByBook = (id: string): LoanType[] => {
        return state.loans?.filter(loan => loan.bookId === id);
    }
    
    /**
     * Get all the returned loans and update the state
     */
    const getReturnedLoans = (): void => {
        const endpoint = `api/services/app/Loan/GetReturned`;
        dispatch(getLoansRequestAction());
        instance.get(`${endpoint}`)
            .then(res => {
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

    /**
     * 
     * @param loan the loan to update
     */
    function putLoan(loan: LoanType) {
        const endpoint = `api/services/app/Loan/Update`;
        dispatch(putLoanRequestAction());
        instance.put(`${endpoint}`, loan)
            .then(res => {
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

    /**
     * 
     * @param id the id of the loan to return
     */
    function getReturnLoan(id: string): void {
        const endpoint = `api/services/app/Loan/ReturnLoan`;
        dispatch(putLoanRequestAction()); 
        instance.get(`${endpoint}?Id=${id}`)
            .then(res => {
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

    /**
     * Clear the loan state
     */
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