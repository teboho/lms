"use client";
import { ReactNode, useState, useEffect, useMemo, useContext, use } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import withAuth from "@/hocs/withAuth";
import { Card, Typography, Image, Button , List, message, Steps, theme, Select, Space } from 'antd';
import BookContext, { BookDataType, BookType } from "@/providers/bookProvider/context";

import InventoryContext from "@/providers/inventoryProvider/context";
import CategoryContext, { CategoryType } from "@/providers/categoryProvider/context";
import AuthorsContext from "@/providers/authorsProvider/context";

const { Title, Paragraph } = Typography;

const Page = (): React.ReactNode => {
    const { token } = theme.useToken();
    const searchParams = useSearchParams();
    const { books, getAll: getAllBooks } = useContext(BookContext);
    const { inventoryItems, getAll, getInventory } = useContext(InventoryContext);
    const { categories, getCategory, getAllCategories } = useContext(CategoryContext);
    const { getAuthorById, getAuthors } = useContext(AuthorsContext);
    const [currentBooks, setCurrentBooks] = useState([]);

    useEffect(() => {
            getAll();
            getAllBooks();
            getAuthors();
            getAllCategories();
    }, []);

    const memoInventoryItems = useMemo(() => {
        return inventoryItems;
    }, [inventoryItems]);

    let memoBooks = useMemo(() => {
        setCurrentBooks(prev => books?.sort((a: BookDataType, b: BookDataType) => a.categoryId.charCodeAt(0) - b.categoryId.charCodeAt(0)));
        return books?.sort((a: BookDataType, b: BookDataType) => a.categoryId.charCodeAt(0) - b.categoryId.charCodeAt(0));
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
                    console.log(value);
                    // document.getElementById("inventory-list")?.scrollIntoView();
                    // show only the books that match the category id
                    const filteredBooks = books?.filter((book) => book.categoryId === value);
                    // console.log(filteredBooks);

                    memoBooks = filteredBooks;
                    setCurrentBooks(filteredBooks);
                }}
                >
                {memoCategories?.map((category: CategoryType) => (
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
                                width={136}
                                alt={book.name}
                                src={book.imageURL ? book.imageURL : "/assets/images/generic.jpg"}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={book?.name}
                            description={book?.description}
                        />
                        <Paragraph>
                            Type: {BookType[book.type]}
                            , Year: {book.year}
                        </Paragraph>
                        <Paragraph>
                            ISBN: {book.isbn}
                        </Paragraph>
                        <Paragraph>
                            Category: {getCategory(book?.categoryId)?.name}
                        </Paragraph>
                        <Paragraph>
                            Author: {`${getAuthorById(book?.authorId)?.firstName} ${getAuthorById(book?.authorId)?.lastName}`}
                        </Paragraph>
                        {book.type !== 1 && <Link href={`/admin/loans?bookId=${book.id}`}>
                            <Button>View Loans</Button>
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