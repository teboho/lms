"use client";

import withAuth from "@/hocs/withAuth";
import AuthorsContext from "@/providers/authorsProvider/context";
import { makeAxiosInstance } from "@/providers/authProvider";
import BookContext, { BookType } from "@/providers/bookProvider/context";
import CategoryContext from "@/providers/categoryProvider/context";
import { PreferenceContext, PreferenceType } from "@/providers/preferenceProvider/context";
import Utils from "@/utils";
import { Card, Col, Row, Table, theme } from 'antd';
import { useContext, useEffect, useMemo, useState } from "react"; 
import { jwtDecode } from "jwt-decode";

const Page = (): React.ReactNode => {
    const { token } = theme.useToken();
    const {  } = useContext(PreferenceContext);
    const { getLocalBook } = useContext(BookContext);
    const { getCategory } = useContext(CategoryContext);
    const { getAuthorById } = useContext(AuthorsContext);
    const { getPreferenceData, getPreferenceByPatron, preferenceData } = useContext(PreferenceContext);
    const [preferences, setPreferences] = useState<PreferenceType>(null);
    const accessToken = Utils.getAccessToken();
    const instance = makeAxiosInstance(accessToken);
    // const userId = Utils.userId;
    // const patronId = Utils.getPatronUserInfo(userId);

    useEffect(() => {
        if (accessToken) {            
            getPreferenceData();
        }
    }, []);

    useEffect(() => {
        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            console.log(decoded);
            const patronId = Number.parseInt(userId)

            const prefs = getPreferenceByPatron(patronId);
            // setPreferences(getPreferenceByPatron(userId));
            console.log("Preferences", prefs);
            if (prefs) {
                // const prefs = preferenceData?.find(p => p.patronId === patronId);
                setPreferences(prev => prefs);
            }
        }
    }, [preferenceData]);

    const primaryCategory = useMemo(() => getCategory(preferences?.primaryCategoryId), [getCategory, preferences?.primaryCategoryId]);
    const secondaryCategory = getCategory(preferences?.secondaryCategoryId);
    const tertiaryCategory = getCategory(preferences?.tertiaryCategoryId);
    
    return (
        <div>
            <h1>Preferences</h1>
            <Row gutter={16}>
                <Col span={8}>
                <Card title={getCategory(preferences?.primaryCategoryId)?.name} bordered={false}>
                    {primaryCategory?.description}
                    <p>{primaryCategory?.location}</p>
                </Card>
                </Col>
                <Col span={8}>
                <Card title={secondaryCategory?.name} bordered={false}>
                    {secondaryCategory?.description}
                    <p>{secondaryCategory?.location}</p>
                </Card>
                </Col>
                <Col span={8}>
                <Card title={tertiaryCategory?.name} bordered={false}>
                    {tertiaryCategory?.description}
                    <p>{tertiaryCategory?.location}</p>
                </Card>
                </Col>
            </Row>
        </div>
    );
}

export default withAuth(Page);