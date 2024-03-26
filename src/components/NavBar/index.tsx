'use client';
import React, { useContext, useState } from "react";
import { Flex, Layout, Input, Button } from "antd";
import type { MenuProps } from "antd";
import Menu from "antd/lib/menu/menu";
import styles from './NavBar.module.css';
import  { useStyles } from './styles';
import { SearchProps } from "antd/es/input";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { AuthContext } from "@/providers/AuthProvider/context";
import { BookContext } from "@/providers/BookProvider/context";

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

export default function NavBar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const accessToken = localStorage.getItem("accessToken");
    const { logout } = useContext(AuthContext);
    const { styles, cx } = useStyles();
    const [searchTerm, setSearchTerm] = useState("");
    
    const { bookState, search } = useContext(BookContext);

    function handleSearch(term:string) {
        setSearchTerm(prev => term);
    }

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
                <Button onClick={logout}>Logout</Button>
            </Flex>
        );
    }

    return <Menu mode="horizontal" items={outItems} />;
}