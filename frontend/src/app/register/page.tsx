"use client";
import React, { useContext } from "react";
import { useMainStyles } from "./style";
import { Flex, Form, Input, Button, Row, Col, Tag, Typography } from "antd";
import Sider from "antd/lib/layout/Sider";
import AuthContext from "@/providers/authProvider/context";
import Link from "next/link";
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

    /**
     * Get the data from the form and send it to the backend
     * @param e event
     */
    const onComplete = () => {
        const formstuff = form.getFieldValue("user");
        if (formstuff.password.password === formstuff.password.password) {
            alert("Your password is not the same.")
            return;
        }

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
    
    const onFinish = (values: object): void => {
        console.log(values);
    }

    return (
        <Flex className={styles.form} style={{background: "#d0e1e1"}} align="center" justify="center">
            <Sider width={"25%"} style={{background: "#d0e1e1"}} className={cx(styles["left-sider"])}>
                <img src={"/assets/images/books.png"} alt="books" />
            </Sider>
            <Sider theme="light" style={{background: "#d0e1e1"}} width={"75%"} >
                <Form className={cx(styles["the-form"], styles.bg)} name="form_item_path" layout="vertical" onFinish={onFinish} form={form}>
                <Title className="">Register with your personal information</Title>
                    <MyFormItemGroup prefix={["user"]}>
                        <Row gutter={5}>
                            <MyFormItemGroup prefix={["name"]}>
                                <Col span={12}>
                                    <MyFormItem name="name" label="First Name" prefix={""}>
                                        <Input required/>
                                    </MyFormItem>
                                </Col>
                                <Col span={12}>
                                    <MyFormItem name="surname" label="Last Name" prefix={""}>
                                        <Input required/>
                                    </MyFormItem>
                                </Col>
                            </MyFormItemGroup>
                        </Row>
                        <Row>           
                            <Col span={24}>
                            <MyFormItemGroup prefix={["email"]}>
                                <MyFormItem name="email" label="Email" prefix={""}>
                                    <Input required/>
                                </MyFormItem>
                            </MyFormItemGroup>
                            </Col>
                        </Row>
                        <Row gutter={5}>
                            <MyFormItemGroup prefix={["password"]}>
                                <Col span={12}>
                                    <MyFormItem name="password" label="Password" prefix={""}>
                                        <Input.Password required />
                                    </MyFormItem>
                                </Col>
                                <Col span={12}>
                                    <MyFormItem name="confirm" label="Confirm" prefix={""}>
                                        <Input.Password required />
                                    </MyFormItem>
                                </Col>
                            </MyFormItemGroup>
                        </Row>
                        <Row gutter={50}>
                            <Col>
                                <Button type="primary" onClick={e => onComplete()}>Register</Button>
                            </Col>
                            <Col>
                                <Link href="/login"><Button>Already have an account?</Button></Link>
                            </Col>
                        </Row>
                    </MyFormItemGroup>
                </Form>
            </Sider>
        </Flex>
    );
}