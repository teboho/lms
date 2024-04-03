'use client';
import React, { use, useContext, useEffect, useMemo, useState } from "react";
import type { BookDataType, SearchBookType } from "@/providers/BookProvider/context";
import { Typography, Flex } from "antd";
import Book from "../Book";
import BookContext from "@/providers/BookProvider/context";
import SearchBook from "../SearchBook";

const { Title, Paragraph } = Typography;

/**
 * Needs to take in a books array
 * @param props json book object
 * @param searchTerm the search term
 * @returns The book `component
 */
const GoogleSearchResults: React.FC = () => {
    const { searchBooks, searchTerm } = useContext(BookContext);

    useEffect(() => {
        console.log("GoogleSearchResults useEffect");
        console.log(searchBooks);
    }, [searchBooks]);

    const bookElems = useMemo(() => searchBooks?.result?.map((bookStuff, index) => (
        <div key={`search_book_col_${index}`}>
            <SearchBook bookStuff={bookStuff} />
        </div>
    )), [searchBooks]);

    if (!searchBooks || !searchBooks.result || searchBooks.result.length === 0) {
        return (<>
            <Title level={3}>No search results, try again</Title>
            {/* todo: loading icon */}
            {/* ... */}

        </>);
    }

    return (
        <>
            {searchTerm ? <Title level={3}>Search Results for {searchTerm}</Title> : <Title level={3}>Search some</Title>}
            <Flex gap={20} justify="center" align="center" wrap="wrap">
                {bookElems}
            </Flex>
        </>
    );    
}

export default GoogleSearchResults;