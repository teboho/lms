'use client';
import React, { useContext, useEffect, useState } from "react";
import { Flex, Input, Button, Drawer, Avatar, App, Form, Upload } from "antd";
import type { DrawerProps, MenuProps } from "antd";
import  { useStyles } from "./styles";
import { SearchProps } from "antd/es/input";
import Link from "next/link";
import Image from "next/image";
import AuthContext from "@/providers/authProvider/context";
import BookContext from "@/providers/bookProvider/context";
import { UploadOutlined, UserOutlined } from "@ant-design/icons";
import 'remixicon/fonts/remixicon.css'
import Utils, { TokenProperies } from "@/utils";
import { useRouter, usePathname } from "next/navigation";
import { makeAxiosInstance } from "@/providers/authProvider";
import { useStoredFileActions, useStoreFileState } from "@/providers/storedFileProvider";

const outItems: MenuProps['items'] = [
    {
        label: <Link href={"/"}>Home</Link>, 
        key: 'home',
        icon: <Image src="/assets/images/LMS-hq.png" width={30} height={30} alt="logo"/>
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

const NavBar = (): React.ReactNode => {
    const { logout, userObj, authObj } = useContext(AuthContext);
    const { getStoredFiles, getBridgeByUser, postUserFile, getStoredFile } = useStoredFileActions();
    const { userFile } = useStoreFileState();
    const { styles, cx } = useStyles();
    const [searchTerm, setSearchTerm] = useState("");
    const { searchDB } = useContext(BookContext);
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { push } = useRouter();
    const {modal} = App.useApp();
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);

    const instance = makeAxiosInstance();
  
    useEffect(() => {
        if (userFile) {
            console.log("userFile...", userFile);
            getStoredFiles();
        }
    }, []);

    useEffect(() => {
        console.log("user is", authObj);

        if (authObj && authObj.userId) {
            getBridgeByUser(authObj.userId);
        }
    }, [authObj]);

    useEffect(() => {
        if (userFile) {
            console.log("userFile...", userFile);
            getStoredFiles();
        }
    }, [userFile]);

    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
  
    function handleSearch(term:string) {
        setSearchTerm(prev => term);
    }

    function showModal() {
        const props = {
            onRemove: file => {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                setFileList(newFileList);
            },
            beforeUpload: file => {
                setFileList([...fileList, file]);
                return false;
            },
            fileList
        }

        const handleUpload = () => {
            const formData = new FormData();
            fileList.forEach(file => {
                formData.append('file', file);
            });
            setUploading(true);
            // axios formData upload
            instance.post("/Upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => {
                const { data } = response;
                if (!data?.success) {
                    modal.error({
                        content: 'File upload failed',
                    });
                    setUploading(false);
                    throw new Error("File upload failed");
                }
                
                console.log("file uploaded successfully");
                console.log(data);
                const id = data?.result.id;
                console.log("updating profile picture...");
                const userFile = {
                    fileId: id,
                    userId: userObj?.id,
                }                
                modal.success({
                    content: 'File uploaded successfully',
                });
                setFileList([]);
                setUploading(false);
                return userFile;
            })
            .then((userFile) => {
                postUserFile(userFile);
                console.log("userFile", userFile);
            })
            .catch(() => {
                modal.error({
                    content: 'File upload failed',
                });
                setUploading(false);
            });
        }

        const MyUpload = () => (
            <>
                <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{
                    marginTop: 16,
                }}>
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>
            </>
        );

        // show modal to upload profile picture
        modal.confirm({
            title: "Upload profile picture",
            content: <MyUpload />,
            onOk() {
                console.log("ok");
            },
            onCancel() {
                console.log("cancel");
            }
        });
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
                        <Flex vertical justify="center" align="center">
                            <div>
                                {
                                userFile?.fileId ? <img src={`${encodeURI(`https://localhost:44311/GetStoredFile/${userFile.fileId}`)}`} width={64} height={64} alt="profile" />
                                :
                                <Avatar src={userFile?.fileId && `/GetStoredFile/${userFile.fileId}`} size={64} icon={<UserOutlined />} onClick={showModal} /> 
                                }
                            </div>
                            <div>
                                <p><i style={{width: 30, height: 30}} className="ri-profile-fill"></i> {userObj?.fullName}</p>
                                <p><i className="ri-mail-line"></i> {userObj?.emailAddress}</p>
                                <p><i className="ri-safe-line"></i> {userObj?.roleNames[0]}</p>
                            </div>
                            <hr />
                            <Button onClick={logout}>Logout</Button>
                        </Flex>
                    </Drawer>
                </span>
            </Flex>
        );
    }

    return null;
}

export default NavBar;

function onOk(): any {
    throw new Error("Function not implemented.");
}
