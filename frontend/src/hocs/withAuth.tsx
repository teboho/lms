"use client";
import React, { use, useContext, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Utils from '@/utils';
import AuthContext from '@/providers/authProvider/context';

/**
 * This hoc will protect pages which need the user to be logged in
 * @param {*} WrappedComponent the component to protect
 */
const withAuth = (WrappedComponent: (({children}: {children: React.ReactNode}) => React.ReactNode) | React.FC): React.FC | ((props: {children: React.ReactNode}) => React.ReactNode) => {

    const WithAuth = (props: {children: React.ReactNode}): React.ReactNode => {
        const { authObj } = useContext(AuthContext);
        const router = useRouter();
        let token = useMemo(() => authObj?.accessToken, []);
        token = useMemo(() => authObj?.accessToken, [authObj]);
        
        if (token === undefined || token === null) {
            router.push("/login")
        } 
        // Our inner component needs to return the wrapped component and provide it with its props
        return <WrappedComponent {...props} />;
    } 
    // Our hoc needs to return this inner component
    return WithAuth;
};

export default withAuth;