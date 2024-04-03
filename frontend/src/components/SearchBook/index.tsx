'use client';
import React, { use, useContext, useEffect, useMemo } from "react";
import { BookType, SearchBookDataType, type BookDataType } from "@/providers/BookProvider/context";
import { Card, Typography, Image, Button, Row } from "antd";

import { Guid } from "js-guid";

interface BookProps {
    bookStuff: SearchBookDataType;
}

const { Title, Paragraph } = Typography;

/**
 * Needs to take in a book object
 * @param props json book object
 * @returns The book component
 */
const SearchBook: React.FC<BookProps> = ({ bookStuff }) => {
    const { item1: book } = bookStuff;
    const { item2: category } = bookStuff;
    const { item3: author } = bookStuff;

    const addBook = e => {
        // to check if the category id is not guid initial value in which case we first need to add the category
        // if ()
        // then also check if the author id is not guid initial value in which case we first need to add the author
        // then we can add the book

        if (category.id === Guid.EMPTY) {
            console.log("Category is empty");
        }

        if (author.id === Guid.EMPTY) {
            console.log("Author is empty");
        }

        if (book.id === Guid.EMPTY) {
            console.log("Book is empty");
        }
    }

    // Small card for each book
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            title={book.name}
        >
            <Image alt={book.name} src={book.imageURL} style={{height: 150}}/>
            <Paragraph>Type: {BookType[book.type]}, Published: {book.year}</Paragraph>
            <Paragraph>ISBN: {book.isbn}</Paragraph>
            <Paragraph>Category: {category.name}</Paragraph>
            <Paragraph>Author: {`${author.firstName} ${author.lastName}`} </Paragraph>
            {/* <Paragraph>ID: {book.id}</Paragraph> */}
            {/* {book.type !== 1 && <Link href={`/Loan?bookId=${book.id}`}>
                <Button>Loan</Button>
            </Link>} */}
            <Button type="primary" onClick={addBook}>Add</Button>
        </Card>
    );    
}

export default SearchBook;