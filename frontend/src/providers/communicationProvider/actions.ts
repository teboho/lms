import { createAction } from "redux-actions";

export const CommunicationActionEnums = {
    SendEmailRequest: "SEND_EMAIL_REQUEST",
    SendEmailSuccess: "SEND_EMAIL_SUCCESS",
    SendEmailError: "SEND_EMAIL_ERROR"
}

/**
 * Sets the isPending to true
 * The results array is not there yet
 */
export const sendEmailRequestAction = createAction(
    CommunicationActionEnums.SendEmailRequest,
    (): any => ({ isSuccess: false, isPending: true, isError: false, email: undefined })
);

/**
 * Sets the isSuccess to true but then all else to false
 */
export const sendEmailSuccessAction = createAction(
    CommunicationActionEnums.SendEmailSuccess,
    (email: any) => ({ isSuccess: true, isPending: false, isError: false, email })
);

/**
 * Sets the isError to true but then all else to false
 */
export const sendEmailErrorAction = createAction(
    CommunicationActionEnums.SendEmailError,
    () => ({ isSuccess: false, isPending: false, isError: true, email: undefined })
);