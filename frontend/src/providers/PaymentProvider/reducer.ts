import { handleActions } from "redux-actions";
import { PaymentActionEnums } from "./actions";
import { PAYMENT_CONTEXT_INITIAL_STATE } from "./context";

/**
 * A reducer t
 */
export const paymentReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [PaymentActionEnums.PostPaymentRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),  // this handler will change the value of the isSuccess in the state
        [PaymentActionEnums.PostPaymentSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }), // this handler will change the value of the isError in the state
        [PaymentActionEnums.PostPaymentError]: (state, action) => ({
            ...state,
            ...action.payload
        }),

        [PaymentActionEnums.GetPaymentRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PaymentActionEnums.GetPaymentSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PaymentActionEnums.GetPaymentError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        
        [PaymentActionEnums.GetPaymentsRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PaymentActionEnums.GetPaymentsSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [PaymentActionEnums.GetPaymentsError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
    },
    PAYMENT_CONTEXT_INITIAL_STATE
)