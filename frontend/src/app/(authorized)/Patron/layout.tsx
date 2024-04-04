'use client';

import { Layout, Menu, MenuProps } from "antd";
import React, { useContext, useEffect, useMemo } from "react";
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
    getItem(<Link href={"/patron/"}>Patron</Link>, "patron", undefined, undefined, 'group'),
    getItem(<Link href={"/patron/categories/"}>Categories</Link>, "patron-categories", undefined, undefined, undefined),
    getItem(<Link href={"/patron/loans/"}>My Loans</Link>, "patron-myloans", undefined, undefined, undefined),
    getItem(<Link href={"/patron/payments/"}>Payments</Link>, "patron-payments", undefined, undefined, undefined),
    getItem("Preferences", "patron-preferences", undefined, undefined, undefined),
    getItem("History", "patron-history", undefined, undefined, undefined),
];

const PatronLayout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const { styles, cx } = useStyles();

    return (
        <Layout>
            <Sider theme="light" className={cx(styles.right)} width={"25%"}>
                <Menu
                    items={patronMenu}
                    className={cx(styles.sticky)}
                />
            </Sider>
            <Sider theme="light" className={cx(styles.right)} width={"75%"}>
                {children}
            </Sider>
        </Layout>
    );
    
}

export default withAuth(PatronLayout);