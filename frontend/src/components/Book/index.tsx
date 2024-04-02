'use client';
import React, { use, useContext, useEffect, useMemo } from "react";
import { BookType, type BookDataType } from "@/providers/BookProvider/context";
import { Card, Typography, Image, Button, Row } from "antd";
import Link from "next/link";
import AuthorsContext, { AuthorDataType } from "@/providers/AuthorsProvider/context";

interface BookProps {
    book: BookDataType;
}

const { Title, Paragraph } = Typography;

/**
 * Needs to take in a book object
 * @param props json book object
 * @returns The book component
 */
const Book: React.FC<BookProps> = ({ book }) => {
    const { getAuthor, authorsState } = useContext(AuthorsContext);

    useEffect(() => {
        if (book.authorId)
        {
            getAuthor(book.authorId);
        }
        console.log("Book useEffect", authorsState);
    }, [authorsState]);

    const author: AuthorDataType = useMemo(() => authorsState.author, [authorsState]);

    // Small card for each book
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            title={book.name}
        >
            <Image alt={book.name} src={book.imageURL} style={{height: 150}}/>
            <Paragraph>Type: {BookType[book.type]}, Year: {book.year}</Paragraph>
            <Paragraph>ISBN: {book.isbn}</Paragraph>
            <Paragraph>Category ID: {book.categoryId}</Paragraph>
            <Paragraph>Author ID: {`${author.firstName} ${author.lastName}`} </Paragraph>
            <Paragraph>ID: {book.id}</Paragraph>
            {book.type > 0 && <Link href={`/Read?bookId=${book.id}`}>
                <Button color="green">Read</Button>
            </Link>}
            {book.type !== 1 && <Link href={`/Loan?bookId=${book.id}`}>
                <Button>Loan</Button>
            </Link>}
            <Link href={`/Patron/Book/${book.id}`}>
                <Button type="primary">View</Button>
            </Link>
        </Card>
    );    
}

export default Book;