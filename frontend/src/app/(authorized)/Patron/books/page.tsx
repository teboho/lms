"use client";
import { ReactNode, useMemo, useContext, } from "react";
import { useSearchParams } from "next/navigation";

import withAuth from "@/hocs/withAuth";
import { Typography, Image, List, theme, Row, Col, Button } from 'antd';
import BookContext, { BookDataType } from "@/providers/bookProvider/context";
import CategoryContext from "@/providers/categoryProvider/context";
import AuthorsContext from "@/providers/authorsProvider/context";
import Link from "next/link";
import Book from "@/components/Book";

const { Title, Paragraph } = Typography;

const Page = (): React.ReactNode => {
    const { token } = theme.useToken();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { getCategory } = useContext(CategoryContext);
    const { getAuthorById } = useContext(AuthorsContext);
    const { books } = useContext(BookContext);

    const bookId = params.get("bookId");

    const filterBook = books?.filter(book => book.id === bookId)[0];

    return (
        <>
            {/* Fill the page with book data */}
            
            {
                filterBook && (
                <Row>
                <Col span={8}>
                    <Image src={filterBook?.imageURL} />
                </Col>
                <Col span={16}>
                    <Title>{filterBook?.name}</Title>
                    <Paragraph>{filterBook?.description}</Paragraph>
                    <Paragraph>Year: {filterBook?.year}</Paragraph>
                    <Paragraph>ISBN: {filterBook?.isbn}</Paragraph>
                    <Paragraph>Category: {getCategory(filterBook?.categoryId).name}</Paragraph>
                    <Paragraph>Author: {getAuthorById(filterBook?.authorId)?.firstName} {getAuthorById(filterBook?.authorId)?.lastName}</Paragraph>
                    <Link href={`/patron/loan?bookId=${filterBook?.id}`}>
                        <Button>Loan</Button>
                    </Link>
                </Col>
                </Row>)
            }
           
        </>
    );
}

export default withAuth(Page);