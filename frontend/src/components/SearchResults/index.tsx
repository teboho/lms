'use client';
import React, { useContext, useState } from "react";
import type { BOOK } from "@/providers/BookProvider/context";
import { Typography, Row, Col, Space, Flex } from "antd";
import Book from "../Book";

const { Title, Paragraph } = Typography;

export interface SearchResultsProps {
    books: BOOK[];
    searchTerm: string;
}

/**
 * Needs to take in a books array
 * @param props json book object
 * @param searchTerm the search term
 * @returns The book component
 */
const SearchResults: React.FC<SearchResultsProps> = ({ books, searchTerm }) => {
   
    return (
        <>
            <Title>Search Results for {searchTerm}</Title>
            <Flex direction="horizontal" size="large">
                {books.map((book, index) => (
                    <div key={`search_col_${index}`}>
                        <Book book={book} />
                    </div>
                ))}
            </Flex>
        </>
    );    
}

export default SearchResults;