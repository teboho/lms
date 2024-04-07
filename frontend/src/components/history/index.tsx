'use client';
import React, { useContext, useState } from "react";
import { List } from "antd";

const History: React.FC = () => {
    const data = [
        {
            title: "Ant design title 0"
        },
        {
            title: "Ant design title 1"
        },
        {
            title: "Ant design title 2"
        },
    ]

    return (
        <div>
            <h1>History</h1>
            <List 
                itemLayout="horizontal"
            />
        </div>
    );
}

export default History;