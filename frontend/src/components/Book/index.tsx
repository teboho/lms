'use client';
import React, { useContext, useState } from "react";
import type { BOOK } from "@/providers/BookProvider/context";
import { Card, Typography, Image, Button } from "antd";
import Link from "next/link";

interface BookProps {
    book: BOOK;
}

const { Title, Paragraph } = Typography;

/**
 * Needs to take in a book object
 * @param props json book object
 * @returns The book component
 */
const Book: React.FC<BookProps> = ({ book }) => {
   
    return (
        <Card
            hoverable
            style={{ width: 500, height: 500, overflow: 'auto' }}
            cover={<Image alt={book.name} src={book.imageURL} style={{height: 250}}/>}
        >
            <Card.Meta
                title={<Title level={4}>{book.name}</Title>}
                description={
                    <>
                        <Paragraph  style={{ maxHeight: '200px', overflowY: 'scroll' }}>{book.description}</Paragraph>
                        <Paragraph>Type: {book.type}</Paragraph>
                        <Paragraph>Year: {book.year}</Paragraph>
                        <Paragraph>ISBN: {book.isbn}</Paragraph>
                        <Paragraph>Category ID: {book.categoryId}</Paragraph>
                        <Paragraph>Author ID: {book.authorId}</Paragraph>
                        <Paragraph>ID: {book.id}</Paragraph>
                        <Link href={`/Read?bookId=${book.id}`}>
                            <Button>Read</Button>
                        </Link>
                    </>
                }
            />
        </Card>
    );    
}

export default Book;