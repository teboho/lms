"use client";
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Flex, Layout, Input, List, Typography, Select, message } from "antd";
import type { SearchProps } from "antd/es/input";
const { Content, Sider } = Layout;
const { Search } = Input;
import {useStyles} from "./styles";
import withAuth from "@/hocs/withAuth";
import BookContext, { BookDataType } from "@/providers/bookProvider/context";
import SearchResults from "@/components/searchResults";
import GoogleSearchResults from "@/components/googleSearchResults";
import Utils, { TokenProperies } from "@/utils";
import { PreferenceContext, PreferenceType } from "@/providers/preferenceProvider/context";
import CategoryContext from "@/providers/categoryProvider/context";
import { HistoryContext, HistoryType } from "@/providers/historyProvider/context";

const Page = (): React.ReactNode => {
    const { getAll, search, getLocalBook } = useContext(BookContext);
    const { getPreferenceByPatron } = useContext(PreferenceContext);
    const { getCategory, getAllCategories } = useContext(CategoryContext);
    const { historyData, getHistoryData } =  useContext(HistoryContext);
    const [categories, setCategories] = useState([]);
    const [books, setBooks] = useState([]);
    const [googleResults, setGoogleResults] = useState([]);
    
    const { styles, cx } = useStyles();
    const accessToken = Utils.getAccessToken(); // localStorage.getItem("accessToken");

    useEffect(() => {
        console.log("AllBooks useEffect");     

        if (accessToken) { 
            getHistoryData();
            getAllCategories();
            getAll();
        }
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