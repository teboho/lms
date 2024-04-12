"use client";

import withAuth from "@/hocs/withAuth";
import AuthorsContext from "@/providers/authorsProvider/context";
import { makeAxiosInstance } from "@/providers/authProvider";
import BookContext, { BookType } from "@/providers/bookProvider/context";
import CategoryContext from "@/providers/categoryProvider/context";
import { HistoryContext } from "@/providers/historyProvider/context";
import Utils from "@/utils";
import { Table, theme, Typography } from 'antd';
import { useContext, useEffect } from "react";
 

const { Title } = Typography;

const Page = (): React.ReactNode => {
    const { token } = theme.useToken();
    const { historyData, history, getHistoryByPatron,  } = useContext(HistoryContext);
    const { getLocalBook } = useContext(BookContext);
    const { getCategory } = useContext(CategoryContext);
    const { getAuthorById } = useContext(AuthorsContext);

    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);
    const userId = Utils.userId;
    const patronId = Utils.getPatronUserInfo(userId);

    useEffect(() => {
        if (accessToken) {
            getHistoryByPatron(userId);
        }   
    }, []);

    const columns = [
        {
            title: 'Book Name',
            dataIndex: 'bookName',
            key: 'bookName',
        },
        {
            title: 'Date Read',
            dataIndex: 'dateRead',
            key: 'dateRead',
        },
        {
            title: 'Book Type',
            dataIndex: 'bookType',
            key: 'bookType',
        
        },
        {
            title: 'Book Year',
            dataIndex: 'bookYear',
            key: 'bookYear',
        },
        {
            title: 'Book ISBN',
            dataIndex: 'bookISBN',
            key: 'bookISBN',
        },
        {
            title: 'Book Category',
            dataIndex: 'bookCategory',
            key: 'bookCategory',
        },
        {
            title: 'Book Author',
            dataIndex: 'bookAuthor',
            key: 'bookAuthor',
        },
    ];
    
    function formatDate(_date: string) {
        let date = new Date(_date);
        let formattedDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

        return formattedDate;
    }

    const historyRender = historyData?.map((item) => {
        const book = getLocalBook(item.bookId);
        return {
            key: item.id,
            bookName: book?.name,
            dateRead: formatDate(item.dateRead),
            bookType: BookType[book?.type],
            bookYear: book?.year,
            bookISBN: book?.isbn,
            bookCategory: getCategory(book?.categoryId)?.name,
            bookAuthor: getAuthorById(book?.authorId)?.firstName + " " + getAuthorById(book?.authorId)?.lastName,
        };
    });

    const showData = (
        <div>
            {/* antd table that shows history data */}
            <Table dataSource={historyRender} columns={columns} />
        </div>
    );
    
    return (
        <div>
            <Title level={1}>History</Title>
            <div>
                <div>
                    {showData}
                </div>
            </div>
        </div>
    );
}

export default withAuth(Page);