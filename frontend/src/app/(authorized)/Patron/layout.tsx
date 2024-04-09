'use client';

import { Layout as AntdLayout, Menu, MenuProps } from "antd";
import React from "react";
import { useStyles } from "./styles";
import Link from "next/link";
import withAuth from "@/hocs/withAuth";
import { DatabaseOutlined } from "@ant-design/icons";
import 'remixicon/fonts/remixicon.css'

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
      onclick
    } as MenuItem;
}

// number 3 is icon
const preferencesMenu: MenuItem[] = [
    getItem(<Link href={"/patron/preferences/"}>View Preferences</Link>, "patron-modify-preferences", <i className="ri-settings-line"></i>, undefined, undefined),
    getItem(<Link href={"/patron/preferences-survey/"}>Modify Preferences</Link>, "patron-preferences-survey", <i className="ri-settings-6-line"></i>, undefined, undefined)
];

const patronMenu: MenuItem[] = [
    // getItem(<Link href={"/patron/"}>Patron</Link>, "patron", undefined, undefined, 'group'),
    getItem(<Link href={"/patron/categories/"}>Categories</Link>, "patron-categories", <DatabaseOutlined />, undefined, undefined),
    getItem(<Link href={"/patron/loans/"}>My Loans</Link>, "patron-myloans", <i className="ri-bill-line"></i>, undefined, undefined),
    // getItem(<Link href={"/patron/payments/"}>Payments</Link>, "patron-payments", undefined, undefined, undefined),
    getItem("Preferences", "patron-preferences", undefined, preferencesMenu, "group"),
    getItem(<Link href="/patron/history">History</Link>, "patron-history", <i className="ri-history-fill"></i>, undefined, undefined),
];

const Layout = ({ children }: { children: React.ReactNode }): React.ReactNode => {
    const { styles, cx } = useStyles();

    return (
        <AntdLayout>
            <Sider theme="light" style={{ background: "rgb(245, 245, 245)"}} className={cx(styles.sticky, styles.left)} width={"250"}>
                <Menu
                    onClick={() => {}}
                    items={patronMenu}
                    className={cx(styles.sticky, styles["left-menu"])}
                />
            </Sider>
            <AntdLayout className={cx(styles.right, styles.padding)}>
                {children}
            </AntdLayout>
        </AntdLayout>
    );
}

export default withAuth(Layout);