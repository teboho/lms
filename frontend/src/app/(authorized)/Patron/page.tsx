"use client";
import { ReactNode, useContext, useEffect, useMemo } from "react";
import withAuth from "@/hocs/withAuth";
import { Layout } from "antd";
import BookContext from "@/providers/BookProvider/context";
import {useStyles} from "./styles";
import AuthContext from "@/providers/AuthProvider/context";
import SearchResults from "@/components/SearchResults";

const { Content } = Layout;

const PatronHome = (): React.ReactNode => {
    const { userObj } = useContext(AuthContext);
    const { books } = useContext(BookContext);
    const { styles, cx } = useStyles();
    const { searchTerm } = useContext(BookContext);
    
    useEffect(() => {
        console.log("Home useEffect", userObj);        
    }, [userObj]);

    const user = useMemo(() => userObj, [userObj]);

    return (
        <Content className={cx(styles.content)}>
            <h1>Books</h1>     
            <div>
                <p>name: {user?.name}</p>
                <p>surname: {user?.surname}</p>
                <p>user id: {user?.id}</p>
                <p>email: {user?.emailAddress}</p>
                {/* <p>fullname: {fulluser?.fullName}</p>
                <p>rolenames: {JSON.stringify(fulluser?.roleNames)}</p> */}
            </div>
            <SearchResults books={books} searchTerm={searchTerm} />
        </Content>
    );
}

export default withAuth(PatronHome);