"use client";
import { ReactNode, useContext, useEffect, useMemo } from "react";
import withAuth from "@/hocs/withAuth";
import { Layout } from "antd";
import AuthContext from "@/providers/AuthProvider/context";
import {useStyles} from "./styles";

const { Content } = Layout;

const Home = (): React.FC | React.ReactNode => {
    const { userObj } = useContext(AuthContext);
    const { styles, cx } = useStyles();
    
    useEffect(() => {
        console.log("Home useEffect", userObj);        
    }, [userObj]);

    const user = useMemo(() => userObj, [userObj]);

    return (
        <Content className={cx(styles.content)}>
            <div>
                <p>name: {user?.name}</p>
                <p>surname: {user?.surname}</p>
                <p>user id: {user?.id}</p>
                <p>email: {user?.emailAddress}</p>
            </div>
            {/* Inventory */}
            <h1>Inventory</h1>
        </Content>
    );
}

export default withAuth(Home);