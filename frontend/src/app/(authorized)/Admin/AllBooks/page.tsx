"use client";
import { useContext, useEffect, useMemo } from "react";
import withAuth from "@/hocs/withAuth";
import { Layout, List, Typography } from "antd";
import BookContext from "@/providers/bookProvider/context";
const { Content, Sider } = Layout;
import {useStyles} from "./styles";
import Book from "@/components/Book";
import SearchResults from "@/components/searchResults";
import Utils from "@/utils";

const { Title } = Typography;

const AllBooks = (): React.ReactNode => {
    const { books, getAll } = useContext(BookContext);
    const { styles, cx } = useStyles();

    const accessToken = Utils.getAccessToken(); // localStorage.getItem("accessToken");

    useEffect(() => {
        if (accessToken) { 
            getAll();
        }
    }, []);

    return (
        <>   
            <Layout>
                <Sider style={{background: "white"}} className={cx(styles.right)} width={"100%"}>
                    <Content className={cx(styles.content)}>
                        <Title>Books</Title>     
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