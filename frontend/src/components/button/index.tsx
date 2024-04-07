import React from "react";

export default function Button(props: { text: string }) : React.ReactNode {
    // this is a generic button
    return <button>{props.text}</button>;
}