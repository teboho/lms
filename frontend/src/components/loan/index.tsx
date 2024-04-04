import { LoanType } from "@/providers/loanProvider/context";
import React, { useContext } from "react";
import Book from "../Book";
import BookContext, { BookType } from "@/providers/bookProvider/context";
import { Card, Flex, Image, List, Row, Typography } from "antd";
import Link from "next/link";
import CategoryContext from "@/providers/categoryProvider/context";
import AuthorsContext from "@/providers/authorsProvider/context";

const { Paragraph } = Typography;

const Loan = ({ item }: { item: LoanType }) => {
    const cost = item.isOverdue ? 0.25 : 0.0;

    const { getLocalBook } = useContext(BookContext);
    const { getCategory } = useContext(CategoryContext);
    const { getAuthorById } = useContext(AuthorsContext);

    const book = getLocalBook(item?.bookId);

    return (
        <Flex gap={50}>
            <div>
                <Image
                    width={200}
                    src={book?.imageURL}
                    alt="book image"
                />
            </div>
            <div>
                <Paragraph>
                    Type: {BookType[book?.type]}
                    , Year: {book?.year}
                </Paragraph>
                <Paragraph>
                    ISBN: {book?.isbn}
                </Paragraph>
                <Paragraph>
                    Category: {getCategory(book?.categoryId)?.name}
                </Paragraph>
                <Paragraph>
                    Author: {`${getAuthorById(book?.authorId)?.firstName} ${getAuthorById(book?.authorId)?.lastName}`}
                </Paragraph>
            </div>
            <div>
                <Paragraph>
                    Due Date: {item.dateDue}
                </Paragraph>
                <Paragraph>
                    Date Created: {item.dateCreated}
                </Paragraph>
                <Paragraph>
                    Cost: ${cost}
                </Paragraph>
            </div>
        </Flex>
    );
};


export default Loan;