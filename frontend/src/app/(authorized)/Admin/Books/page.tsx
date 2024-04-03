"use client";
import { ReactNode, useState, useEffect, useMemo, useContext, use } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import withAuth from "@/hocs/withAuth";
import { Card, Typography, Image, Button , List, message, Steps, theme, Select, Space, Row, Col } from 'antd';
import BookContext, { BookDataType, BookType } from "@/providers/BookProvider/context";

import InventoryContext from "@/providers/InventoryProvider/context";
import CategoryContext, { CategoryType } from "@/providers/CategoryProvider/context";
import AuthorsContext from "@/providers/AuthorsProvider/context";

const { Title, Paragraph } = Typography;

const Inventory = (): React.FC | React.ReactNode => {
    const { token } = theme.useToken();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { getCategory } = useContext(CategoryContext);
    const { getAuthorById } = useContext(AuthorsContext);
    const { books } = useContext(BookContext);

    const filterBooks = useMemo(() => { 
        return books?.filter((book) => book.categoryId === params.get("categoryId"));
    }, [books]);

    return (
        <>
            <div>
                <Title level={3}>Inventory</Title>
                <Paragraph>
                    This is the inventory page for category: {getCategory(params.get("categoryId"))?.name}
                </Paragraph>
            </div>

            <List
                itemLayout="horizontal"
                dataSource={filterBooks}
                renderItem={(book: BookDataType) => (
                    <List.Item>
                        <Row>
                            <Col span={16}>
                                <List.Item.Meta
                                    title={book.name}
                                />
                                {/* <Link href={`/Admin/Books/${book.id}`}>
                                    <Button type="primary">View Book</Button>
                                </Link> */}
                            </Col>
                            
                            <Col span={8}>
                                <Image
                                    width={200}
                                    src={book.imageURL}
                                    alt={book.name}
                                />
                            </Col>
                        </Row>
                    </List.Item>
                )}

                />

           
        </>
    );
}

export default withAuth(Inventory);