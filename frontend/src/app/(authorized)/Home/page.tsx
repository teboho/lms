"use client";
import { ReactNode, use, useContext, useEffect, useMemo } from "react";
import withAuth from "@/hocs/withAuth";
import { Layout, Input, List, Typography, Menu } from "antd";
import BookContext from "@/providers/BookProvider/context";
const { Content, Sider } = Layout;
import Image from "next/image";
import {useStyles} from "./styles";
import AuthContext from "@/providers/AuthProvider/context";
import Preferences from "@/components/Preferences";
import History from "@/components/History";
import SearchResults from "@/components/SearchResults";
import { useRouter } from "next/navigation";

const Home = (): React.FC | React.ReactNode => {
    const { userObj } = useContext(AuthContext);
    const { books } = useContext(BookContext);
    const { styles, cx } = useStyles();
    const { searchTerm } = useContext(BookContext);
    const { push } = useRouter();
    
    useEffect(() => {
        console.log("Home useEffect", userObj);        
    }, [userObj]);

    const user = useMemo(() => userObj, [userObj]);

    // if user is admin, show admin page
    useEffect(() => {
        if (user?.roleNames?.includes("ADMIN") || user?.roleNames?.includes("ASSISTANT") || user?.roleNames?.includes("Admin") || user?.roleNames?.includes("Assistant")) {
            push("/Admin");
        } else {
            push("/Patron");
        }
    }, [user]);

    // need to check which kind of user is logged in
    if (user?.roleNames?.includes("ADMIN")) {
        return (
            <>   
                <Layout>
                    <Sider width={"25%"} className={cx(styles.border, styles.bgwhite)}>
                        {/* vertical ant ANtd menu with options ...*/}
                        <Menu>
                            <Menu.Item key="1" onClick={() => push("/")}>Admin</Menu.Item>
                            {/* <Menu.Item key="2" onClick={() => redirect("/admin/users")}>Users</Menu.Item> */}
                            {/* <Menu.Item key="3" onClick={() => redirect("/admin/books")}>Books</Menu.Item> */}
                            <Menu.Item key="4" onClick={() => push("/Categories")}>Categories</Menu.Item>
                            <Menu.Item key="5" onClick={() => push("/Inventory")}>Inventory</Menu.Item>
                            <Menu.Item key="6" onClick={() => push("/Loans")}>Loans</Menu.Item>
                        </Menu>
                    </Sider>
                    <Sider style={{background: "white"}} className={cx(styles.right)} width={"75%"}>
                        <Content className={cx(styles.content)}>
                            <div>
                                <p>name: {user?.name}</p>
                                <p>surname: {user?.surname}</p>
                                <p>user id: {user?.id}</p>
                                <p>email: {user?.emailAddress}</p>
                            </div>
                            {/* Inventory */}
                            <h1>Inventory</h1>
                        </Content>
                    </Sider>
                </Layout>
            </>
        );
    }   

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