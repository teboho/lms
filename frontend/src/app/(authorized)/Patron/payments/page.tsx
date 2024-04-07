"use client";
import { ReactNode, useState, useEffect, useMemo, useContext } from "react";
import { useSearchParams } from "next/navigation";

import withAuth from "@/hocs/withAuth";
import { theme } from 'antd';

const Payments = (): React.ReactNode => {
    const { token } = theme.useToken();
    const searchParams = useSearchParams();
        

    return (
        <>
           <h1>Payments</h1>

           
        </>
    );
}

export default withAuth(Payments);