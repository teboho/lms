"use client";
import { useContext, useEffect, useState } from "react";
import withAuth from "@/hocs/withAuth";
import { Col, List, Row, Space, Typography } from "antd";
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
            <Typography.Title level={2} className={cx(styles.center)}>My Loans</Typography.Title >
            <Row gutter={16}>
                {loans?.map((item) => (
                    <Col key={`loan_number_${item.id}`} span={12} style={{padding: 20}}>
                        <Loan item={item} />
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default withAuth(Page);