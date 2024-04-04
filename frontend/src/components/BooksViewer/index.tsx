'use client';
import React, { use, useContext, useEffect, useMemo } from "react";
import BookContext, { BookType, type BookDataType } from "@/providers/bookProvider/context";
import { Card, Typography, Image, Button, Row, List } from "antd";
import Link from "next/link";

interface BookProps {
    book: BookDataType;
}

const { Title, Paragraph } = Typography;

/**
 * Needs to take in a book object
 * @param props json book object
 * @returns The book component
 */
const BooksViewer: React.FC<BookProps> = ({ book }) => {
    // Small card for each book
    return (
        <Card
            hoverable
            style={{ width: 240 }}
            cover={<Image alt="example" src={book.imageURL} />}
        >
            <Card.Meta title={book.name} description={book.description} />
            <Link href={`/admin/Books/${book.id}`}>
                <Button type="primary">View</Button>
            </Link>
        </Card>        
    );    
}

export default BooksViewer;