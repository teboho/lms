"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

/**
 * This hoc will protect pages which need the user to be logged in
 * @param {*} WrappedComponent the component to protect
 */
const withAuth = (WrappedComponent: (({children}: {children: React.ReactNode}) => React.ReactNode) | React.FC): React.FC | ((props: {children: React.ReactNode}) => React.ReactNode) => {

    const WithAuth = (props: {children: React.ReactNode}): React.ReactNode => {
        "use client";
        const router = useRouter();
        const token = localStorage.getItem("accessToken");
        console.log(token, token)

        // check token validity
        if (token) {
            // Ath this rate we should redresh the token from here
            console.log("token", token)
            // router.push(`${children.}`);
        }

        if (token === undefined || token === null) {
            router.push("/Login")
        } 
        // Our inner component needs to return the wrapped component and provide it with its props
        return <WrappedComponent {...props} />;
    } 
    // Our hoc needs to return this inner component
    return WithAuth;
};

export default withAuth;