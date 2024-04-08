"use client";
import { useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";

import withAuth from "@/hocs/withAuth";
import { theme } from 'antd';
import BookContext from "@/providers/bookProvider/context";

const Pay = (): React.ReactNode => {
    const { token } = theme.useToken();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const { getBook } = useContext(BookContext);
        
    useEffect(() => {
        getBook(params.get("bookId"));
    }, []);

    return (
        <>
           <h1>Pay book {params.get("bookId")}</h1>

           
        </>
    );
}

export default withAuth(Pay);