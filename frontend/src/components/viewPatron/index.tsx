'use client';
import AuthContext, { UserType } from "@/providers/authProvider/context";
import { useContext, useEffect, useState } from "react";

const ViewPatron: React.FC<{id: number}> = ({ id }) => {
    const { getPatronInfo } = useContext(AuthContext);
    const [user, setUser] = useState<UserType>(null);

    useEffect(() => {
        getPatronInfo(id)
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
            {id && <h2>Patron ID: {id}</h2>}
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

export default ViewPatron;