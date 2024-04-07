"use client";
import { createContext } from "react";

// Payment
// {
//     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "loanId": 0,
//     "dateCreated": "2024-04-05T08:01:54.359Z",
//     "amount": 0
//   }

export interface PAYMENT_TYPE {
    id: string;
    loanId: number;
    dateCreated: string;
    amount: number;
}

export const PAYMENT_INIT: PAYMENT_TYPE = {
    id: "",
    loanId: 0,
    dateCreated: "",
    amount: 0
}

export interface PAYMENT_CONTEXT_TYPE {
    payment: PAYMENT_TYPE;
    payments: PAYMENT_TYPE[];
    makePayment: (payment: PAYMENT_TYPE) => void;
    getPayments: () => void;
    getPayment: (paymentId: string) => PAYMENT_TYPE;
}

export const PAYMENT_CONTEXT_DEFAULT = {
    payment: PAYMENT_INIT,
    payments: [] as PAYMENT_TYPE[],
    makePayment: () => {},
    getPayments: () => {},
    getPayment: () => PAYMENT_INIT
}

export const PAYMENT_CONTEXT_INITIAL_STATE = {
    payment: PAYMENT_INIT,
    payments: [] as PAYMENT_TYPE[],
    isSuccess: false,
    isPending: false,
    isError: false
}

/**
 * Default value that the provider will pass is an empty object
 */
const PaymentContext = createContext<PAYMENT_CONTEXT_TYPE>(PAYMENT_CONTEXT_DEFAULT);
export default PaymentContext;