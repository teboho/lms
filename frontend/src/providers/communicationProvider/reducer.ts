"use client";
import { handleActions } from "redux-actions";
import { CommunicationActionEnums } from "./actions";

import { CommunicationContextStateInit, CommunicationContextStateType } from "./context";

/**
 * A reducer to handle the communication
 */
export const communicationReducer = handleActions(
    {
        // this handler will change the value of the isPending in the state
        [CommunicationActionEnums.SendEmailRequest]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        // this handler will change the value of the isSuccess in the state
        [CommunicationActionEnums.SendEmailSuccess]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        // this handler will change the value of the isError in the state
        [CommunicationActionEnums.SendEmailError]: (state, action) => ({
            ...state,
            ...action.payload
        }),
    },
    CommunicationContextStateInit
);