"use client"
import { Provider, useEffect, useReducer } from "react";
import PaymentContext, { PAYMENT_CONTEXT_INITIAL_STATE, PAYMENT_REQUEST_TYPE, PAYMENT_TYPE } from "./context";
import { paymentReducer } from "./reducer";
import { postPaymentSuccessAction, PaymentActionEnums, postPaymentErrorAction, postPaymentRequestAction, getPaymentRequestAction, getPaymentSuccessAction, getPaymentsErrorAction } from "./actions";
import Utils from "@/utils";
import { makeAxiosInstance } from "../authProvider";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function PaymentProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [paymentState, dispatch] = useReducer(paymentReducer, PAYMENT_CONTEXT_INITIAL_STATE);

    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        console.log("Loan Provider is mounted");
        if (accessToken) {
            getPayments();
        }
    }, []);

    function makePayment(payment: PAYMENT_TYPE) {
        // post payment data
        const endpoint = `${apiURL}/api/services/app/Payment/Create`;
        dispatch(postPaymentRequestAction());
        instance.post(endpoint, payment)
            .then((response) => {
                if (response.data.success) {
                    // dispatch success action
                    console.log(response.data.result);
                    dispatch(postPaymentSuccessAction(response.data.result));
                } else {
                    // dispatch error action
                    dispatch(postPaymentErrorAction());
                }
            })
            .catch((error) => {
                // dispatch error action
                dispatch(postPaymentErrorAction());
            });
    }

    function getPayments() {
        // get all payments
        const endpoint = `${apiURL}/api/services/app/Payment/GetAll`;
        dispatch(getPaymentRequestAction());
        instance.get(endpoint)
            .then((response) => {
                console.log(response.data.result);
                if (response.data.success) {
                    // dispatch success action
                    dispatch(getPaymentSuccessAction(response.data.result.items));
                } else {
                    // dispatch error action
                    dispatch(getPaymentsErrorAction());
                }
            })
            .catch((error) => {
                // dispatch error action
                dispatch(getPaymentsErrorAction());
            });
    }

    function getPayment(paymentId: string) {
        return paymentState.payments.find((payment) => payment.id === paymentId);
    }

    return (
        <PaymentContext.Provider value={{
            getPayments,
            makePayment,
            payment: paymentState.payment,
            payments: paymentState.payments,
            getPayment
        }}>
            {children}
        </PaymentContext.Provider>
    );
}