"use client";
import { ReactNode, useContext, useEffect, useMemo } from "react";
import withAuth from "@/hocs/withAuth";
import { Flex, Layout, Input, List, Typography } from "antd";
import type { SearchProps } from "antd/es/input";
import BookContext from "@/providers/BookProvider/context";
const { Content, Sider } = Layout;
const { Search } = Input;
import Image from "next/image";
import {useStyles} from "./styles";
import Preferences from "@/components/Preferences";
import History from "@/components/History";
import Book from "@/components/Book";
import SearchResults from "@/components/SearchResults";
import { LoanContext } from "@/providers/LoanProvider/context";

const MyLoans = (): React.FC | React.ReactNode => {
    const { styles, cx } = useStyles();
    const {} = useContext(BookContext);
    const { loanState } = useContext(LoanContext);

    const loans = useMemo(() => {
        return loanState.loans;
    }, [loanState]);

    return (
        <>   
            <h1>My Loans</h1>
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 3,
                    lg: 4,
                    xl: 5,
                    xxl: 6,
                }}
                dataSource={loans}
                renderItem={(item) => (
                    <List.Item>
                        
                    </List.Item>
                )}
            />
        </>
    );
}

export default withAuth(MyLoans);