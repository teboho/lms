'use client';
import { Children, ReactNode } from "react";
import { useMainStyles } from "./styles";
import { Footer } from "antd/lib/layout/layout";

export default function MyFooter(props: {children: ReactNode}){
    // The styles object in the useStyles method is cached by default, 
    // so there is no need to worry about re-rendering issues
    const { styles, cx } = useMainStyles();
  
    return (
        <Footer className={cx(styles.footer)}>{props.children}</Footer>
    );
  };