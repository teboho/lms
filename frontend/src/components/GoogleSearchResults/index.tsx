'use client';
import React, { use, useContext, useEffect, useMemo, useState } from "react";
import type { BookDataType, SearchBookType } from "@/providers/bookProvider/context";
import { Typography, Flex, Spin } from "antd";
import BookContext from "@/providers/bookProvider/context";
import SearchBook from "../searchBook";

const { Title, Paragraph } = Typography;

const GoogleSearchResults: React.FC = () => {
    const { searchBooks, searchTerm, loading } = useContext(BookContext);

    const bookElems = useMemo(() => searchBooks?.result?.map((bookStuff, index) => (
        <div key={`search_book_col_${index}`}>
            <SearchBook bookStuff={bookStuff} />
        </div>
    )), [searchBooks]);

    if (!searchBooks || !searchBooks.result || searchBooks.result.length === 0) {
        return (<>
            <Title level={3}>No search results, try searching again</Title>
        </>);
    } else if (loading) {
        return (<>
            <br />
            <Spin />
        </>);
    }

    return (
        <>
            {/* {searchTerm ? <Title level={3}>Search Results for {searchTerm}</Title> : <Title level={3}>Search some</Title>} */}
            <Flex gap={20} justify="center" align="center" wrap="wrap">
                {bookElems}
            </Flex>
        </>
    );    
}

export default GoogleSearchResults;