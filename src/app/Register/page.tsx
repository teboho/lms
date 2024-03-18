"use client";
import React from "react";
import { useMainStyles } from "./style";
import { Layout, Flex, Form, Input, Button, Row, Col, Tag } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import moduleStyles from "./register.module.css";
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
    const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefix, prefix]);

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

export default function Register(): React.ReactNode {
    const { styles, cx, theme } = useMainStyles();

    const onFinish = (value: object): void => {
        console.log("Hello World");
    }

    return (
        <Flex>
            <Sider theme="light" width={"25%"}>
                <Flex vertical>
                    <Tag color="green">Step 1</Tag>
                    <Tag color="">Step 2</Tag>
                </Flex>
            </Sider>
            <Sider theme="light" width={"75%"}>
                <h1>Register with your personal information</h1>
            <Form name="form_item_path" layout="vertical" onFinish={onFinish}>
                <MyFormItemGroup prefix={["user"]}>
                    <Row gutter={5}>
                        <MyFormItemGroup prefix={["name"]}>
                            <Col span={12}>
                                <MyFormItem name="firstName" label="First Name">
                                    <Input />
                                </MyFormItem>
                            </Col>
                            <Col span={12}>
                                <MyFormItem name="lastname" label="Last Name">
                                    <Input />
                                </MyFormItem>
                            </Col>
                        </MyFormItemGroup>
                    </Row>
                    <Row>           
                        <Col span={24}>
                        <MyFormItemGroup prefix={["email"]}>
                            <MyFormItem name="email" label="Email">
                                <Input />
                            </MyFormItem>
                        </MyFormItemGroup>
                        </Col>
                    </Row>
                    <Row>           
                        <Col span={24}>
                        <MyFormItemGroup prefix={["phone"]}>
                            <MyFormItem name="phone" label="Phone number">
                                <Input />
                            </MyFormItem>
                        </MyFormItemGroup>
                        </Col>
                    </Row>
                    <Row gutter={5}>
                        <MyFormItemGroup prefix={["password"]}>
                            <Col span={12}>
                                <MyFormItem name="password" label="Password">
                                    <Input />
                                </MyFormItem>
                            </Col>
                            <Col span={12}>
                                <MyFormItem name="confirm" label="Confirm">
                                    <Input />
                                </MyFormItem>
                            </Col>
                        </MyFormItemGroup>
                    </Row>
                    <Row>
                        <Col>
                            <Button type="primary">Register</Button>
                        </Col>
                        <Col><Button className={cx(styles.cancel)}>Cancel</Button></Col>
                    </Row>
                </MyFormItemGroup>
            </Form>
            </Sider>
        </Flex>
    );
}