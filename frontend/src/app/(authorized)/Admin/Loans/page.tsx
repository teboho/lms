"use client";
import { ReactNode, useState, useEffect, useMemo, useContext } from "react";
import { useSearchParams } from "next/navigation";

import withAuth from "@/hocs/withAuth";
import { Button, Calendar, Card, theme, Typography, } from 'antd';
import BookContext, { BookDataType } from "@/providers/BookProvider/context";
import moment from "moment";
import Image from "next/image";
import InventoryContext from "@/providers/InventoryProvider/context";
import AuthContext from "@/providers/AuthProvider/context";
import { LoanContext } from "@/providers/LoanProvider/context";
import { useStyles } from "./styles";
const { Title, Paragraph } = Typography;

import { type Dayjs } from "dayjs";
import Utils from "@/utils";

const Loans = (): React.ReactNode => {
    const { token } = theme.useToken();
    const { loan, getLoans, loans, getLoan } = useContext(LoanContext);
    const { books } = useContext(BookContext);
    const [patron, setPatron] = useState(null);

    const { styles, cx } = useStyles();

    useEffect(() => {
        console.log("Loan useEffect", loans);
        if (loans?.length === 0 || !loans) {
            getLoans();
        }
    }, [loans]);

    const memoLoans = useMemo(() => loans, [loans]);

    const getBookById = (bookId: string) => {
        return books?.find((book) => book.id === bookId);
    }

    function getDateTuple(date: string) {
        const dateObj = new Date(date);
        return [dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()];
    }

    const dateCellRender = (value: Dayjs) => {
        const data = { type: 'error', content: 'This is error event 4.' };

        // search for the loan that matches the date
        const loan = memoLoans?.find((loan) => {
            const dueDate = getDateTuple(loan.dateDue);
            return value.year() === dueDate[0] && value.month() === dueDate[1] && value.date() === dueDate[2];
        });

        const book = loan ? getBookById(loan?.bookId) : null;

        // let user;
        // if (book !== null && book) {
        //     Utils.getPatronUserInfo(loan?.patronId)
        //         .then((res) => {
        //             console.log("patron", res.data.result);
        //             setPatron(res);
        //         })
        //         .catch((err) => console.error(err))
        // }
   

        return (
            loan && 
            <ul className="events">
                <li key={`loan_for_${loan?.bookId}`}>
                    <div className="events-content">
                        <p>{book?.name}, {loan.dateCreated}</p>
                    </div>
                </li>
            </ul>
        );
    }

    const cellRender = (current, info) => {
        // console.log("cellRender", current, info);
        if (!current || !info) {
            return (
                <div>
                    <p>Cell Render</p>
                </div>
            );
        } else {
            return dateCellRender(current);
        }
    }

    return (
        <>
            <div>
                <Title level={3}>Loans</Title>
                <Paragraph>
                    This is the loans page {loans?.length}
                </Paragraph>
                {/* <div>
                    {memoLoans?.map((loan) => {
                        const book = getBookById(loan?.bookId);
                        return (
                            <Card key={loan.id} title={book?.name} extra={<a href={""}>More</a>} style={{ width: 300 }}>
                                <p>{loan.dateDue}</p>
                                <p>{loan.dateReturned}</p>
                            </Card>
                        );
                    })}
                </div> */}
                {/* Antd calendar viewer */}
                <Calendar className={cx(styles.padding)} cellRender={cellRender} />
            </div>
        </>
    );
}

export default withAuth(Loans);