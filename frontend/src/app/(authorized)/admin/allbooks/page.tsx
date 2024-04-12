"use client";
import { useContext, useEffect } from "react";
import withAuth from "@/hocs/withAuth";
import { Layout, List, Typography } from "antd";
import BookContext from "@/providers/bookProvider/context";
const { Content, Sider } = Layout;
import { useStyles } from "./styles";
import SearchResults from "@/components/searchResults";
import Book from "@/components/book";
import AuthContext from "@/providers/authProvider/context";

const { Title } = Typography;

const AllBooks = (): React.ReactNode => {
    const { authObj } = useContext(AuthContext);
    const { books, getAll } = useContext(BookContext);
    const { styles, cx } = useStyles();

    useEffect(() => {
    let accessToken = authObj?.accessToken;
        accessToken = authObj?.accessToken;
        if (accessToken) { 
            getAll();
        }        
    }, []);

    useEffect(() => {
        let accessToken = authObj?.accessToken;
        accessToken = authObj?.accessToken;
        if (accessToken) { 
            getAll();
        }      
    }, [authObj, getAll]);

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