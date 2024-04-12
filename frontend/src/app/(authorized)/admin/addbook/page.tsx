"use client";
import { useContext, useEffect, useState } from "react";
import { Layout, Input, Typography } from "antd";
const { Content } = Layout;
const { Search } = Input;
import {useStyles} from "./styles";
import withAuth from "@/hocs/withAuth";
import BookContext, { BookDataType } from "@/providers/bookProvider/context";
import GoogleSearchResults from "@/components/googleSearchResults";
import CategoryContext from "@/providers/categoryProvider/context";
import { HistoryContext, HistoryType } from "@/providers/historyProvider/context";
import AuthContext from "@/providers/authProvider/context";
import Utils from "@/utils";

const Page = (): React.ReactNode => {
    const { authObj } = useContext(AuthContext);
    const { getAll, search, getLocalBook } = useContext(BookContext);
    const { getCategory, getAllCategories } = useContext(CategoryContext);
    const { historyData, getHistoryData } =  useContext(HistoryContext);
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    
    const { styles, cx } = useStyles();

    useEffect(() => {
        let accessToken = Utils.getAccessToken();

        console.log("AllBooks useEffect");     

        if (accessToken) { 
            getHistoryData();
            getAllCategories();
            getAll();
        }
        console.log("AllBooks useEffect end");
        console.log("check this", authObj);
    }, []);

    useEffect(() => {
        console.log("Addbook useEffect historyData");
        console.log(historyData);
        historyData?.forEach((historyItem: HistoryType) => {
            const book = getLocalBook(historyItem.bookId);
            if (books.findIndex((b: BookDataType) => b?.id === book?.id) === -1) {
                setBooks([...books, book]);
            }

            const category = getCategory(book?.categoryId);
            if (categories.findIndex((c) => c?.id === category?.id) === -1) {
                setCategories([...categories, category]);
            }
        })
    }, [getCategory, getLocalBook, historyData]);

    useEffect(() => {
        console.log("Addbook useEffect categories");
        console.log(categories);
    }, [categories]);

    useEffect(() => {
        console.log("Addbook useEffect books");
        console.log(books);

        let searchQuery = "";
        books.forEach((book: BookDataType) => {
            searchQuery +=  "subject:" + book?.name + "";
        });
        search(searchQuery);
    }, [books]);
    
    const onSearch = (value: string) => {
        console.log(value);
        search(value);
    }

    return (
        <Layout>
                <Content className={cx(styles.content)}>
                    <Typography.Title level={3}>Add A New Book</Typography.Title>
                    <Typography.Paragraph>
                        In order to add a new book, please search for the book you want to add.
                    </Typography.Paragraph>
                    <Search
                        placeholder="Enter book title"
                        onSearch={onSearch}
                        style={{ width: 400 }}
                    />
                    
                    <GoogleSearchResults />
                </Content>
        </Layout>
    );
}

export default withAuth(Page);