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
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
}

const patronMenu: MenuItem[] = [
    getItem(<Link href={"/Patron/"}>Patron</Link>, 1, undefined, undefined, 'group'),
    getItem(<Link href={"/Patron/Categories/"}>Categories</Link>, 4, undefined, undefined, undefined),
    getItem(<Link href={"/Patron/Inventory/"}>Inventory</Link>, 5, undefined, undefined, undefined),
    getItem(<Link href={"/Patron/MyLoans/"}>MyLoans</Link>, 6, undefined, undefined, undefined),
    getItem(<Link href={"/Patron/Payments/"}>Payments</Link>, 6, undefined, undefined, undefined),
];

const PatronLayout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const { styles, cx } = useStyles();

    return (
        <Layout>
            <Sider style={{background: "white"}} className={cx(styles.right)} width={"25%"}>
                <Menu
                    items={patronMenu}
                    className={cx(styles.sticky)}
                />
            </Sider>
            <Sider style={{background: "white"}} className={cx(styles.right)} width={"75%"}>
                {children}
            </Sider>
        </Layout>
    );
    
}

export default withAuth(PatronLayout);