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
import AuthContext from "@/providers/AuthProvider/context";
import Preferences from "@/components/Preferences";
import History from "@/components/History";
import SearchResults from "@/components/SearchResults";

const Home = (): React.FC | React.ReactNode => {
    const { userObj, getUserInfo } = useContext(AuthContext);
    const { books } = useContext(BookContext);
    const { styles, cx } = useStyles();
    const { searchTerm } = useContext(BookContext);
    
    useEffect(() => {
        console.log("Home useEffect", userObj);
    }, [userObj]);


    const user = useMemo(() => {
        return userObj;
    }, [userObj]);

    return (
        <>   
            <Layout>
                <Sider width={"25%"} style={{background: "white"}}>
                    <Preferences />
                    <History />
                </Sider>
                <Sider style={{background: "white"}} className={cx(styles.right)} width={"75%"}>
                    <Content className={cx(styles.content)}>
                        <h1>Books</h1>     
                        <div>
                            <p>name: {user?.name}</p>
                            <p>surname: {user?.surname}</p>
                            <p>user id: {user?.id}</p>
                            <p>email: {user?.emailAddress}</p>
                            {/* <p>fullname: {fulluser?.fullName}</p>
                            <p>rolenames: {JSON.stringify(fulluser?.roleNames)}</p> */}
                        </div>
                        <SearchResults books={books} searchTerm={searchTerm} />
                    </Content>
                </Sider>
            </Layout>
        </>
    );
}

export default withAuth(Home);