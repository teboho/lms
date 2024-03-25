"use client";
import { ReactNode, useContext, useEffect, useMemo } from "react";
import withAuth from "@/hocs/withAuth";
import { SessionContext } from "@/providers/SessionProvider/context";
import { Flex, Layout, Input } from "antd";
import type { SearchProps } from "antd/es/input";
const { Content, Sider } = Layout;
const { Search } = Input;


const Home = ({ searchParams } : { searchParams: { query?: string; page?: string;} }): ReactNode => {
    const { getInfo, sessionState } = useContext(SessionContext);

    useEffect(() => {
        getInfo();
    }, []);

    const user = useMemo(() => {
        return sessionState.user;
    }, [sessionState]);
    
    return (
        <>   
            <Layout>
              <Flex>
                <Sider style={{background: "white"}}>
                    {/* <h1>Succesfully logged in as {JSON.stringify(user)}</h1> */}
                    <p>name: {user?.name}</p>
                    <p>surname: {user?.surname}</p>
                    <p>user id: {user?.id}</p>
                    <p>email: {user?.emailAddress}</p>
                </Sider>
                <Content>
                    <h1>Books</h1>     
                    <div>
                    </div>           
                </Content>
              </Flex>
            </Layout>

        </>
    );
}

export default withAuth(Home);