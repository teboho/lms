'use client';
import React from "react";
import type { BookDataType } from "@/providers/bookProvider/context";
import { Typography, Flex } from "antd";
import Book from "@/components/book";

const { Title, Paragraph } = Typography;

export interface SearchResultsProps {
    books: BookDataType[];
    searchTerm: string;
}

/**
 * Needs to take in a books array
 * @param props json book object
 * @param searchTerm the search term
 * @returns The book `component
 */
const SearchResults: React.FC<SearchResultsProps> = ({ books, searchTerm }) => {
   
    return (
        <>
            {searchTerm && searchTerm.length > 0 ? <Title level={3}>Search Results for {searchTerm}</Title> : <Title level={3}>Explore our library...</Title>}
            <Flex gap={20} justify="center" align="center" wrap="wrap">
                {books?.map((book, index) => (
                    <div key={`search_col_${index}`}>
                        <Book book={book} />
                    </div>
                ))}
            </Flex>
        </>
    );    
}

export default SearchResults;