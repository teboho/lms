'use client';
import React, { useContext } from "react";
import { BookType, type BookDataType } from "@/providers/bookProvider/context";
import { Card, Typography, Image, Button, ConfigProvider } from "antd";
import Link from "next/link";
import AuthorsContext from "@/providers/authorsProvider/context";
import CategoryContext from "@/providers/categoryProvider/context";
import { useStyles } from "./style";

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
    const { styles, cx } = useStyles();

    const author = _getAuthor(book?.authorId);

    return (
        <Card
            hoverable
            style={{ width: 240, background: "#d0e1e1" }}
            className={cx(styles.maxHeight)}
        >
            <Image 
                alt={book?.name} 
                src={book.imageURL ? book.imageURL : "/assets/images/generic.jpg"} 
                style={{height: 150}}
            />
            <Title level={4}>{book?.name}</Title>
            <Paragraph>Type: {BookType[book?.type]}, Year: {book?.year}</Paragraph>
            <Paragraph>ISBN: {book?.isbn}</Paragraph>
            <Paragraph>Category: {getCategory(book?.categoryId)?.name}</Paragraph>
            {author && <Paragraph>Author: {`${author?.firstName} ${author?.lastName}`} </Paragraph>}

            <div className={styles.buttons}>
                {book?.type !== 1 && 
                <Link href={`/patron/loan?bookId=${book?.id}`}>
                    <ConfigProvider 
                        theme={{
                            token: {
                                colorPrimary: "#00BF63",
                            }                        
                        }}
                    >
                        <Button type="primary">Loan</Button>
                    </ConfigProvider>
                </Link>}
                {" "}
                <Link href={`/patron/books?bookId=${book?.id}`}>
                    <Button type="primary">View</Button>
                </Link>
            </div>
        </Card>
    );    
}

export default Book;