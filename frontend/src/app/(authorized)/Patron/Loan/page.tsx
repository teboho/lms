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
import { LoanContext } from "@/providers/loanProvider/context";

const { Title, Paragraph } = Typography;

const Loan = (): React.ReactNode => {
    const { token } = theme.useToken();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const [dueDate, setDueDate] = useState<Date | null>(null);
    const [] = useState(null);  
    const { books, getBook, book } = useContext(BookContext);
    const { inventoryItems } = useContext(InventoryContext);
    const { authObj } = useContext(AuthContext);
    const { loans, loan, makeLoan, updateLoan } = useContext(LoanContext);
        
    useEffect(() => {
        console.log("Loan useEffect");

        const bookId = params.get("bookId");

        if (bookId) {
            getBook(bookId);
        }
    }
    , []);

    const memoBook = useMemo(() => {
        console.log("memoBook", book);
        return book;
    }
    , [book]);

    const memoInventory = useMemo(() => {
        return inventoryItems?.find((item) => item.bookId === memoBook?.id);
    },  [inventoryItems, memoBook]);

    const onChange = (e: any) => {
        const date = e.toDate();
    }

    const onCheckout = () => {
        let userId = authObj?.userId;
        if (!userId) {
            userId = parseInt(localStorage.getItem("userId"));
        }
        const _loan = {
            patronId: userId,
            bookId: memoBook?.id,
            dateDue: dueDate
        };
        console.log(_loan);
        // post the loan
        makeLoan(_loan);
    }

    return (
        <>
            <h1>Loan book checkout {params.get("bookId")}</h1>
    
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
                    
                    {/* {loanState.isSuccess  && 
                    (
                        <Result
                            status="success"
                            title="Loan successful"
                            subTitle="The book has been successfully loaned out."
                        />
                    )} */}
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
        </>
    );
}

export default withAuth(Loan);