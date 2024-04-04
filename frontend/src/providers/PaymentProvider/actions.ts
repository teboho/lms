"use client";
import { createAction } from "redux-actions";
import { PAYMENT_CONTEXT_STATE_TYPE, PAYMENT_TYPE } from "./context";

export const PaymentActionEnums = {
    PostPaymentRequest: "POST_Payment_REQUEST",
    PostPaymentSuccess: "POST_Payment_SUCCESS",
    PostPaymentError: "POST_Payment_ERROR"
}

/**
 * Sets the isInProgress to true
 * The results array is not there yet
 */
export const postPaymentRequestAction = createAction(
    PaymentActionEnums.PostPaymentRequest,
    (): PAYMENT_CONTEXT_STATE_TYPE => ({ isSuccess: false, isInProgress: true, isError: false, payment: undefined, payments: undefined })
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postPaymentSuccessAction = createAction(
    PaymentActionEnums.PostPaymentSuccess,
    (payment: PAYMENT_TYPE): any => ({ isSuccess: true, isInProgress: false, isError: false, payment, payments: undefined })
);

/**
 * Sets the isError to true but then all else to false
 */
export const postPaymentErrorAction = createAction(
    PaymentActionEnums.PostPaymentSuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, payment: undefined, payments: undefined })
);
