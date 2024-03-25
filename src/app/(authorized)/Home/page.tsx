"use client"
import withAuth from "@/hocs/withAuth";
import { SessionContext } from "@/providers/SessionProvider/context";
import { ReactNode, useContext, useEffect, useMemo } from "react";

const Home = ({ children }: { children: ReactNode }): ReactNode => {
    const { getInfo, sessionState } = useContext(SessionContext);
    // Get whose currently loggedin

    useEffect(() => {
        getInfo();
    }, []);

    const user = useMemo(() => {
        return sessionState.user;
    }, [sessionState]);

    return (
        <>
            <h1>Succesfully logged in as {JSON.stringify(user)}</h1>
            <p>{user?.name}</p>
            <p>{user?.surname}</p>
            <p>{user?.id}</p>
            <p>{user?.emailAddress}</p>
        </>
    );
}

export default withAuth(Home);