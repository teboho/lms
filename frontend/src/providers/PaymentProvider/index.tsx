"use client"
import { Provider, useReducer } from "react";
import PaymentContext, { PAYMENT_CONTEXT_INITIAL_STATE, PAYMENT_REQUEST_TYPE, PAYMENT_TYPE } from "./context";
import { paymentReducer } from "./reducer";
import { postPaymentSuccessAction, PaymentActionEnums, postPaymentErrorAction, postPaymentRequestAction } from "./actions";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function PaymentProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [paymentState, dispatch] = useReducer(paymentReducer, PAYMENT_CONTEXT_INITIAL_STATE);

   

    return (
        <PaymentContext.Provider value={{}}>
            {children}
        </PaymentContext.Provider>
    );
}