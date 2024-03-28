"use client";
import React, { useContext } from "react";
import { useMainStyles } from "./style";
import { Layout, Flex, Form, Input, Button, Row, Col, Tag, Typography } from "antd";
import { Header, Content, Footer } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import moduleStyles from "./register.module.css";
import AuthContext from "@/providers/AuthProvider/context";
import { redirect } from "next/navigation";
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
const { Title } = Typography;
interface FormInputDataType {
    name: {
        firstname: string;
        lastname: string;
    };
    email: string;
    phone: string;
    password: {
        password: string;
        confirm: string;
    }
}
export default function Register(): React.ReactNode {
    const [form] = Form.useForm<FormInputDataType>();
    const { styles, cx, theme } = useMainStyles();
    const { register } = useContext(AuthContext);

    const onFinish = (values: object): void => {
        console.log(values);
    }

    /**
     * Get the data from the form and send it to the backend
     * @param e event
     */
    const onComplete = (e: Event) => {
        const formstuff = form.getFieldValue("user");
        const user = {
            name: formstuff.name.name,
            surname: formstuff.name.surname,
            emailAddress: formstuff.email.email,
            password: formstuff.password.password,
            userName: formstuff.email.email,
            isActive: true,
            roleNames: [
                "PATRON"
            ],
        }
        console.log(user);
        register(user);
    }

    return (
        <Flex className={styles.form}>
            <Sider width={"25%"} style={{background: "#004aad"}} className={cx(styles["left-sider"])}>
                <Flex vertical>
                    <Tag color="green"><Title level={4}>Step 1: Fill in your details</Title></Tag>
                    <Tag color="null"><Title level={4}>Step 2: Complete registration</Title></Tag>
                </Flex>
            </Sider>
            <Sider theme="light" width={"75%"} >
                <Form className={cx(styles["the-form"])} name="form_item_path" layout="vertical" onFinish={onFinish} form={form}>
                <Title className="">Register with your personal information</Title>
                    <MyFormItemGroup prefix={["user"]}>
                        <Row gutter={5}>
                            <MyFormItemGroup prefix={["name"]}>
                                <Col span={12}>
                                    <MyFormItem name="name" label="First Name">
                                        <Input />
                                    </MyFormItem>
                                </Col>
                                <Col span={12}>
                                    <MyFormItem name="surname" label="Last Name">
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
                        {/* <Row>           
                            <Col span={24}>
                            <MyFormItemGroup prefix={["phone"]}>
                                <MyFormItem name="phone" label="Phone number">
                                    <Input />
                                </MyFormItem>
                            </MyFormItemGroup>
                            </Col>
                        </Row> */}
                        <Row gutter={5}>
                            <MyFormItemGroup prefix={["password"]}>
                                <Col span={12}>
                                    <MyFormItem name="password" label="Password">
                                        <Input.Password />
                                    </MyFormItem>
                                </Col>
                                <Col span={12}>
                                    <MyFormItem name="confirm" label="Confirm">
                                        <Input.Password />
                                    </MyFormItem>
                                </Col>
                            </MyFormItemGroup>
                        </Row>
                        <Row>
                            <Col>
                                <Button type="primary" onClick={e => onComplete(e)}>Register</Button>
                            </Col>
                            <Col><Button className={cx(styles.cancel)} onClick={e => redirect("/")}>Cancel</Button></Col>
                        </Row>
                    </MyFormItemGroup>
                </Form>
            </Sider>
        </Flex>
    );
}