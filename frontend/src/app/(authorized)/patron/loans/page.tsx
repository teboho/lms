"use client";
import { useContext, useEffect, useState } from "react";
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
    const { getLoansByPatron, loans: providerLoans, getLoans } = useContext(LoanContext);

    const [loans, setLoans] = useState<LoanType[]>([]);

    useEffect(() => {
        const accessToken = Utils.getAccessToken();
        if (accessToken && (!loans || loans.length === 0)) {
            getLoans();
        }   
    }, [])

    useEffect(() => {
        const patronId = Utils.getPatronId();
        console.log("Patron ID", patronId);
        setLoans(getLoansByPatron(patronId));   
    }, [providerLoans]);

    return (
        <div className={cx(styles.padding)}>   
            <h1>My Loans</h1>
            <List
                dataSource={loans}
                renderItem={(item) => (
                    <List.Item>
                        <Loan item={item} />
                    </List.Item>
                )}
            />
        </div>
    );
}

export default withAuth(Page);