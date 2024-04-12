"use client";
import { use, useContext, useEffect, useMemo } from "react";
import withAuth from "@/hocs/withAuth";
import { Flex, Layout, Menu, Typography } from "antd";
import BookContext from "@/providers/bookProvider/context";
const { Content, Sider } = Layout;
import {useStyles} from "./styles";
import AuthContext from "@/providers/authProvider/context";
import Preferences from "@/components/preferences";
import History from "@/components/history";
import SearchResults from "@/components/searchResults";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Utils, { TokenProperies } from "@/utils";
import CategoryContext from "@/providers/categoryProvider/context";
import InventoryContext from "@/providers/inventoryProvider/context";
import AuthorsContext from "@/providers/authorsProvider/context";

const { Title } = Typography;

const Page = (): React.ReactNode => {
    const { userObj, authObj } = useContext(AuthContext);
    const { books, getAll: getAllBooks , searchDB } = useContext(BookContext);
    const { getAll } = useContext(InventoryContext);
    const { getAuthors } = useContext(AuthorsContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const { styles, cx } = useStyles();
    const { searchTerm } = useContext(BookContext);
    const { push } = useRouter();

    const user = useMemo(() => userObj, [userObj]);

    useEffect(() => {
        const decodedToken = Utils.decodedToken(authObj?.accessToken);
        const roleKey = `${TokenProperies.role}`;
        const isPatron = decodedToken[roleKey] === "Patron";
        if (authObj) {
            getAllBooks();
            getAll();
            getAuthors();
            getAllCategories();
        }
        if (isPatron) {
            push(`/patron`);
        } else {
            push(`/admin`);
        }
    }, []);

    return (
        <>
            <Flex align="center" justify="center" vertical style={{background: "#d0e1e1"}}>
                <Title level={2}>savvyshelf</Title>
                <Image src={"/assets/images/book-op.gif"} alt="book" width={350} height={350} />
            </Flex>
        </>
    );
    
}

export default withAuth(Page);