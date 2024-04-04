"use client";
import { useEffect, useMemo, useContext } from "react";
import withAuth from "@/hocs/withAuth";
import { Calendar, Table, theme, Typography, } from 'antd';
import BookContext from "@/providers/bookProvider/context";
import { LoanContext } from "@/providers/loanProvider/context";
import { useStyles } from "./styles";
const { Title, Paragraph } = Typography;

import { type Dayjs } from "dayjs";
import Utils from "@/utils";

const Page = (): React.ReactNode => {
    const { token } = theme.useToken();
    const { getLoans, loans, getLoan } = useContext(LoanContext);
    const { books } = useContext(BookContext);

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

    const columns = [
        {
            title: 'Book',
            dataIndex: 'book',
            key: 'book',
            render: (text, record) => {
                return (
                    <a onClick={() => getLoan(record.id)}>{text}</a>
                );
            }
        },
        {
            title: 'Patron',
            dataIndex: 'patron',
            key: 'patron',
        },
        {
            title: 'Date Created',
            dataIndex: 'dateCreated',
            key: 'dateCreated',
        },
        {
            title: 'Date Due',
            dataIndex: 'dateDue',
            key: 'dateDue',
        },
        {
            title: 'Date Returned',
            dataIndex: 'dateReturned',
            key: 'dateReturned',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        }
    ];

    const data = memoLoans?.map((loan) => {
        const book = getBookById(loan?.bookId);
        // const patron = Utils.getPatronUserInfo(loan?.patronId);
        return {
            key: loan.id,
            id: loan.id,
            book: book?.name,
            patron: loan.patronId,
            dateCreated: loan.dateCreated,
            dateDue: loan.dateDue,
            dateReturned: loan.dateReturned,
            status: loan?.isReturned ? "Returned" : "Not Returned",
            isOverdue: loan?.isOverdue ? "Overdue" : "Not Overdue"
        }
    });

    return (
        <>
            <div>
                <Title level={3}>Loans</Title>
                <Paragraph>
                    This is the loans page {loans?.length}
                </Paragraph>
                
                <Table columns={columns} dataSource={data} />
                <Typography.Title level={3}>Calendar</Typography.Title>
                <Calendar className={cx(styles.padding)} cellRender={cellRender} />
            </div>
        </>
    );
}

export default withAuth(Page);