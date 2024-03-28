'use client';
import React, { useContext, useReducer, useState } from "react";
import { Flex, Layout, Input, Button } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import Menu from "antd/lib/menu/menu";
import styles from './NavBar.module.css';
import  { useStyles } from './styles';
import { SearchProps } from "antd/es/input";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import AuthContext from "@/providers/AuthProvider/context";
import BookContext from "@/providers/BookProvider/context";
import { setSearchTermAction } from "@/providers/BookProvider/actions";
import { bookReducer } from "@/providers/BookProvider/reducer";

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
    const { logout } = useContext(AuthContext);
    const { styles, cx } = useStyles();
    const [searchTerm, setSearchTerm] = useState("");
    
    const { search } = useContext(BookContext);

    function handleSearch(term:string) {
        setSearchTerm(prev => term);
    }

    const accessToken = localStorage.getItem("accessToken");
    const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
        console.log(searchTerm);

        search(searchTerm);
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

        return (
            <Flex className={cx(styles.flex)} justify="center" align="center">
                {/* <Link href={"/"}><Image src="/assets/images/LMS-logo1-transparent.png" width={30} height={30} alt="logo"/></Link> */}
                <Menu 
                    mode="horizontal"
                    items={inItems}
                />
                <Search className={cx(styles.search)} 
                    placeholder="search for book" onChange={e => handleSearch(e.target.value)} 
                    onSearch={onSearch} />
                <Button onClick={() => { logout(); }}>Logout</Button>
            </Flex>
        );
    }

    return <Menu mode="horizontal" items={outItems} />;
}

export default NavBar;