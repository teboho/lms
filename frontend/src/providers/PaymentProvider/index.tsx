"use client"
import { Provider, useReducer } from "react";
import PaymentContext, { PAYMENT_CONTEXT_INITIAL_STATE, PAYMENT_REQUEST_TYPE, PAYMENT_OBJ_TYPE } from "./context";
import { paymentReducer } from "./reducer";
import { postPaymentSuccessAction, PaymentActionEnums, postPaymentErrorAction, postPaymentRequestAction } from "./actions";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function PaymentProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [paymentState, dispatch] = useReducer(paymentReducer, PAYMENT_CONTEXT_INITIAL_STATE);

    /**
     * 
     * @param loginObj login object
     */
    function login(loginObj: PAYMENT_REQUEST_TYPE): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = apiURL + "api/TokenPayment/Paymententicate";
        console.log(endpoint);
        console.log(loginObj);
        
        fetch(endpoint, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(loginObj),
            mode: "cors"
        }).then(res => res.json())
        .then(data => {
            console.log(data.result);
            if (data.result.success) {
                const res: PAYMENT_OBJ_TYPE = data.result;
                dispatch(postPaymentSuccessAction(res));
                
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(postPaymentErrorAction());
        })
    }
    function logout(): void {

    }
    function refreshToken() {

    }

    return (
        <PaymentContext.Provider value={{paymentObj: paymentState.paymentObj, login, logout, refreshToken}}>
            {children}
        </PaymentContext.Provider>
    );
}