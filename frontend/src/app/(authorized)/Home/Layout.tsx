import { Layout, Menu } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import { useStyles } from "./styles";

const { Content, Sider } = Layout;


const HomeLayout = ({ children }: {
    children: React.ReactNode
}) => {
    const { styles, cx } = useStyles();
    const { push } = useRouter();

    const adminMenu = () => [
        <Menu.Item key="1" onClick={() => push("/")}>Admin</Menu.Item>,
        <Menu.Item key="4" onClick={() => push("/Categories")}>Categories</Menu.Item>,
        <Menu.Item key="5" onClick={() => push("/Inventory")}>Inventory</Menu.Item>,
        <Menu.Item key="6" onClick={() => push("/Loans")}>Loans</Menu.Item>,
    ];

    return (        
        <Layout>
            <Sider width={"25%"} className={cx(styles.border, styles.bgwhite)}>
                {/* vertical ant ANtd menu with options ...*/}
                <Menu 
                    items={adminMenu()}
                />
            </Sider>
            <Sider style={{background: "white"}} className={cx(styles.right)} width={"75%"}>
                <Content className={cx(styles.content)}>
                    {children}  
                </Content>
            </Sider>
        </Layout>
    );
}