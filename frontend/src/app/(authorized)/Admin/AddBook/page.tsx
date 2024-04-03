"use client";
import { ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Flex, Layout, Input, List, Typography, Select, message } from "antd";
import type { SearchProps } from "antd/es/input";
const { Content, Sider } = Layout;
const { Search } = Input;
import {useStyles} from "./styles";
import withAuth from "@/hocs/withAuth";
import BookContext from "@/providers/BookProvider/context";
import SearchResults from "@/components/SearchResults";
import GoogleSearchResults from "@/components/GoogleSearchResults";
import Utils from "@/utils";

const { Option } = Select;

const AddBook = (): React.FC | React.ReactNode => {
    const { searchBooks, getAll, search } = useContext(BookContext);
    const [currentBooks, setCurrentBooks] = useState([]);
    const { styles, cx } = useStyles();

    const accessToken = Utils.getAccessToken(); // localStorage.getItem("accessToken");

    useEffect(() => {
        console.log("AllBooks useEffect");
        if (accessToken) { 
            getAll();
        }
    }, []);
    
    let memoSearchBooks = useMemo(() => searchBooks, [searchBooks]);

    const onSearch = (value: string) => {
        console.log(value);

        search(value);
        // const filteredBooks = books.filter((book) => book.name.toLowerCase().includes(value.toLowerCase()));
        // setCurrentBooks(filteredBooks);
    }

    return (
        <>   
            <Layout>
                <Sider style={{background: "white"}} className={cx(styles.right)} width={"100%"}>
                    
                    <Content className={cx(styles.content)}>
                        <Typography.Title level={3}>Add A New Book</Typography.Title>
                        <Typography.Paragraph>
                            In order to add a new book, please search for the book you want to add.
                        </Typography.Paragraph>
                        {/* add search bar */}
                        <Search
                            placeholder="Enter book title"
                            onSearch={onSearch}
                            style={{ width: 400 }}
                        />
{/*                         
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
                        */}
                        
                        <GoogleSearchResults />
                    </Content>
                </Sider>
            </Layout>
        </>
    );
}

export default withAuth(AddBook);