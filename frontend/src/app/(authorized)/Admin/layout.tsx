'use client';

import React from "react";
import  { ErrorBoundary } from "react-error-boundary";
import { Layout, Menu, MenuProps } from "antd";
import { useStyles } from "./styles";
import Link from "next/link";
import withAuth from "@/hocs/withAuth";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
}

const inventoryMenu: MenuItem[] = [
    getItem(<Link href={"/admin/inventory/"}>Inventory</Link>, "admin-inventory", undefined, undefined, undefined),
    getItem(<Link href={"/admin/addbook/"}>Add New Book</Link>, "admin-addbook", undefined, undefined, undefined),
];

const categoryMenu: MenuItem[] = [
    getItem(<Link href={"/admin/categories/"}>Categories</Link>, "admin-categories", undefined, undefined, undefined),
    // getItem(<Link href={"/admin/addCategory/"}>Add New Category</Link>, "admin-addcategory", undefined, undefined, undefined),
];

const loanMenu: MenuItem[] = [
    getItem(<Link href={"/admin/loans/"}>Loans</Link>, "admin-loans", undefined, undefined, undefined),
    // getItem(<Link href={"/admin/finishedLoans/"}>Finished Loans</Link>, "admin-finishedloans", undefined, undefined, undefined),
];

const paymentsMenu: MenuItem[] = [
    getItem(<Link href={"/admin/payments/"}>Payments</Link>, "admin-payments", undefined, undefined, undefined),
]

const adminMenu: MenuItem[] = [
    getItem(<Link href="/admin">Admin</Link>, "admin", undefined, undefined, 'group'),
    getItem("Categories", "categories", undefined, categoryMenu, 'group'),
    getItem("Inventory", "inventory", undefined, inventoryMenu, 'group'),
    getItem("Payments", "payments", undefined, paymentsMenu, 'group'),
    getItem("Loans", "loans", undefined, loanMenu, 'group')
    ,
];

const AdminLayout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const { styles, cx } = useStyles();   

    return (
        <Layout>
            <Sider style={{background: "white"}} className={cx(styles.right)} width={"25%"}>
                <Menu
                    items={adminMenu}
                    className={cx(styles.sticky)}
                    mode="inline"
                />
            </Sider>
            <ErrorBoundary fallback={<h1>Sth is wrong</h1>}>
                <Content className={cx(styles.content)}>
                    {children}
                </Content>
            </ErrorBoundary>
        </Layout>
    );
    
}

export default withAuth(AdminLayout);