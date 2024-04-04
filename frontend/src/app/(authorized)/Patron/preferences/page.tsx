"use client";

import withAuth from "@/hocs/withAuth";
import AuthorsContext from "@/providers/authorsProvider/context";
import { makeAxiosInstance } from "@/providers/authProvider";
import BookContext, { BookType } from "@/providers/bookProvider/context";
import CategoryContext from "@/providers/categoryProvider/context";
import { PreferenceContext } from "@/providers/preferenceProvider/context";
import Utils from "@/utils";
import { Table, theme } from 'antd';
import { useContext, useEffect } from "react"; 

const Page = (): React.ReactNode => {
    const { token } = theme.useToken();
    const {  } = useContext(PreferenceContext);
    const { getLocalBook } = useContext(BookContext);
    const { getCategory } = useContext(CategoryContext);
    const { getAuthorById } = useContext(AuthorsContext);

    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);
    const userId = Utils.userId;
    const patronId = Utils.getPatronUserInfo(userId);

    // const columns = [
        
    // ];

    // const showData = (
    //         // <Table dataSource={preferenceRender} columns={columns} />
    // );
    
    return (
        <div>
            <h1>Preferences</h1>
            <div>
                {/* {showData} */}
            </div>
        </div>
    );
}

export default withAuth(Page);