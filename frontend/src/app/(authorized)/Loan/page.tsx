"use client";
import { ReactNode, useState, useEffect, useMemo, useContext } from "react";
import { useSearchParams } from "next/navigation";

import withAuth from "@/hocs/withAuth";
import { Button, List, message, Steps, theme } from 'antd';
import { BookContext } from "@/providers/BookProvider/context";

const Loan = (): React.FC | React.ReactNode => {
    const { token } = theme.useToken();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const { getBook } = useContext(BookContext);
        
    useEffect(() => {
        getBook(params.get("bookId"));
    }, []);

    return (
        <>
           <h1>Loan book {params.get("bookId")}</h1>

           
        </>
    );
}

export default withAuth(Loan);