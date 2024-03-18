"use client"
import withAuth from "@/hocs/withAuth";
import { ReactNode } from "react";

const Home = ({ children }: { children: ReactNode }): ReactNode => {
    return <h1>Succesfully logged in</h1>
}

export default withAuth(Home);