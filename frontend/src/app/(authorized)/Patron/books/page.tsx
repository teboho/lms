"use client";
import React, { ReactNode, useMemo, useContext, useEffect, use, } from "react";
import { useSearchParams } from "next/navigation";
import Head from "next/head";
import withAuth from "@/hocs/withAuth";
import { Typography, Image, List, theme, Row, Col, Button } from 'antd';
import BookContext, { BookDataType } from "@/providers/bookProvider/context";
import CategoryContext from "@/providers/categoryProvider/context";
import AuthorsContext from "@/providers/authorsProvider/context";
import Link from "next/link";
import {useStyles} from "./styles";
import { HistoryContext, HistoryType } from "@/providers/historyProvider/context";
import AuthContext from "@/providers/authProvider/context";
import Script from "next/script";

const { Title, Paragraph } = Typography;

const Page = (): React.ReactNode => {
    const { token } = theme.useToken();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { getCategory } = useContext(CategoryContext);
    const { getAuthorById } = useContext(AuthorsContext);
    const { userObj } = useContext(AuthContext);
    const { books } = useContext(BookContext);
    const { history, historyData, getHistoryData, postHistory, viewCount } = useContext(HistoryContext);
    const { styles, cx } = useStyles();
    const isMountedRef = React.useRef(false);

    const bookId = params.get("bookId");
    useEffect(() => {
        if (!isMountedRef.current) {
            console.log("Book useEffect");
            // supposed to make a history call here
            const userId = userObj?.id;
            const historyObj: HistoryType = {
                patronId: userId,
                dateRead: new Date().toISOString(),
                bookId: bookId
            };
            console.log("history obj ready", historyObj);

            postHistory(historyObj);
            
            return () => {
                isMountedRef.current = true;
            };
        }
    }, []);

    const filterBook = books?.filter(book => book.id === bookId)[0];

    return (
        <div className={cx(styles.padding)}>
            {
                filterBook && (<>
                    <Head>
                        <title>{"fff"}</title>
                    </Head>
                    <Row>
                        <Col span={8}>
                            <br />
                            <br />
                            <Image src={filterBook?.imageURL} alt="" />
                        </Col>
                        <Col span={16}>
                            <Title>{filterBook?.name}</Title>
                            <Paragraph>{filterBook?.description}</Paragraph>
                            <Paragraph>Year: {filterBook?.year}</Paragraph>
                            <Paragraph>ISBN: {filterBook?.isbn}</Paragraph>
                            <Paragraph>Category: {getCategory(filterBook?.categoryId)?.name}</Paragraph>
                            <Paragraph>Author: {getAuthorById(filterBook?.authorId)?.firstName} {getAuthorById(filterBook?.authorId)?.lastName}</Paragraph>
                            <Link href={`/patron/loan?bookId=${filterBook?.id}`}>
                                <Button>Loan</Button>
                            </Link>
                            {/* <Link 
                                href={`https://books.google.com/books?dq=isbn:${filterBook?.isbn}&hl=en&newbks=1&newbks_redir=1&sa=X&ved=2ahUKEwi3_5OekLKFAxWlQ_EDHdCZAPkQ6AF6BAgHEAI`}
                            >
                                <Button>View on google</Button>
                            </Link> */}
                        </Col>
                    </Row>
                    <hr />
                </>)
            }
        </div>
    );
}

export default withAuth(Page);