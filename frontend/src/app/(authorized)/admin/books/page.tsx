"use client";
import { ReactNode, useMemo, useContext, } from "react";
import { useSearchParams } from "next/navigation";

import withAuth from "@/hocs/withAuth";
import { Typography, Image, List, theme, Row, Col, Button } from 'antd';
import BookContext, { BookDataType } from "@/providers/bookProvider/context";
import CategoryContext from "@/providers/categoryProvider/context";
import AuthorsContext from "@/providers/authorsProvider/context";
import Link from "next/link";

const { Title, Paragraph } = Typography;

const Page = (): React.ReactNode => {
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
                                <Link href={`/admin/loans?bookId=${book.id}`}>
                                    <Button type="primary">View Related Loans</Button>
                                </Link>
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

export default withAuth(Page);