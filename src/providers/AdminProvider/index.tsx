"use client"
import { Provider, useReducer } from "react";
import { Admin_CONTEXT_INITIAL_STATE, Admin_REQUEST_TYPE, AdminContext, Admin_OBJ_TYPE } from "./context";
import { AdminReducer } from "./reducer";
import { postAdminErrorAction, postAdminRequestAction, postAdminSuccessAction } from "./actions";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminProvider({ children }: { children: React.ReactNode }) {
    // we will make the state with the reducers
    const [AdminState, dispatch] = useReducer(AdminReducer, Admin_CONTEXT_INITIAL_STATE);

    /**
     * 
     * @param loginObj login object
     */
    function login(loginObj: Admin_REQUEST_TYPE): void {
        // conduct the fetch and dispatch based on the response
        const endpoint = apiURL + "api/TokenAdmin/Adminenticate";
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
                const res: Admin_OBJ_TYPE = data.result;
                dispatch(postAdminSuccessAction(res));
                
            }
        })
        .catch(err => {
            console.log(err);
            dispatch(postAdminErrorAction());
        })
    }
    function logout(): void {

    }
    function refreshToken() {

    }

    return (
        <AdminContext.Provider value={{AdminObj: AdminState.AdminObj, login, logout, refreshToken}}>
            {children}
        </AdminContext.Provider>
    );
}