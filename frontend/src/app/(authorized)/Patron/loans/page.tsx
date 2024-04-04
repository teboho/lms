"use client";
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import withAuth from "@/hocs/withAuth";
import { List } from "antd";
import BookContext from "@/providers/bookProvider/context";
import {useStyles} from "./styles";
import { LoanContext, LoanType } from "@/providers/loanProvider/context";
import Utils from "@/utils";
import Loan from "@/components/loan";

const Page = (): React.ReactNode => {
    const { styles, cx } = useStyles();
    const { books } = useContext(BookContext);
    const { getLoansByPatron, loans: providerLoans } = useContext(LoanContext);

    const [loans, setLoans] = useState<LoanType[]>([]);

    useEffect(() => {
        const patronId = Utils.getPatronId();
        console.log("Patron ID", patronId);
        setLoans(getLoansByPatron(patronId));   
    }, [providerLoans]);

    return (
        <>   
            <h1>My Loans</h1>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 5,
                    xxl: 6,
                }}
                dataSource={loans}
                renderItem={(item) => (
                    <List.Item>
                        <Loan item={item} />
                    </List.Item>
                )}
            />
        </>
    );
}

export default withAuth(Page);