"use client";
import { ReactNode, useState, useEffect, useMemo, useContext } from "react";
import { useSearchParams } from "next/navigation";

import withAuth from "@/hocs/withAuth";
import { theme } from 'antd';
import AuthContext from "@/providers/authProvider/context";

const Payments = (): React.ReactNode => {
    const { token } = theme.useToken();
    const searchParams = useSearchParams();
    const { getPatronInfo } = useContext(AuthContext);
    const [user, setUser] = useState(null);

    const patronId = searchParams.get('patronId');
    useEffect(() => {
        getPatronInfo(parseInt(patronId))
            .then((response) => {
                console.log("Patron......", response);
                setUser(response);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <>
           <h1>Patron information</h1>
            {patronId && <h2>Patron ID: {patronId}</h2>}
            {/* fill the width of the page with patron details */}
            <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
                     <div style={{ width: "50%" }}>
                          <h3>Name: {user?.name}</h3>
                          <h3>Surname: {user?.surname}</h3>
                          <h3>Email: {user?.emailAddress}</h3>
                     </div>
                     <div style={{ width: "50%" }}>
                          <h3>Role: {user?.roleNames?.join(", ")}</h3>
                     </div>
                </div>
            </div>
        </>
    );
}

export default withAuth(Payments);