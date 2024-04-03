"use client";
import { ReactNode, useState, useEffect, useMemo, useContext } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import withAuth from "@/hocs/withAuth";
import { Typography, Image, Button , List, message, Steps, theme, Select, Space } from 'antd';
import { BookDataType, BookType } from "@/providers/BookProvider/context";

import InventoryContext from "@/providers/InventoryProvider/context";
import CategoryContext from "@/providers/CategoryProvider/context";

const { Title, Paragraph } = Typography;

const Categories = (): React.FC | React.ReactNode => {
    const { token } = theme.useToken();
    const { categories, category, getAllCategories, getCategory } = useContext(CategoryContext);

    useEffect(() => {
        if (categories?.length === 0 || !categories) {
            getAllCategories();
        }
    }, []);
            


    return (
        <>
            <div>
                <Title level={3}>Categories</Title>
                <Paragraph>
                    This is the categories page
                </Paragraph>
                {/* Table of categories */}
                <List
                    itemLayout="horizontal"
                    dataSource={categories}
                    renderItem={
                        (category: BookType) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={category.name}
                                    description={category.description}
                                />
                                {/* Button that view books of this category */}
                                <Link href={`/Admin/Books?categoryId=${category.id}`}>
                                    <Button type="primary">View Books</Button>
                                </Link>
                            </List.Item>
                        )
                    }
                />
            </div>
        </>
    );
}

export default withAuth(Categories);