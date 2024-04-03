'use client';
import React, { useContext, useMemo, useReducer, useState } from "react";
import { Flex, Layout, Input, Button } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import Menu from "antd/lib/menu/menu";
import style from './NavBar.module.css';
import  { useStyles } from './styles';
import { SearchProps } from "antd/es/input";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import AuthContext from "@/providers/AuthProvider/context";
import BookContext from "@/providers/BookProvider/context";

const outItems: MenuProps['items'] = [
    {
        label: <Link href={"/"}>Home</Link>, 
        key: 'home',
        icon: <Image src="/assets/images/LMS-logo1-transparent.png" width={30} height={30} alt="logo"/>
    },
    {
        label: <Link href={"/Login"}>Login</Link>,
        key: 'login'
    },
    {
        label: <Link href={"/Register"}>Register</Link>,
        key: 'register'
    }
];

const { Search } = Input;

const NavBar: React.FC = () => {
    const { replace } = useRouter();
    const { logout, userObj } = useContext(AuthContext);
    const { styles, cx } = useStyles();
    const [searchTerm, setSearchTerm] = useState("");
    
    const { searchDB } = useContext(BookContext);

    const user = useMemo(() => userObj, [userObj]);

    function handleSearch(term:string) {
        setSearchTerm(prev => term);
    }

    function isPatron() {
        return user?.roleNames?.includes("PATRON");
    }

    const accessToken = localStorage.getItem("accessToken");
    const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
        console.log(searchTerm);

        searchDB(searchTerm);
    }

    if (accessToken) {
        const inItems: MenuProps['items'] = [
            {
                label: <Link href={"/"}>Home</Link>, 
                key: 'home',
                icon: <Image src="/assets/images/LMS-logo1-transparent.png" width={30} height={30} alt="logo"/>
            },
            {
                label: <Link href={"/Survey"}>Survey</Link>, 
                key: 'survey',
                icon: <DatabaseOutlined />
            },
            {
                label: <Link href={"/AllBooks"}>View All Books</Link>, 
                key: 'allbooks',
                icon: <DatabaseOutlined />
            }
        ];

        const inAdminItems: MenuProps['items'] = [
            {
                label: <Link href={"/"}>Home</Link>, 
                key: 'home',
                icon: <Image src="/assets/images/LMS-logo1-transparent.png" width={30} height={30} alt="logo"/>
            },
        ];

        return (
            <Flex className={cx(styles.flex, styles.sticky)} justify="space-between" align="center">
                <Menu 
                    mode="horizontal"
                    items={isPatron() ? inItems : inAdminItems}
                />
                <Search 
                    className={cx(styles.search)} 
                    placeholder="search for book" 
                    onChange={e => handleSearch(e.target.value)} 
                    onSearch={onSearch} 
                />
                <Button onClick={logout}>Logout</Button>
            </Flex>
        );
    }

    return <Menu mode="horizontal" items={outItems} className={cx(styles.sticky)} />;
}

export default NavBar;