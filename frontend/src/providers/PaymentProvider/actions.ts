"use client";
import { createAction } from "redux-actions";
import { PAYMENT_CONTEXT_TYPE, PAYMENT_TYPE } from "./context";

export const PaymentActionEnums = {
    PostPaymentRequest: "POST_Payment_REQUEST",
    PostPaymentSuccess: "POST_Payment_SUCCESS",
    PostPaymentError: "POST_Payment_ERROR",

    GetPaymentRequest: "GET_Payment_REQUEST",
    GetPaymentSuccess: "GET_Payment_SUCCESS",
    GetPaymentError: "GET_Payment_ERROR",

    GetPaymentsRequest: "GET_Payments_REQUEST",
    GetPaymentsSuccess: "GET_Payments_SUCCESS",
    GetPaymentsError: "GET_Payments_ERROR",
}

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const postPaymentRequestAction = createAction(
    PaymentActionEnums.PostPaymentRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, payment: undefined, payments: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postPaymentSuccessAction = createAction(
    PaymentActionEnums.PostPaymentSuccess,
    (payment: PAYMENT_TYPE) => ({ isSuccess: true, isPending: false, isError: false, payment, payments: undefined as PAYMENT_TYPE[]})
);

/**
 * Sets the isError to true but then all else to false
 */
export const postPaymentErrorAction = createAction(
    PaymentActionEnums.PostPaymentError,
    () => ({ isSuccess: false, isPending: false, isError: true, payment: undefined, payments: undefined })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getPaymentRequestAction = createAction(
    PaymentActionEnums.GetPaymentRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, payment: undefined, payments: undefined })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getPaymentSuccessAction = createAction(
    PaymentActionEnums.GetPaymentSuccess,
    (payment: PAYMENT_TYPE) => ({ isSuccess: true, isPending: false, isError: false, payment, payments: undefined })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getPaymentErrorAction = createAction(
    PaymentActionEnums.GetPaymentError,
    () => ({ isSuccess: false, isPending: false, isError: true, payment: undefined, payments: undefined })
);

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const getPaymentsRequestAction = createAction(
    PaymentActionEnums.GetPaymentsRequest,
    () => ({ isSuccess: false, isPending: true, isError: false, payment: undefined, payments: undefined })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const getPaymentsSuccessAction = createAction(
    PaymentActionEnums.GetPaymentsSuccess,
    (payments: PAYMENT_TYPE[]) => ({ isSuccess: true, isPending: false, isError: false, payment: undefined as PAYMENT_TYPE, payments })
);

/**
 * Sets the isError to true but then all else to false
 */
export const getPaymentsErrorAction = createAction(
    PaymentActionEnums.GetPaymentsError,
    () => ({ isSuccess: false, isPending: false, isError: true, payment: undefined, payments: undefined })
);