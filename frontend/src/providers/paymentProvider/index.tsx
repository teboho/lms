"use client"
import { useContext, useEffect, useMemo, useReducer } from "react";
import PaymentContext, { PAYMENT_CONTEXT_INITIAL_STATE, PAYMENT_TYPE } from "./context";
import { paymentReducer } from "./reducer";
import { postPaymentSuccessAction, PaymentActionEnums, postPaymentErrorAction, postPaymentRequestAction, getPaymentRequestAction, getPaymentSuccessAction, getPaymentsErrorAction } from "./actions";
import Utils from "@/utils";
import { makeAxiosInstance } from "../authProvider";
import AuthContext from "../authProvider/context";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function PaymentProvider({ children }: { children: React.ReactNode }) {
    const [paymentState, dispatch] = useReducer(paymentReducer, PAYMENT_CONTEXT_INITIAL_STATE);
    const { authObj } = useContext(AuthContext);

    let accessToken = useMemo(() => authObj?.accessToken, []);
    accessToken = useMemo(() => authObj?.accessToken, [authObj]);
    const instance = makeAxiosInstance(accessToken);

    useEffect(() => {
        console.log("Loan Provider is mounted for the first time.");
        if (accessToken) {
            getPayments();
        }
    }, []);

    function makePayment(payment: PAYMENT_TYPE) {
        const endpoint = `${apiURL}/api/services/app/Payment/Create`;
        dispatch(postPaymentRequestAction());
        instance.post(endpoint, payment)
            .then((response) => {
                if (response.data.success) {
                    dispatch(postPaymentSuccessAction(response.data.result));
                } else {
                    dispatch(postPaymentErrorAction());
                }
            })
            .catch((error) => {
                dispatch(postPaymentErrorAction());
            });
    }

    function getPayments() {
        const endpoint = `${apiURL}/api/services/app/Payment/GetAll`;
        dispatch(getPaymentRequestAction());
        instance.get(endpoint)
            .then((response) => {
                if (response.data.success) {
                    dispatch(getPaymentSuccessAction(response.data.result.items));
                } else {
                    dispatch(getPaymentsErrorAction());
                }
            })
            .catch((error) => {
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