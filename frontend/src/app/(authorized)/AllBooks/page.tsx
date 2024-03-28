"use client";
import { ReactNode, useContext, useEffect, useMemo } from "react";
import withAuth from "@/hocs/withAuth";
import { Flex, Layout, Input, List, Typography } from "antd";
import type { SearchProps } from "antd/es/input";
import BookContext from "@/providers/BookProvider/context";
const { Content, Sider } = Layout;
const { Search } = Input;
import Image from "next/image";
import {useStyles} from "./styles";
import Preferences from "@/components/Preferences";
import History from "@/components/History";
import Book from "@/components/Book";
import SearchResults from "@/components/SearchResults";

const AllBooks = (): React.FC | React.ReactNode => {
    const { books, getAll } = useContext(BookContext);
    const { styles, cx } = useStyles();

    useEffect(() => {
        getAll();
    }, []);

    return (
        <>   
            <Layout>
                <Sider style={{background: "white"}} className={cx(styles.right)} width={"100%"}>
                    <Content className={cx(styles.content)}>
                        <h1>Books</h1>     
                        <SearchResults books={books} searchTerm="..." />
                        <List
                            className={cx(styles.list)}
                            dataSource={books}
                            renderItem={(item, index) => (
                                <Book book={item} />
                            )}
                        />
                    </Content>
                </Sider>
            </Layout>

        </>
    );
}

export default withAuth(AllBooks);