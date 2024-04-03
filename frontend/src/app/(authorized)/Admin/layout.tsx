'use client';

import { Layout, Menu, MenuProps } from "antd";
import React, { useContext, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useStyles } from "./styles";
import AuthContext from "@/providers/AuthProvider/context";
import BookContext from "@/providers/BookProvider/context";
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
    getItem(<Link href={"/Admin/Inventory/"}>Inventory</Link>, 1, undefined, undefined, undefined),
    getItem(<Link href={"/Admin/AddBook/"}>Add New Book</Link>, 1, undefined, undefined, undefined),
];

const categoryMenu: MenuItem[] = [
    getItem(<Link href={"/Admin/Categories/"}>Categories</Link>, 1, undefined, undefined, undefined),
    getItem(<Link href={"/Admin/AddCategory/"}>Add New Category</Link>, 1, undefined, undefined, undefined),
];

const loanMenu: MenuItem[] = [
    getItem(<Link href={"/Admin/Loans/"}>Loans</Link>, 1, undefined, undefined, undefined),
    getItem(<Link href={"/Admin/FinishedLoans/"}>Finished Loans</Link>, 1, undefined, undefined, undefined),
];

const paymentsMenu: MenuItem[] = [
    getItem(<Link href={"/Admin/Payments/"}>Payments</Link>, 1, undefined, undefined, undefined),
]

const adminMenu: MenuItem[] = [
    getItem(<Link href="/Admin">Admin</Link>, 1, undefined, undefined, 'group'),
    getItem("Categories", 4, undefined, categoryMenu, 'group'),
    getItem("Inventory", 5, undefined, inventoryMenu, 'group'),
    getItem("Payments", 6, undefined, paymentsMenu, 'group'),
    getItem("Loans", 6, undefined, loanMenu, 'group')
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
            <Sider style={{background: "white"}} className={cx(styles.right)} width={"75%"}>
                {children}
            </Sider>
        </Layout>
    );
    
}

export default withAuth(AdminLayout);