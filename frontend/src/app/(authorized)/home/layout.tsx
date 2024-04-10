"use client";
import { Layout as AntdLayout, Menu } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import { useStyles } from "./styles";

const { Content, Sider } = AntdLayout;

const Layout = ({ children }: {
    children: React.ReactNode
}) => {
    const { styles, cx } = useStyles();
    const { push } = useRouter();

    const adminMenu = () => [
        <Menu.Item key="1" onClick={() => push("/")}>Admin</Menu.Item>,
        <Menu.Item key="4" onClick={() => push("/categories")}>Categories</Menu.Item>,
        <Menu.Item key="5" onClick={() => push("/inventory")}>Inventory</Menu.Item>,
        <Menu.Item key="6" onClick={() => push("/loans")}>Loans</Menu.Item>,
    ];

    return (        
        <AntdLayout>
            <Sider style={{background: "white"}} className={cx(styles.right)} width={"100%"}>
                <Content className={cx(styles.content)}>
                    {children}  
                </Content>
            </Sider>
        </AntdLayout>
    );
}

export default Layout;