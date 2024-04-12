'use client';

import React from "react";
import  { ErrorBoundary } from "react-error-boundary";
import { Layout, Menu, MenuProps } from "antd";
import { useStyles } from "./styles";
import Link from "next/link";
import withAuth from "@/hocs/withAuth";
import { DatabaseOutlined } from "@ant-design/icons";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

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
      onClick: () => {}
    } as MenuItem;
}

const inventoryMenu: MenuItem[] = [
    getItem(<Link href={"/admin/inventory/"}>Inventory</Link>, "admin-inventory", <i className="ri-database-2-line"></i>, undefined, undefined),
    getItem(<Link href={"/admin/addbook/"}>Add New Book</Link>, "admin-addbook", <i className="ri-add-box-line"></i>, undefined, undefined),
];

const categoryMenu: MenuItem[] = [
    getItem(<Link href={"/admin/categories/"}>Categories</Link>, "admin-categories", <DatabaseOutlined />, undefined, undefined),
    // getItem(<Link href={"/admin/addCategory/"}>Add New Category</Link>, "admin-addcategory", undefined, undefined, undefined),
];

const loanMenu: MenuItem[] = [
    getItem(<Link href={"/admin/loans/"}>Loans</Link>, "admin-loans", <i className="ri-bill-line"></i>, undefined, undefined),
    // getItem(<Link href={"/admin/finishedLoans/"}>Finished Loans</Link>, "admin-finishedloans", undefined, undefined, undefined),
];

const paymentsMenu: MenuItem[] = [
    getItem(<Link href={"/admin/payments/"}>Payments</Link>, "admin-payments", undefined, undefined, undefined),
]

const adminMenu: MenuItem[] = [
    // getItem(<Link href="/admin">Admin</Link>, "admin", undefined, undefined, 'group'),
    getItem("Categories", "categories", undefined, categoryMenu, 'group'),
    getItem("Inventory", "inventory", undefined, inventoryMenu, 'group'),
    // getItem("Payments", "payments", undefined, paymentsMenu, 'group'),
    getItem("Loans", "loans", undefined, loanMenu, 'group')
    ,
];

const AdminLayout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const { styles, cx } = useStyles();   

    return (
        <Layout>
            <Sider style={{background: "#d0e1e1"}} className={cx(styles.sticky, styles.right)} width={"250"}>
                <Menu
                    onClick={() => {}}
                    items={adminMenu}
                    className={cx(styles.sticky, styles.bgblue)}
                    mode="inline"
                />
            </Sider>
            <ErrorBoundary fallback={<h1>Something is wrong with the admin content</h1>}>
                <Content className={cx(styles.content)}>
                    {children}
                </Content>
            </ErrorBoundary>
        </Layout>
    );
    
}

export default withAuth(AdminLayout);