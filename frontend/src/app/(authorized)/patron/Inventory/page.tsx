"use client";
import { ReactNode, useState, useEffect, useMemo, useContext } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import withAuth from "@/hocs/withAuth";
import { Card, Typography, Image, Button , List, message, Steps, theme, Select, Space } from 'antd';
import BookContext, { BookDataType, BookType } from "@/providers/bookProvider/context";

import InventoryContext from "@/providers/inventoryProvider/context";
import CategoryContext from "@/providers/categoryProvider/context";

const { Title, Paragraph } = Typography;

const Page = (): React.ReactNode => {
    const { token } = theme.useToken();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const { books } = useContext(BookContext);
    const { inventoryItems } = useContext(InventoryContext);
    const { categories } = useContext(CategoryContext);
    const [currentBooks, setCurrentBooks] = useState([]);

    const memoInventoryItems = useMemo(() => {
        return inventoryItems;
    }, [inventoryItems]);

    let memoBooks = useMemo(() => {
        setCurrentBooks(prev => books?.sort((a: BookDataType, b: BookDataType) => a.categoryId.localeCompare(b.categoryId)));
        return books?.sort((a, b) => a.categoryId.localeCompare(b.categoryId));
    }, [books]);

    const memoCategories = useMemo(() => {
        return categories;
    }, [categories]);

    // filter the inventory items by book id
    function filterInventoryItems(bookId: string) {
        return memoInventoryItems?.filter((item) => item.bookId === bookId)[0];
    }

    const { Option } = Select;

    return (
        <>
            <div>
                <Title level={3}>Inventory</Title>
                <Paragraph>
                    This is the inventory page
                </Paragraph>
            </div>

            {/* antd dropdown filter by category */}
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a category"
                optionFilterProp="children"
                filterOption={(input, option) =>
                        `${option.children}`.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onSelect={(value) => {
                    const filteredBooks = books?.filter((book) => book.categoryId === value);

                    memoBooks = filteredBooks;
                    setCurrentBooks(filteredBooks);
                }}
                >
                {memoCategories?.map((category) => (
                    <Option key={category.id} value={category.id}>{category.name}</Option>
                ))}
            </Select>
            <Button onClick={() => {
                setCurrentBooks(books);
            }}>
                Clear
            </Button>
            <Space />
            <Select
                style={{ width: 200, marginLeft: 20 }}
                placeholder="Sort by"
                onSelect={(value) => {
                    let sortedBooks;
                    if (value === 'name') {
                        sortedBooks = [...currentBooks].sort((a, b) => a.name.localeCompare(b.name));
                    } else if (value === 'year') {
                        sortedBooks = [...currentBooks].sort((a, b) => a.year - b.year);
                    }
                    setCurrentBooks(sortedBooks);
                }}
            >
                <Option value="name">Name</Option>
                <Option value="year">Year</Option>
            </Select>

            <List
                id="inventory-list"
                itemLayout="vertical"
                size="large"
                dataSource={currentBooks}
                renderItem={(book: BookDataType) => (
                    <List.Item
                        key={book.id}
                        extra={
                            <Image
                                width={272}
                                alt={book.name}
                                src={book.imageURL}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<Link href={`/patron/books?bookId=${book.id}`}>{book.name}</Link>}
                            description={book.description}
                        />
                        <Paragraph>
                            Type: {BookType[book.type]}
                            , Year: {book.year}
                        </Paragraph>
                        <Paragraph>
                            ISBN: {book.isbn}
                        </Paragraph>
                        <Paragraph>
                            Category ID: {book.categoryId}
                        </Paragraph>
                        <Paragraph>
                            Author ID: {book.authorId}
                        </Paragraph>
                        <Paragraph>
                            ID: {book.id}
                        </Paragraph>
                        {book.type > 0 && <Link href={`patron/books?bookId=${book.id}`}>
                            <Button>Read</Button>
                        </Link>}
                        {book.type !== 1 && <Link href={`patron/loans?bookId=${book.id}`}>
                            <Button>Loan</Button>
                        </Link>}
                        {
                            book.type !== 1 && filterInventoryItems(book.id) && (
                                <Paragraph>
                                    Inventory Count: {filterInventoryItems(book.id).count}
                                </Paragraph>
                            )
                        }
                    </List.Item>
                )}
            />
           
        </>
    );
}

export default withAuth(Page);