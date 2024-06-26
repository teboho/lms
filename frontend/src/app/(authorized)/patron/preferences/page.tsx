"use client";

import withAuth from "@/hocs/withAuth";
import AuthorsContext from "@/providers/authorsProvider/context";
import { makeAxiosInstance } from "@/providers/authProvider";
import BookContext, { BookType } from "@/providers/bookProvider/context";
import CategoryContext from "@/providers/categoryProvider/context";
import { PreferenceContext, PreferenceType } from "@/providers/preferenceProvider/context";
import Utils from "@/utils";
import { Card, Col, Row, Table, theme, Typography } from 'antd';
import { useContext, useEffect, useMemo, useState } from "react"; 
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import AuthContext from "@/providers/authProvider/context";

const Page = (): React.ReactNode => {
    const { token } = theme.useToken();
    const { categories, getAllCategories } = useContext(CategoryContext);
    const { authObj } = useContext(AuthContext);
    const { getPreferenceData, getPreferenceByPatron, preferenceData } = useContext(PreferenceContext);
    const [preferences, setPreferences] = useState<PreferenceType>(null);

    let accessToken = useMemo(() => authObj?.accessToken, [])
    accessToken = useMemo(() => authObj?.accessToken, [authObj]);

    useEffect(() => {
        if (accessToken) {            
            getPreferenceData();
            getAllCategories();
        }
    }, []);

    const getCategory = (id: string) => {
        const category = categories?.find(c => c.id === id);
        return category;
    }

    useEffect(() => {
        if (accessToken && preferenceData) {
            const decoded = jwtDecode(accessToken);
            const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            const patronId = Number.parseInt(userId)

            const prefs = getPreferenceByPatron(patronId);
            if (prefs) {
                setPreferences(prev => prefs);
            }
        }
    }, [preferenceData]);
    const { Title } = Typography;
    return (
        <div>
            <Title>Preferences</Title>
            {preferences ? (
                <Row gutter={16}>
                <Col span={8}>
                    <Card title={`1: ${getCategory(preferences?.primaryCategoryId)?.name}`} bordered={true} hoverable>
                        {getCategory(preferences?.primaryCategoryId)?.description}
                        <p>{getCategory(preferences?.primaryCategoryId)?.location}</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title={`2: ${getCategory(preferences?.secondaryCategoryId)?.name}`} bordered={true} hoverable>
                        {getCategory(preferences?.secondaryCategoryId)?.description}
                        <p>{getCategory(preferences?.secondaryCategoryId)?.location}</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title={`3: ${getCategory(preferences?.tertiaryCategoryId)?.name}`} bordered={true} hoverable>
                        {getCategory(preferences?.tertiaryCategoryId)?.description}
                        <p>{getCategory(preferences?.tertiaryCategoryId)?.location}</p>
                    </Card>
                </Col>
            </Row>
            ) : (
                <>
                    <p>You have not yet chosen preferences</p>
                    <p>Choose your preferences <Link href="/patron/preferences-survey">here</Link></p>
                </>
            )}

        </div>
    );
}

export default withAuth(Page);