"use client";
import React, { MouseEvent, useContext, useEffect } from "react";
import { useMainStyles } from "./style";
import { Layout, Flex, Form, Input, Button, Row, Col, Tag, Typography, message } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import moduleStyles from "./register.module.css";
import AuthContext, { AUTH_REQUEST_TYPE } from "@/providers/authProvider/context";
import { useRouter } from "next/navigation";
import { stat } from "fs";
import Link from "next/link";
import Image from "next/image";

// Can contain an array of strings or array of numbers
const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
    prefix: string | number | (string | number)[],
    children: React.ReactNode
}

/**
 * 
 * @param str the data we need to confirm whether or not is an array
 * @returns an array
 */
function toArr(str: string | number | (string | number)[]): (string | number)[] {
    return Array.isArray(str) ? str : [str];
}

/**
 * A component to hold a form group, e.g. label and input
 * @param param0 an object containing the children and the prefix before the children
 */
const MyFormItemGroup = ({ prefix, children }: MyFormItemGroupProps) => {
    const prefixPath = React.useContext(MyFormItemContext); // an empty array...line 9
    const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefix, prefixPath]);

    return (
        <MyFormItemContext.Provider value={concatPath}>
            {children}
        </MyFormItemContext.Provider>
    );
}
interface MyFormItemProps extends MyFormItemGroupProps {
    name?: string;
    label?: string;
}
const MyFormItem = ({ name, ...props }: MyFormItemProps) => {
    const prefixPath = React.useContext(MyFormItemContext);
    const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

    return <Form.Item name={concatName} {...props} />;
}
const { Title } = Typography;

interface FormInputDataType {
    email: string;
    password: {
        password: string;
        confirm: string;
    }
}

export default function Login(): React.ReactNode {
    const [form] = Form.useForm<FormInputDataType>();
    const { login, authObj } = useContext(AuthContext);
    const { styles, cx } = useMainStyles();
    const  { push } = useRouter();

    const onFinish = (value: object): void => {
        console.log("Hello World");
    }
    const goHome = (value: object): void => {
        push("/");
    }

    /**
     * Get the data from the form and send it to the backend
     * @param e event
     */
    const onComplete = () => {
        const authReq: AUTH_REQUEST_TYPE = {
            password: form.getFieldValue("user").password.password,
            userNameOrEmailAddress: form.getFieldValue("user").email.email,
            rememberClient: true
        }
        login(authReq);
    }

    return (
        <Flex className={cx(styles.form, styles.bg)} align="center" justify="center">
            <Sider width={"25%"} style={{background: "#d0e1e1"}} className={cx(styles["left-sider"])}>
                {/* <Flex vertical> */}
                    <img src={"/assets/images/books.png"} alt="books" />
                {/* </Flex> */}
            </Sider>
            <Sider theme="light" width={"75%"} style={{ background: "#d0e1e1" }}>
                <Form className={cx(styles["the-form"], styles.bg)} name="form_item_path" layout="vertical" form={form} onFinish={onFinish}>
                    <Title className="">Login with your credentials</Title>
                    <MyFormItemGroup prefix={["user"]}>
                        <Row>           
                            <Col span={12}>
                            <MyFormItemGroup prefix={["email"]}>
                                <MyFormItem name="email" label="Email/Username" prefix={""}>
                                    <Input />
                                </MyFormItem>
                            </MyFormItemGroup>
                            </Col>
                        </Row>
                        <Row gutter={5}>
                            <MyFormItemGroup prefix={["password"]}>
                                <Col span={12}>
                                    <MyFormItem name="password" label="Password" prefix={""}>
                                        <Input.Password />
                                    </MyFormItem>
                                </Col>
                            </MyFormItemGroup>
                        </Row>
                        <Row gutter={50}>
                            <Col>
                                <Button type="primary" onClick={e => onComplete()}>Login</Button>
                            </Col>
                            <Col>
                                <Link href="/register"><Button>Don&apos;t have an account yet?</Button></Link>
                            </Col>
                        </Row>
                    </MyFormItemGroup>
                    </Form>
            </Sider>
    </Flex>
    );
}