"use client";
import { ReactNode, useState, useEffect, useMemo, useContext } from "react";
import withAuth from "@/hocs/withAuth";
import { Button, List, message, Steps, theme } from 'antd';
import { redirect } from "next/navigation";
import AuthContext from "@/providers/AuthProvider/context";
import BookContext from "@/providers/BookProvider/context";
import CategoryContext from "@/providers/CategoryProvider/context";

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

const Survey = (): React.FC | React.ReactNode => {
    const { token } = theme.useToken();
    const [current, setCurrent] = useState(0);
    const [chosen, setChosen] = useState([]);  
    const [deleted, setDeleted] = useState([]);  
    const {userObj, getUserId} = useContext(AuthContext);
    const bookContextObject = useContext(BookContext);
    const categoryContextValue = useContext(CategoryContext);

    useEffect(() => {
        setChosen(prev => []);
    }, [])
    
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
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        backgroundColor: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: `1px dashed ${token.colorBorder}`,
        marginTop: 16,
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
    const options = categoryContextValue?.categoryState?.categories?.map((item, index) => (
        <Button key={`choice_${item.id}`} type="primary" 
            onClick={() => {
                savePref(index, item)
                if (current < steps.length - 1) next();
            }}>
            {item.name}
        </Button>
    ));

    return (
        <>
            <Steps current={current} items={items} />
            <div style={contentStyle}>
                {current > 0 && steps[current].content}
                
                {chosen.length < steps.length && options}
            </div>
            <div style={{ marginTop: 24 }}>
            {/* {current < steps.length - 1 && (
                <Button type="primary" onClick={() => next()}>
                Next
                </Button>
            )} */}
            {/* {current < steps.length - 1 && (
                <Button type="primary" onClick={() => reset()}>
                    Restart
                </Button>
            )} */}
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
                renderItem={(item, index) => (
                    <List.Item>
                        {`${item.name}`}
                    </List.Item>
                )}
            />
        </>
    );
}

export default withAuth(Survey);