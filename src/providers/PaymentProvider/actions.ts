"use client";
import { createAction } from "redux-actions";
import { Payment_CONTEXT_STATE_TYPE, Payment_OBJ_TYPE } from "./context";

// experiment
// export enum PaymentActionEnums {
//     SetToken = "SET_TOKEN",
// }

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
    (): Payment_CONTEXT_STATE_TYPE => ({ isSuccess: false, isInProgress: true, isError: false, PaymentObj: undefined})
)

/**
 * Sets the isSuccess to true but then all else to false
 */
export const postPaymentSuccessAction = createAction(
    PaymentActionEnums.PostPaymentSuccess,
    (PaymentObj: Payment_OBJ_TYPE): any => ({ isSuccess: true, isInProgress: false, isError: false, PaymentObj})
);

/**
 * Sets the isError to true but then all else to false
 */
export const postPaymentErrorAction = createAction(
    PaymentActionEnums.PostPaymentSuccess,
    () => ({ isSuccess: false, isInProgress: false, isError: true, PaymentObj: {}})
);
