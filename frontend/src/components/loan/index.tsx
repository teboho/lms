import { LoanContext, LoanType } from "@/providers/loanProvider/context";
import React, { useContext } from "react";
import BookContext, { BookType } from "@/providers/bookProvider/context";
import { Button, Flex, Image, Tag, Typography } from "antd";
import CategoryContext from "@/providers/categoryProvider/context";
import AuthorsContext from "@/providers/authorsProvider/context";

const { Paragraph } = Typography;

/**
 * 
 * @param param0 propts with the loan property -> object
 * @returns react component
 */
const Loan = ({ item }: { item: LoanType }): React.ReactNode => {
    const { getLocalBook } = useContext(BookContext);
    const { getCategory } = useContext(CategoryContext);
    const { getAuthorById } = useContext(AuthorsContext);
    const { getReturnLoan } = useContext(LoanContext);

    const cost = item.isOverdue ? 0.25 : 0.0;
    const book = getLocalBook(item?.bookId);
    const isOverdue = new Date(item.dateDue) < new Date();

    const onLoanReturn = (id: string) => {
        // alert(id);
        const loan = item;
        console.log(item.id);
        getReturnLoan(id);
    }

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
                    Date Returned: {item.dateReturned}
                </Paragraph>
                <Paragraph>
                    Cost: ${cost}
                </Paragraph>
                <Paragraph>
                    Status: {isOverdue ? <Tag color="red">{"Overdue"}</Tag> : <Tag color="green">{"Not Overdue"}</Tag>}
                </Paragraph>
                <Paragraph>
                    {item.confirmed && ((item.isReturned ) ? <Tag color="cyan">{"Returned"}</Tag> : <Tag color="red">{"Not Returned"}</Tag>)}
                </Paragraph>
                <Paragraph>
                    {item.confirmed ? <Tag color="cyan-inverse">{"Confirmed"}</Tag> : <Tag color="red-inverse">{"Not Confirmed"}</Tag>}
                </Paragraph>
                {!item.isReturned && item.confirmed && (<Paragraph>
                    <Button onClick={e => {
                        console.log(e);
                        onLoanReturn(item.id);
                    }}>Return</Button>
                </Paragraph>)}
            </div>
        </Flex>
    );
};


export default Loan;