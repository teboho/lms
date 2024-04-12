"use client";
import { useState, useEffect, useMemo, useContext } from "react";
import withAuth from "@/hocs/withAuth";
import { Button, List, message, Steps, theme, Input, ConfigProvider, Typography, Flex } from 'antd';
import AuthContext from "@/providers/authProvider/context";
import CategoryContext from "@/providers/categoryProvider/context";
import Utils from "@/utils";
import { useStyles } from "./styles";
import { PreferenceContext, PreferenceType } from "@/providers/preferenceProvider/context";
import { jwtDecode } from "jwt-decode";

const cats: {name: string, id: number}[] = [];
for (var i = 0; i < 10; i++) {
    cats.push(
        {
            name: "cat " + i,
            id: i
        }
    )
}

const { Search } = Input;
const  { Title } = Typography;

const Page = (): React.ReactNode => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [chosen, setChosen] = useState([]);  
    const [deleted, setDeleted] = useState([]);  
    const {userObj, getUserId} = useContext(AuthContext);
    const categoryContextValue = useContext(CategoryContext);
    const { postPreference, getPreferenceByPatron, preferenceData } = useContext(PreferenceContext);
    const [_options, setOptions] = useState(null);
    const {styles, cx} = useStyles();

    useEffect(() => {
        setChosen([]);
        const accessToken = Utils.getAccessToken();
        if (accessToken) {
            categoryContextValue.getAllCategories();
        }
        setOptions(categoryContextValue.categories);

        // get the user's current preferences so that if they have any, we can display them and allow them to change
        const userId = getUserId();
        if (userId) {
            const prefs = getPreferenceByPatron(userId);
            
            if (prefs) {
                setChosen(prev => ([
                    getCategory(prefs.primaryCategoryId),
                    getCategory(prefs.secondaryCategoryId),
                    getCategory(prefs.tertiaryCategoryId)
                ]));

                // remove the chosen categories from the options
                const _deleted = categoryContextValue
                    .categories
                    ?.filter(c => c.id !== prefs.primaryCategoryId && c.id !== prefs.secondaryCategoryId && c.id !== prefs.tertiaryCategoryId);
                setOptions(_deleted);
            }
        }
    }, [])

    useEffect(() => {
        const accessToken = Utils.getAccessToken();
        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            const patronId = Number.parseInt(userId)

            const prefs = getPreferenceByPatron(patronId);
            if (prefs) {
                setChosen(prev => ([
                    getCategory(prefs.primaryCategoryId),
                    getCategory(prefs.secondaryCategoryId),
                    getCategory(prefs.tertiaryCategoryId)
                ]));
            } 
        }       
    }, [preferenceData]);

    useEffect(() => {
        setOptions(categoryContextValue.categories);
    }, [categoryContextValue.categories])

    const memoOptions = useMemo(() => {
        return _options;
    }, [_options]);
    
    const user = useMemo(() => {
        return userObj;
    }, [userObj]);
    
    const savePref = (prefNum:number, category: object) => {
        const _deleted = cats.splice(prefNum, 1); // delete the option from the choices
        setDeleted(prev => ([
            ..._deleted
        ]));
        setChosen(prev => ([
            ...prev,
            category
        ]));
    }

    const savePreferences = (): void => {
        var prefs: PreferenceType = {
            patronId: user?.id,
            primaryCategoryId: chosen[0].id,
            secondaryCategoryId: chosen[1].id,
            tertiaryCategoryId: chosen[2].id
        };
        postPreference({
            ...prefs
        });
    }

    const getCategory = (id: string) => {
        const category = categoryContextValue.categories?.find(c => c.id === id);
        return category;
    }

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        const stateCopy = [...chosen];
        const spliced = stateCopy.splice(stateCopy.length-1, 1);
        setChosen(prev => ([
            ...stateCopy,          
        ]));

        spliced.forEach((cat, i) => {
            cats.push(cat);
        })

        setCurrent(current - 1);
    };

    const contentStyle: React.CSSProperties = {
        // lineHeight: '260px',
        // textAlign: 'center',
        // color: token.colorTextTertiary,
        // backgroundColor: token.colorFillAlter,
        // borderRadius: token.borderRadiusLG,
        // border: `1px dashed ${token.colorBorder}`,
        // marginTop: 16,
        margin: 16
    };

    const steps = [
        {
          title: 'First',
          content: 'First-choice',
        },
        {
          title: 'Second',
          content: 'Second-choice',
        },
        {
          title: 'Last',
          content: 'Last-choice',
        },
    ];
    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    let options = memoOptions?.map((item, index) => (
        <Button key={`choice_${item.id}`} type="primary" 
            onClick={() => {
                savePref(index, item)
                if (current < steps.length - 1) next();
            }}>
            {item.name}
        </Button>
    ));

    const onSearch = (value: string) => {
        const results = memoOptions.filter((item) => item?.name?.toLowerCase().includes(value));
        setOptions(results);
    }
           
    return (
        <div className={cx(styles.padding)}>
            <Title level={1}>Add / Modify Your Preferences</Title>

            <div> 
                <Search
                    placeholder="Enter book title"
                    onSearch={onSearch}
                    style={{ width: 400 }}
                />
                {" "}
            </div>

            <Flex align="center" justify="center" wrap="wrap" style={{ width : "100%" }}>
                {chosen.length < steps.length && (
                    memoOptions?.map((item, index: number) => (
                        <div key={`button_${index}`}>
                            <ConfigProvider 
                                theme={{
                                    token: {
                                        colorPrimary: "#00BF63",
                                    }                        
                                }}>
                                    <Button key={`choice_${item.id}`}
                                        onClick={() => {
                                            savePref(index, item)
                                            if (current < steps.length - 1) next();
                                        }}>
                                        {item.name}
                                    </Button>
                                </ConfigProvider>                        
                            {" "}
                        </div>
                    ))
                )}
            </Flex>
            
            <div style={{ marginTop: 24 }}>
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {chosen.length > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
                {chosen.length === 3 && (
                    <Button type="primary" style={{ margin: '0 8px' }} onClick={() => savePreferences()}>
                        Save
                    </Button>
                )}
            </div> 
            <br />
            <List 
                header={<h1>What you chose</h1>}
                bordered
                dataSource={chosen}
                style={{ alignContent: 'center' }}
                renderItem={(item, index) => (
                    <List.Item key={`list_item_${index}`}>
                        {`${item.name}`}
                    </List.Item>
                )}
            />
        </div>
    );
}

export default withAuth(Page);