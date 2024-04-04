"use client";

import withAuth from "@/hocs/withAuth";
import AuthorsContext from "@/providers/authorsProvider/context";
import { makeAxiosInstance } from "@/providers/authProvider";
import BookContext, { BookType } from "@/providers/bookProvider/context";
import CategoryContext from "@/providers/categoryProvider/context";
import { HistoryContext } from "@/providers/historyProvider/context";
import Utils from "@/utils";
import { Table, theme } from 'antd';
import { useContext, useEffect } from "react";
import { render } from "react-dom";
 

const Page = (): React.ReactNode => {
    const { token } = theme.useToken();
    const { historyData, history, getHistoryByPatron } = useContext(HistoryContext);
    const { getLocalBook } = useContext(BookContext);
    const { getCategory } = useContext(CategoryContext);
    const { getAuthorById } = useContext(AuthorsContext);

    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);
    const userId = Utils.userId;
    const patronId = Utils.getPatronUserInfo(userId);

    useEffect(() => {
        getHistoryByPatron(userId);
    }, []);

    //example of history item   {
//     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "patronId": 0,
//     "dateRead": "2024-04-04T17:19:14.465Z",
//     "bookId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//   }
// example of book item {
//     "name": "string",
//     "description": "string",
//     "type": 0,
//     "year": 0,
//     "imageURL": "string",
//     "isbn": "string",
//     "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "authorId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
//   }
// example of category item {
//     "name": "string",
//     "description": "string",
//     "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
// "location": "string"
//   }

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
    
    const historyRender = historyData?.map((item) => {
        const book = getLocalBook(item.bookId);
        return {
            key: item.id,
            bookName: book?.name,
            dateRead: item.dateRead,
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
            <h1>History</h1>
            <div>
                <div>
                    {showData}
                </div>
            </div>
        </div>
    );
}

export default withAuth(Page);