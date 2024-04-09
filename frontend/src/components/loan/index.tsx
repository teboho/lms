import { LoanContext, LoanType } from "@/providers/loanProvider/context";
import React, { useContext } from "react";
import BookContext, { BookType } from "@/providers/bookProvider/context";
import { Button, Flex, Image, Tag, Typography } from "antd";
import CategoryContext from "@/providers/categoryProvider/context";
import AuthorsContext from "@/providers/authorsProvider/context";
import { useMainStyles } from './styles';

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
    const { cx, styles } = useMainStyles();

    const cost = item.isOverdue ? 0.25 : 0.0;
    const book = getLocalBook(item?.bookId);
    const isOverdue = new Date(item.dateDue) < new Date();

    const onLoanReturn = (id: string) => {
        // alert(id);
        const loan = item;
        console.log(item.id);
        getReturnLoan(id);
    }

    
    function formatDate(_date: string) {
        let date = new Date(_date);
        let formattedDate = `${date.toLocaleDateString()}`;

        return formattedDate;
    }

    return (
        <Flex gap={50} className={cx(styles.border, styles.padding)}>
            <div>
                <Image
                    className={cx(styles.image)}
                    src={book?.imageURL}
                    alt="book image"
                    style={{
                        borderRadius: 20,                
                        width: 200,
                        height: 250,
                        objectFit: "cover",
                        objectPosition: "50% 0%"
                    }}
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
                    Due Date: {formatDate(item.dateDue)}
                </Paragraph>
                <Paragraph>
                    Date Created: {formatDate(item.dateCreated)}
                </Paragraph>
                {new Date(item.dateReturned).getFullYear() !== 1970 && (<Paragraph>
                    Date Returned: {formatDate(item.dateReturned)}
                </Paragraph>)}
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