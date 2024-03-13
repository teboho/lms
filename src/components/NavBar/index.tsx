'use client'
import React from "react";
import type { MenuProps } from "antd";
import Menu from "antd/lib/menu/menu";
import Image from "next/image";
import styles from './NavBar.module.css';
import Link from "next/link";

const outItems: MenuProps['items'] = [
    {
        label: <Link href={"/"}><Image className={styles.image} src="/assets/images/LMS-logo1-transparent.png" width={30} height={30} alt="logo"/></Link>, 
        key: 'home-icon'
    },
    {
        label: <Link href={"/"}>Home</Link>, 
        key: 'home'
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

export default function NavBar() {

    return (
            <Menu 
                mode="horizontal"
                items={outItems}
                theme="light"
            />
    );
}