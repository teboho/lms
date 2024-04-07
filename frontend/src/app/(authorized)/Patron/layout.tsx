'use client';

import { Layout as AntdLayout, Menu, MenuProps } from "antd";
import React, { useContext, useEffect, useMemo } from "react";
import { useStyles } from "./styles";
import Link from "next/link";
import withAuth from "@/hocs/withAuth";

const { Content, Sider } = AntdLayout;

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

const preferencesMenu: MenuItem[] = [
    getItem(<Link href={"/patron/preferences/"}>View Preferences</Link>, "patron-modify-preferences", undefined, undefined, undefined),
    getItem(<Link href={"/patron/preferences-survey/"}>Modify Preferences</Link>, "patron-preferences-survey", undefined, undefined, undefined)
];

const patronMenu: MenuItem[] = [
    getItem(<Link href={"/patron/"}>Patron</Link>, "patron", undefined, undefined, 'group'),
    getItem(<Link href={"/patron/categories/"}>Categories</Link>, "patron-categories", undefined, undefined, undefined),
    getItem(<Link href={"/patron/loans/"}>My Loans</Link>, "patron-myloans", undefined, undefined, undefined),
    getItem(<Link href={"/patron/payments/"}>Payments</Link>, "patron-payments", undefined, undefined, undefined),
    getItem("Preferences", "patron-preferences", undefined, preferencesMenu, "group"),
    getItem(<Link href="/patron/history">History</Link>, "patron-history", undefined, undefined, undefined),
];

const Layout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const { styles, cx } = useStyles();

    return (
        <AntdLayout>
            <Sider theme="light" className={cx(styles.right)} width={"25%"}>
                <Menu
                    items={patronMenu}
                    className={cx(styles.sticky)}
                />
            </Sider>
            <Sider theme="light" className={cx(styles.right, styles.padding)} width={"75%"}>
                {children}
            </Sider>
        </AntdLayout>
    );
}

export default withAuth(Layout);