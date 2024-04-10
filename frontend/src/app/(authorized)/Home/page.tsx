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

const { Title } = Typography;

const Page = (): React.ReactNode => {
    const { userObj } = useContext(AuthContext);
    const { books } = useContext(BookContext);
    const { styles, cx } = useStyles();
    const { searchTerm } = useContext(BookContext);
    const { push } = useRouter();

    useEffect(() => {
        if (searchTerm) {
            push("/");
        }
    }, [userObj]);

    const user = useMemo(() => userObj, [userObj]);
    
    if (user?.roleNames?.includes("ADMIN")) {
        push("/admin");
    }   
    else if (user?.roleNames?.includes("PATRON")) {
        push("/patron");
    } 
    else {
        return (
            <>
                <Title level={2}>savvyshelf</Title>
                <Flex align="center" justify="center" style={{background: "#d0e1e1"}}>
                    <Image src={"/assets/images/book-op.gif"} alt="book" width={350} height={350} />
                </Flex>
            </>
        );
    }
}

export default withAuth(Page);