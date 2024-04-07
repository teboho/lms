"use client";
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Flex, Layout, Input, List, Typography, Select, message } from "antd";
import type { SearchProps } from "antd/es/input";
const { Content, Sider } = Layout;
const { Search } = Input;
import {useStyles} from "./styles";
import withAuth from "@/hocs/withAuth";
import BookContext from "@/providers/bookProvider/context";
import SearchResults from "@/components/searchResults";
import GoogleSearchResults from "@/components/googleSearchResults";
import Utils from "@/utils";

const Page = (): React.ReactNode => {
    const { getAll, search } = useContext(BookContext);
    const { styles, cx } = useStyles();

    const accessToken = Utils.getAccessToken(); // localStorage.getItem("accessToken");

    useEffect(() => {
        console.log("AllBooks useEffect");
        if (accessToken) { 
            getAll();
        }
    }, []);
    
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