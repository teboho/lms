import { createStyles } from 'antd-style';

export const useStyles = createStyles(({css, cx}) => ({
    list: css`
        width: 800px;
    `,
    content: css`
        width: 100%;
        /*border: 1px solid grey;*/
    `,
    right: css`
        width: 100%;
        /*border-right: 1px solid grey;
        background: grey;*/
    `,
    left: css`

    `,
    border: css`
        border: 1px solid blue;
    `,
    bgwhite: css`
        background: white;
    `,
    sticky: css`
        position: sticky;
        top: 0;
    `,
    "left-menu": css`
        background:  #d0e1e1;
        height: 100vh;
    `,
    padding: css`
        padding-right: 20px;
        padding-left: 20px;
    `, 
    layout: css`
        height: 100%;
    `
}));