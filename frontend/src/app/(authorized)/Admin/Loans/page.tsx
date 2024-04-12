"use client";
import { useEffect, useMemo, useContext, useState } from "react";
import withAuth from "@/hocs/withAuth";
import { Button, Calendar, Popover, Table, Tag, theme, Typography, Segmented, Tabs, Checkbox } from 'antd';
import BookContext from "@/providers/bookProvider/context";
import { LoanContext } from "@/providers/loanProvider/context";
import { useStyles } from "./styles";
import { useSearchParams } from "next/navigation";  
import { type Dayjs } from "dayjs";
import ViewPatron from "@/components/viewPatron";

const { Title, Paragraph } = Typography;

const Page = (): React.ReactNode => {
    const { token } = theme.useToken();
    const { getLoans, loan, loans, getLoan, putLoan } = useContext(LoanContext);
    const { books, searchTerm, getAll } = useContext(BookContext);
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const [current, setCurrent] = useState([]);
    const [memoLoans, setMemoLoans] = useState([]);

    const { styles, cx } = useStyles();
{}
    useEffect(() => {
        getAll();
        if (loans?.length === 0 || !loans) {
            getLoans();
        }
        setMemoLoans(loans)
    }, [loans]);

    let _memoLoans = useMemo(() => {
        const bookId = params.get("bookId");
        let result = loans;
        if (bookId) {
            result = loans?.filter((loan) => loan.bookId === bookId);
        }
        return result;
    }, [loans]);

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

        const content = <ViewPatron id={loan?.patronId} />;
        const dateContent = (
            <div>
                {book?.name}
                <br />
                <Popover content={content} title="Patron details"><Tag>View patron</Tag></Popover>
            </div>
        );

        return (
            loan && 
            <ul className="events">
                <li key={`loan_for_${loan?.bookId}`}>
                    <div className="events-content">
                        <Popover content={dateContent} title="Book Details">
                            <Tag  style={{ width: "90%", textWrap: "wrap"}} color={loan?.isReturned ? "blue" : "red"}>{book?.name}</Tag>
                        </Popover>
                    </div>
                </li>
            </ul>
        );
    }

    const cellRender = (current: any, info: any) => {
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
            key: 'patron'
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
        },
        {
            title: 'Confirmed',
            dataIndex: 'confirm',
            key: 'confirm',
        }
    ];

    const confirmLoan = (id: string) => {
        const _loan = loans.find(l => l.id === id);
        _loan.confirmed = true;
        putLoan(_loan);
    }

    
    function formatDate(_date: string) {
        let date = new Date(_date);
        let formattedDate = `${date.toLocaleDateString()}`;

        return formattedDate;
    }

    const data = memoLoans?.map((loan) => {
        const book = getBookById(loan?.bookId);
        const content = <ViewPatron id={loan.patronId} />;
        return {
            key: loan.id,
            id: loan.id,
            book: book?.name,
            patron: (<Popover content={content} title="Patron details"><Button>{loan?.patronId}</Button></Popover>),
            dateCreated: formatDate(loan.dateCreated),
            dateDue: formatDate(loan.dateDue),
            dateReturned: formatDate(loan.dateReturned),
            status: loan?.isReturned ? (<Tag color="blue">{"Returned"}</Tag>) : (<Tag color="red">{"Not Returned"}</Tag>),
            isOverdue: loan?.isOverdue ? "Overdue" : "Not Overdue",
            confirm: loan?.confirmed ? 
                (<>
                    <Tag color="green">Yes</Tag>
                </>) 
                : 
                (<>
                    <Tag color="orange">No</Tag>
                    <Checkbox onChange={e => {
                        if (e.target.checked) {
                            confirmLoan(loan?.id);
                        }
                    }}>
                        Tick to confirm
                    </Checkbox>
                </>)
        }
    });

    const options = [
        "All",
        "Yet to Confirm",
        "Confirmed"
    ];

    const onSegmentOptionChange = (value: any) => {
        let result = loans;
        switch (value) {
            case options[1]:
                
                result = loans?.filter((loan) => !loan.confirmed);
                setMemoLoans(result);
                break;
            case options[2]:
                result = loans;
                result = loans?.filter((loan) => loan.confirmed);
                setMemoLoans(result);
                break;
            case options[0]:
                result = loans;
                setMemoLoans(loans);
            default:
                break;
        }
    }

    return (
        <div>
            <Title level={2}>Loans ({loans?.length} in total)</Title>
            <Segmented<string>
                options={options}
                onChange={onSegmentOptionChange}
            />
            <Table columns={columns} dataSource={data} />
            <Title level={2}>Calendar</Title>
            <Paragraph>Expected book returns</Paragraph>
            <Calendar className={cx(styles.padding)} cellRender={cellRender} />
        </div>
    );
}

export default withAuth(Page);