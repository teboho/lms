'use client';
import React, { use, useContext, useEffect, useMemo, useState } from "react";
import BookContext, { BookType, SearchBookDataType, type BookDataType } from "@/providers/bookProvider/context";
import { Card, Typography, Image, Button, Popconfirm, InputNumber, message } from "antd";

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
    const [count, setCount] = useState(10);
    const { sendBook } = useContext(BookContext);
    const { item1: book } = bookStuff;
    const { item2: category } = bookStuff;
    const { item3: author } = bookStuff;
    const [messageApi, contextHolder] = message.useMessage();

    const onNumberChange = (value: number) => {
        console.log("number change", value);
        setCount(value);
    }

    const success = () => {
        messageApi.success('Book added successfully!');
    }

    const error = () => {
        messageApi.error('An error occurred. Please try again.');
    }

    /**
     * 
     * @param e 
     */
    const addbook = (e) => {
        // to check if the category id is not guid initial value in which case we first need to add the category
        // if ()
        // then also check if the author id is not guid initial value in which case we first need to add the author
        // then we can add the book
        if (category.id === Guid.EMPTY) {
            console.log("Category does not exist yet");
        }

        if (author.id === Guid.EMPTY) {
            console.log("Author does not exist yet");
        }

        if (book.id === Guid.EMPTY) {
            console.log("Book does not exist yet");
        }

        const bookData = {
            ...book,
            count,
            category: {
                ...category
            },
            author: {
                ...author
            }
        }
    
        console.log("Adding book", bookData);

        sendBook(bookData);
    }

    const cancel = () => {
        console.log("Cancelled");
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
            <label htmlFor="bookCount">Count</label>
            <InputNumber id="bookCount" name="bookCount" min={1} max={50} defaultValue={count} onChange={onNumberChange} />
            <br />
            <Popconfirm
                title="Are you sure you want to add this book?"
                description="This will add the book to the library, but you need to provide the count of books available."
                onConfirm={addbook}
                onCancel={cancel}
                okText="Add book"
                cancelText="Cancel"
            >
                <Button type="primary" >Add</Button>
            </Popconfirm>
        </Card>
    );    
}

export default SearchBook;