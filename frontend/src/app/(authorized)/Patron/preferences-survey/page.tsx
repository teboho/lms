"use client";
import { useState, useEffect, useMemo, useContext } from "react";
import withAuth from "@/hocs/withAuth";
import { Button, List, message, Steps, theme, Input } from 'antd';
import AuthContext from "@/providers/authProvider/context";
import BookContext from "@/providers/bookProvider/context";
import CategoryContext from "@/providers/categoryProvider/context";
import Utils from "@/utils";
import { useStyles } from "./styles";
import { PreferenceContext } from "@/providers/preferenceProvider/context";
import { jwtDecode } from "jwt-decode";

export type Preferences = {
    primaryCategoryId: number;
    secondaryCategoryId: number;
    tertiaryCategoryId: number;
    patronId: number;
}

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

const Page = (): React.ReactNode => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [chosen, setChosen] = useState([]);  
    const [deleted, setDeleted] = useState([]);  
    const {userObj, getUserId} = useContext(AuthContext);
    const bookContextObject = useContext(BookContext);
    const categoryContextValue = useContext(CategoryContext);
    const { getPreferenceData, getPreferenceByPatron, preferenceData } = useContext(PreferenceContext);
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
            
            console.log("This user's preferences: ", prefs);
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
        if (preferenceData) {
            console.log("preferenceData", preferenceData);
        }
        const accessToken = Utils.getAccessToken();
        if (accessToken) {
            const decoded = jwtDecode(accessToken);
            const userId = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
            console.log(decoded);
            const patronId = Number.parseInt(userId)

            const prefs = getPreferenceByPatron(patronId);
            console.log("This user's preferences: ", prefs);
            if (prefs) {
                setChosen(prev => ([
                    getCategory(prefs.primaryCategoryId),
                    getCategory(prefs.secondaryCategoryId),
                    getCategory(prefs.tertiaryCategoryId)
                ]));
                // also set the current step to the last one
                // setCurrent(2);
            } 
        }       
    }, [preferenceData]);

    useEffect(() => {
        console.log("categories", categoryContextValue.categories);
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
        console.log(chosen);
        var prefs: Preferences = {
            primaryCategoryId: chosen[0].id,
            secondaryCategoryId: chosen[1].id,
            tertiaryCategoryId: chosen[2].id
        };
        bookContextObject.savePreferences({
            patronId: user?.id,
            ...prefs
        });
    }

    const getCategory = (id: string) => {
        console.log("Getting category with id: ", id);
        const category = categoryContextValue.categories?.find(c => c.id === id);
        console.log("Category: ", category);
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
        
        console.log("what to bring back to the content", spliced);
        console.log("current", current);
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
        console.log(value);
        const results = memoOptions.filter((item) => item?.name?.toLowerCase().includes(value));
        console.log(results);
        setOptions(results);
    }
                
    return (
        <>
            <div> 
                <Search
                    placeholder="Enter book title"
                    onSearch={onSearch}
                    style={{ width: 400 }}
                />
                <Button type="primary" onClick={() => setOptions(categoryContextValue.categories)}>
                    Reset
                </Button>
            </div>

            <Steps current={current} items={items} />

            {/* the choices */}
            <div style={contentStyle}>
                <div className={cx(styles.center)}>{current >= 0 && steps[current].content}</div>
                <br />
                <br />
                {chosen.length < steps.length && (
                    memoOptions?.map((item, index: number) => (
                        <Button key={`choice_${item.id}`} type="primary" 
                            onClick={() => {
                                savePref(index, item)
                                if (current < steps.length - 1) next();
                            }}>
                            {item.name}
                        </Button>
                    ))
                )}
            </div>
            
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
                    <Button style={{ margin: '0 8px' }} onClick={() => savePreferences()}>
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
                    <List.Item>
                        {`${item.name}`}
                    </List.Item>
                )}
            />
        </>
    );
}

export default withAuth(Page);