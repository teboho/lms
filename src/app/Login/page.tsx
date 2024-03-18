"use client";
import React from "react";
import { useMainStyles } from "./style";
import { Layout, Flex, Form, Input, Button } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";

export default function Login(): React.ReactNode {
    const { styles, cx, theme } = useMainStyles();

    return (
        <Layout className={cx(styles.layout)}>
            <Flex>
                <Sider theme="light" width={"25%"}>
                 <h3>Fill in details</h3>
                 <h3>Complete Login</h3>
                </Sider>
                <Sider theme="light" width={"75%"}>
                    <h2>Login with your personal information</h2>
                    <Form
                        name="register"
                    >
                         <Form.Item
                            label="First Name"
                            name="firstname"
                            rules={[{ required: true, message: 'Please input your first name!' }]}
                            className={cx(styles.name)}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Last Name"
                            name="lastname"
                            rules={[{ required: true, message: 'Please input your last name!' }]}
                            className={cx(styles.name)}
                        >
                            <Input />
                        </Form.Item>

                        <Button>Login</Button>
                    </Form>
                </Sider>
            </Flex>
        </Layout>
    );
}