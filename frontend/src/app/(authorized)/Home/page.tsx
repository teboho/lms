"use client";
import { useContext, useEffect, useMemo } from "react";
import withAuth from "@/hocs/withAuth";
import { Layout, Menu } from "antd";
import BookContext from "@/providers/bookProvider/context";
const { Content, Sider } = Layout;
import {useStyles} from "./styles";
import AuthContext from "@/providers/authProvider/context";
import Preferences from "@/components/preferences";
import History from "@/components/history";
import SearchResults from "@/components/searchResults";
import { useRouter } from "next/navigation";

const Page = (): React.ReactNode => {
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
            push("/admin");
        } else {
            push("/patron");
        }
    }, [user]);

    // need to check which kind of user is logged in
    if (user?.roleNames?.includes("ADMIN")) {
        return (
            <>   
                {/* <Layout>
                    <Sider width={"25%"} className={cx(styles.border, styles.bgwhite)}>
                        <Menu>
                            <Menu.Item key="1" onClick={() => push("/")}>Admin</Menu.Item>
                            <Menu.Item key="4" onClick={() => push("/categories")}>Categories</Menu.Item>
                            <Menu.Item key="5" onClick={() => push("/inventory")}>Inventory</Menu.Item>
                            <Menu.Item key="6" onClick={() => push("/loans")}>Loans</Menu.Item>
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
                            <h1>Inventory</h1>
                        </Content>
                    </Sider>
                </Layout> */}
                <h1>Admin</h1>
            </>
        );
    }   

    return (
        <>   
            {/* <Layout>
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
                        </div>
                        <SearchResults books={books} searchTerm={searchTerm} />
                    </Content>
                </Sider>
            </Layout> */}
            <h1>Patron</h1>
        </>
    );
}

export default withAuth(Page);