'use client';
import React, { useContext, useState } from "react";
import { List } from "antd";

const Preferences: React.FC = () => {
    const data = [
        {
            title: "Ant design title 0",
            description: "Ant design description 0",
        },
        {
            title: "Ant design title 1",
            description: "Ant design description 1",
        },
        {
            title: "Ant design title 2",
            description: "Ant design description 2",
        },
    ]

    return (
        <div>
            <h1>Preferences</h1>
            <List 
                itemLayout="vertical"
                dataSource={data}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta 
                            title={item.title}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}

export default Preferences;