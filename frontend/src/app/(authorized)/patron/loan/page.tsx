"use client";
import { ReactNode, useState, useEffect, useMemo, useContext } from "react";
import { useSearchParams } from "next/navigation";

import withAuth from "@/hocs/withAuth";
import { Button, Card, message, Steps, theme, DatePicker, Row, Col, Space, Typography, Form, Result } from 'antd';
import BookContext from "@/providers/bookProvider/context";
import moment from "moment";
import Image from "next/image";
import InventoryContext from "@/providers/inventoryProvider/context";
import AuthContext from "@/providers/authProvider/context";
import { LoanContext, LoanType } from "@/providers/loanProvider/context";
import { useStyles } from "./styles"; 
import CommunicationContext from "@/providers/communicationProvider/context";

const Loan = (): React.ReactNode => {
    const { token } = theme.useToken();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [] = useState(null);  
    const { getLocalBook } = useContext(BookContext);
    const { inventoryItems } = useContext(InventoryContext);
    const { authObj } = useContext(AuthContext);
    const { makeLoan, clearLoan, loan } = useContext(LoanContext);
    const { sendEmail } = useContext(CommunicationContext);
    const { cx, styles } = useStyles();
    const [book, setBook] = useState(null);

    useEffect(() => {
        clearLoan();
        const bookId = params.get("bookId");

        if (bookId) {
            setBook(getLocalBook(bookId))
        }
    }, []);

    const memoBook = useMemo(() => {
        return book;
    }, [book]);

    const memoInventory = useMemo(() => {
        return inventoryItems?.find((item) => item.bookId === memoBook?.id);
    },  [inventoryItems, memoBook]);

    const onChange = (e: any) => {
        const date = e.toDate();
    }

    const onCheckout = () => {
        if (!dueDate) {
            alert("Choose a due date");
            return;
        }   
        
        let userId = authObj?.userId;
        if (!userId) {
            userId = parseInt(localStorage.getItem("userId"));
        }
        const _loan: LoanType = {
            patronId: userId,
            bookId: memoBook?.id,
            dateDue: dueDate,
            dateCreated: new Date(),
            dateReturned: null,
            isReturned: false

        };
        makeLoan(_loan);
    }

    return (
        <div className={cx(styles.padding)}>
            <h1>Loan book checkout</h1>
    
            <Row gutter={16}>
                <Col span={8}>
                    <Image alt={memoBook?.name} src={memoBook?.imageURL} width={272} height={450}/>
                </Col>
                <Col span={8}>
                    <Row>{memoInventory && `${memoInventory.count} available`}</Row>
                    <Row>
                        <Card
                            hoverable
                        >
                            <Card.Meta title={memoBook?.name} description={memoBook?.description} />
                        </Card>
                    </Row>
                    <Space />
                    <Button type="primary" onClick={onCheckout}>Checkout</Button>
                    <Space />
                    
                    {loan && 
                    (
                        <Result
                            status="success"
                            title="Loan successful"
                            subTitle="The book has been successfully loaned out."
                        />
                    )} 
                </Col>
    
                <Col span={8}>
                    <Form>
                        <Form.Item 
                            label="Due Date"
                            name={"dueDate"}
                        >
                            <DatePicker 
                                title="Select a date to return the book"    
                                open={true}
                                disabledDate={(current) => 
                                    current && (current < moment().endOf('day') || current > moment().add(5, 'days').endOf('day'))
                                }
                                onChange={(date) => setDueDate(date.toDate())}
                            />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
}

export default withAuth(Loan);