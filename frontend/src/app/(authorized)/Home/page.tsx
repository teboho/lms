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

const Home = ({ searchParams } : { searchParams: { query?: string; page?: string;} }): ReactNode => {
    const { getInfo, sessionState } = useContext(SessionContext);
    const { bookState, search } = useContext(BookContext);
    const { styles, cx } = useStyles();


    useEffect(() => {
        getInfo();
    }, []);

    const user = useMemo(() => {
        return sessionState.user;
    }, [sessionState]);
    
    // use memo to get the values from the state
    useEffect(() => {
        console.log(bookState.results)
        // return results;
    }, [bookState]);

    return (
        <>   
            <Layout>
                <Sider width={"25%"} style={{background: "white"}}>
                    <p>name: {user?.name}</p>
                    <p>surname: {user?.surname}</p>
                    <p>user id: {user?.id}</p>
                    <p>email: {user?.emailAddress}</p>
                </Sider>
                <Sider style={{background: "white"}} className={cx(styles.right)} width={"75%"}>
                    <Content className={cx(styles.content)}>
                        <h1>Books</h1>     
                        
                        <List
                            className={cx(styles.list)}
                            dataSource={bookState.results}
                            renderItem={(item, index) => (
                                <List.Item key={`result_${index}`}
                                    extra={
                                        <img src={`${item.imageURL}`} width={250} height={250} alt="book image"/>
                                    }
                                >
                                    <List.Item.Meta 
                                        title={item.name}
                                        description={item.description}
                                    />
                                </List.Item>
                            )}
                        />
                    </Content>
                </Sider>
            </Layout>

        </>
    );
}

export default withAuth(Home);