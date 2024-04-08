"use client";
import { ReactNode, useState, useEffect, useMemo, useContext } from "react";
import { useSearchParams } from "next/navigation";

import withAuth from "@/hocs/withAuth";
import { Card, Typography, Image, Button , List, message, Steps, theme } from 'antd';
import BookContext, { BookDataType } from "@/providers/bookProvider/context";

import Link from "next/link";

interface BookProps {
    book: BookDataType;
}

const { Title, Paragraph } = Typography;

const Read = (): React.ReactNode => {
    const { token } = theme.useToken();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

    const { book, getBook } = useContext(BookContext);
        
    useEffect(() => {
        getBook(params.get("bookId"));
    }, []);

    useEffect(() => {
        console.log("State change", book)
    }, [book]);


    return (
        <Card
            hoverable
            style={{ width: 500, height: 750, }}
            cover={<Image alt={book?.name} src={book?.imageURL} style={{height: 250}}/>}
        >
            <Card.Meta
                title={<Title level={4}>{book?.name}</Title>}
                description={
                    <>
                        <Paragraph  style={{ maxHeight: '200px', overflowY: 'scroll' }}>{book?.description}</Paragraph>
                        <Paragraph>Type: {book?.type}</Paragraph>
                        <Paragraph>Year: {book?.year}</Paragraph>
                        <Paragraph>ISBN: {book?.isbn}</Paragraph>
                        <Paragraph>Category ID: {book?.categoryId}</Paragraph>
                        <Paragraph>Author ID: {book?.authorId}</Paragraph>
                        <Paragraph>ID: {book?.id}</Paragraph>
                        
                        <Link href={`/Loan?bookId=${book?.id}`}>
                            <Button>Loan</Button>
                        </Link>
                    </>
                }
            />
        </Card>
    );
}

export default withAuth(Read);