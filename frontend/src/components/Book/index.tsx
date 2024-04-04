'use client';
import React, { useContext } from "react";
import { BookType, type BookDataType } from "@/providers/bookProvider/context";
import { Card, Typography, Image, Button, Space } from "antd";
import Link from "next/link";
import AuthorsContext, { AuthorDataType } from "@/providers/authorsProvider/context";
import CategoryContext from "@/providers/categoryProvider/context";

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
    const { _getAuthor } = useContext(AuthorsContext);
    const {getCategory} = useContext(CategoryContext);

    const author = _getAuthor(book?.authorId);

    return (
        <Card
            hoverable
            style={{ width: 240 }}
        >
            <Image alt={book?.name} src={book?.imageURL} style={{height: 150}}/>
            <Title level={4}>{book?.name}</Title>
            <Paragraph>Type: {BookType[book?.type]}, Year: {book?.year}</Paragraph>
            <Paragraph>ISBN: {book?.isbn}</Paragraph>
            <Paragraph>Category: {getCategory(book?.categoryId)?.name}</Paragraph>
            {author && <Paragraph>Author: {`${author?.firstName} ${author?.lastName}`} </Paragraph>}
            {/* {book?.type > 0 && <Link href={`/read?bookId=${book?.id}`}>
                <Button color="green">Read</Button>
            </Link>} */}
            {book?.type !== 1 && <Link href={`/patron/loan?bookId=${book?.id}`}>
                <Button>Loan</Button>
            </Link>}
            <Space size={25} />
            <Link href={`/patron/books?bookId=${book?.id}`}>
                <Button type="primary">View</Button>
            </Link>
        </Card>
    );    
}

export default Book;