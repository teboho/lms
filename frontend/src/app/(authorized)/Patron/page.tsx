"use client";
import { useContext, useEffect, useMemo, useState } from "react";
import withAuth from "@/hocs/withAuth";
import { Button, Layout, Select, Space } from "antd";
import BookContext from "@/providers/bookProvider/context";
import {useStyles} from "./styles";
import AuthContext from "@/providers/authProvider/context";
import SearchResults from "@/components/searchResults";
import CategoryContext from "@/providers/categoryProvider/context";
import InventoryContext from "@/providers/inventoryProvider/context";
import AuthorsContext from "@/providers/authorsProvider/context";

const { Content } = Layout;
const { Option } = Select;

const Page = (): React.ReactNode => {
    const { userObj } = useContext(AuthContext);
    const { books, getAll: getAllBooks , searchTerm} = useContext(BookContext);
    const { inventoryItems, getAll, getInventory } = useContext(InventoryContext);
    const { categories, getCategory, getAllCategories } = useContext(CategoryContext);
    const { getAuthorById, getAuthors } = useContext(AuthorsContext);
    const { styles, cx } = useStyles();

    const [currentBooks, setCurrentBooks] = useState([]);
    const memoCategories = useMemo(() => categories, [categories]);

    useEffect(() => {
        getAll();
        getAllBooks();
        getAuthors();
        getAllCategories();
        setCurrentBooks(books);
    }, []);

    useEffect(() => {
        console.log("Home useEffect", userObj);
        
        if (!books) {
            console.log("Fetching books");
            getAll();
        }
    }, [userObj]);
    
    useEffect(() => {
        console.log("Books", books);
        setCurrentBooks(books);
    }, [books]);

    const user = useMemo(() => userObj, [userObj]);
    let memoBooks = useMemo(() => currentBooks, [currentBooks]);
    const chooseCategory = (
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
                const filteredBooks = books?.filter((book) => book.categoryId === value);
                console.log(filteredBooks);
                setCurrentBooks(filteredBooks);
            }}
        >
            {memoCategories?.map((category) => (
                <Option key={category.id} value={category.id}>{category.name}</Option>
            ))}
        </Select>
    ); 
    return (
        <Content className={cx(styles.content, styles.padding)}>
            <h1>Welcome back to savvyshelf</h1>     
            {/* antd dropdown filter by category */}
            {chooseCategory}
            <Button onClick={() => {
                setCurrentBooks(books);
                // clear search term
                // chooseCategory.
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

            <SearchResults books={memoBooks} searchTerm={searchTerm} />
        </Content>
    );
}

export default withAuth(Page);