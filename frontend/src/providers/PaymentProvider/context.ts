"use client";
import { createContext } from "react";

export interface PAYMENT_OBJ_TYPE {
    "accessToken": string;
    "encryptedAccessToken": string;
    "expireInSeconds": number;
    "userId": number;
  }

export interface PAYMENT_CONTEXT_STATE_TYPE {
    isInProgress: boolean;
    isSuccess: boolean;
    isError: boolean;
    paymentObj?: PAYMENT_OBJ_TYPE;
}

export interface PAYMENT_REQUEST_TYPE {
    "userNameOrEmailAddress": string;
    "password": string;
    "rememberClient": boolean;
}

export const PAYMENT_CONTEXT_INITIAL_STATE = {
    isInProgress: false,
    isError: false,
    isSuccess: false,
    paymentObj: {
        "accessToken": "string",
        "encryptedAccessToken": "string",
        "expireInSeconds": 0,
        "userId": 0
      }
}

/**
 * Default value that the provider will pass is an empty object
 */
const PaymentContext = createContext({ });
export default PaymentContext;