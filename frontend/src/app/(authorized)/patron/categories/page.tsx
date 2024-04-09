"use client";
import { ReactNode, useState, useEffect, useMemo, useContext } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import withAuth from "@/hocs/withAuth";
import { Typography, Image, Button , List, message, Steps, theme, Select, Space } from 'antd';
import { BookDataType, BookType } from "@/providers/bookProvider/context";

import CategoryContext, { CategoryType } from "@/providers/categoryProvider/context";
import { useStyles } from "./styles";

const { Title, Paragraph } = Typography;

const Categories = (): React.ReactNode => {
    const { token } = theme.useToken();
    const { categories, getAllCategories, getCategory } = useContext(CategoryContext);
    const { styles, cx } = useStyles();

    useEffect(() => {
        if (categories?.length === 0 || !categories) {
            getAllCategories();
        }
    }, []);
            
    return (
        <div>
            <div style={{textAlign: "center"}}>
                <Title level={2}>Categories</Title>
                <Paragraph>
                    This is the categories page
                </Paragraph>
            </div>
            {/* Table of categories */}
            <List
                itemLayout="horizontal"
                dataSource={categories}
                renderItem={
                    (category: CategoryType, index: number) => (
                        <List.Item
                            id={`category_${index}}`}
                            className={cx(styles.hoverable, styles.athing)}
                        >
                            <List.Item.Meta
                                title={category?.name}
                                description={category?.description}
                            />
                            <div style={{textAlign: "center"}}>
                                <Paragraph>
                                    Location: {category?.location}
                                </Paragraph>
                            </div>
                            {/* Button that view books of this category */}
                            {/* <Link href={`/patron/books?categoryId=${category?.id}`}>
                                <Button type="primary">View Books</Button>
                            </Link> */}
                        </List.Item>
                    )
                }
            />
        </div>
    );
}

export default withAuth(Categories);