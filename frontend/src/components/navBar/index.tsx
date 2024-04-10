'use client';
import React, { useContext, useMemo, useState } from "react";
import { Flex, Input, Button, Drawer, Avatar } from "antd";
import type { DrawerProps, MenuProps } from "antd";
import  { useStyles } from "./styles";
import { SearchProps } from "antd/es/input";
import Link from "next/link";
import Image from "next/image";
import AuthContext from "@/providers/authProvider/context";
import BookContext from "@/providers/bookProvider/context";
import { UserOutlined } from "@ant-design/icons";
import 'remixicon/fonts/remixicon.css'
import Utils, { TokenProperies } from "@/utils";
import { useRouter, usePathname } from "next/navigation";


const outItems: MenuProps['items'] = [
    {
        label: <Link href={"/"}>Home</Link>, 
        key: 'home',
        icon: <Image src="/assets/images/LMS-logo1-transparent.png" width={30} height={30} alt="logo"/>
    },
    {
        label: <Link href={"/login"}>Login</Link>,
        key: 'login'
    },
    {
        label: <Link href={"/register"}>Register</Link>,
        key: 'register'
    }
];

const { Search } = Input;

const NavBar: React.FC = () => {
    const { logout, userObj } = useContext(AuthContext);
    const { styles, cx } = useStyles();
    const [searchTerm, setSearchTerm] = useState("");
    const user = useMemo(() => userObj, [userObj]);
    const { searchDB } = useContext(BookContext);
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { push } = useRouter();
  
    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
  
    function handleSearch(term:string) {
        setSearchTerm(prev => term);
    }

    function isPatron() {
        return user?.roleNames?.includes("PATRON");
    }

    const accessToken = localStorage.getItem("accessToken");
    const onSearch: SearchProps["onSearch"] = (value, _e, info) => {       
        const decodedToken = Utils.decodedToken();
        const roleKey = `${TokenProperies.role}`;
        const isPatron = decodedToken[roleKey] === "Patron";

        if (pathname === "/patron" || pathname === "/admin") {
            console.log("searching for...", value, "in", pathname);
            searchDB(value);
        } else{
            if (isPatron) {
                push(`/patron?search=${searchTerm}`);
            } else {
                push(`/admin?search=${searchTerm}`);
            }
        }
    }

    if (accessToken) {
        const inItems: MenuProps['items'] = [
            {
                label: <Link href={"/"}></Link>, 
                key: 'home',
                icon: <Avatar src="/assets/images/LMS-hq.png" size={"large"} alt="logo"/>
            }
        ];

        return (
            <Flex style={{ background: "#d0e1e1", marginLeft: 0, paddingLeft: 20, paddingRight: 20, width: "95vw", height: 60 }} className={cx(styles.flex, styles.sticky)} justify="space-between" align="center">
                <div style={{paddingTop: 20}}><Link href={"/"}><Image src={"/assets/images/LMS-hq.png"} width={50} height={50} alt="logo"/></Link></div>
                <Search 
                    className={cx(styles.search)} 
                    placeholder="Search" 
                    onChange={e => handleSearch(e.target.value)} 
                    onSearch={onSearch} 
                />
                <span>
                    <Button style={{borderRadius: "50%"}} onClick={showDrawer} icon={<UserOutlined />}></Button>
                    <Drawer
                        title="Profile information"
                        placement={"right" as DrawerProps["placement"]}
                        closable={false}
                        onClose={onClose}
                        open={open}
                        key={"right"}
                        style={{
                            background: "#d0e1e1"
                        }}
                    >
                        {/* Show user information */}
                        <p>{user?.fullName}</p>
                        <p>{user?.emailAddress}</p>
                        <p>{user?.roleNames[0]}</p>
                        <hr />
                        <Button onClick={logout}>Logout</Button>
                    </Drawer>
                </span>
            </Flex>
        );
    }

    return null;
}

export default NavBar;