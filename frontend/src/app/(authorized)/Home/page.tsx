"use client";
import { ReactNode, useContext, useEffect, useMemo } from "react";
import withAuth from "@/hocs/withAuth";
import { SessionContext } from "@/providers/SessionProvider/context";
import { Flex, Layout, Input, List, Typography } from "antd";
import type { SearchProps } from "antd/es/input";
import { BookContext } from "@/providers/BookProvider/context";
const { Content, Sider } = Layout;
const { Search } = Input;
import Image from "next/image";
import {useStyles} from "./styles";
import Preferences from "@/components/Preferences";
import History from "@/components/History";
import { UserContext } from "@/providers/UserProvider/context";
import Book from "@/components/Book";
import SearchResults from "@/components/SearchResults";

const Home = ({ searchParams } : { searchParams: { query?: string; page?: string;} }): React.FC | React.ReactNode => {
    const { getInfo, sessionState } = useContext(SessionContext);
    const { getUserProfile, userState } = useContext(UserContext);
    const { bookState, search } = useContext(BookContext);
    const { styles, cx } = useStyles();

    useEffect(() => {
        getInfo();
    }, []);

    const user = useMemo(() => {
        return sessionState.user;
    }, [sessionState]);

    useEffect(() => {
        getUserProfile(user?.id);
    }, [sessionState]);

    const fulluser = useMemo(() => {
        console.log(userState.user);
        return userState.user;
    }, [userState]);

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
                            <p>fullname: {fulluser?.fullName}</p>
                            <p>rolenames: {JSON.stringify(fulluser?.roleNames)}</p>
                        </div>
                        <SearchResults books={bookState.results} searchTerm="..." />
                        <List
                            className={cx(styles.list)}
                            dataSource={bookState.results}
                            renderItem={(item, index) => (
                                // <List.Item key={`result_${index}`}
                                //     extra={
                                //         <img src={`${item.imageURL}`} width={250} height={250} alt="book image"/>
                                //     }
                                // >
                                //     <List.Item.Meta 
                                //         title={item.name}
                                //         description={item.description}
                                //     />
                                // </List.Item>
                                <Book book={item} />
                            )}
                        />
                    </Content>
                </Sider>
            </Layout>

        </>
    );
}

export default withAuth(Home);