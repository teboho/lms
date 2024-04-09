import { createStyles } from 'antd-style';

export const useMainStyles = createStyles(({css, cx}) => ({
    bg: css`
        background: #d0e1e1;
    `,
    border: css`
        border: 1px solid #004aad;
        border-radius: 20px;
        padding: 20px;
        border-left: none;
    `,
    form: css`
        background: #d0e1e1;
        height: 90vh;
    `,
    sider: css`
        margin: 100px;
    `,
    "the-form": css`
        margin: 100px;
    `,
    "left-sider": css`
        padding: 20px;
        /* padding-top: 250px; */
        /*border-right: 1px solid #004aad;
        border-radius: 10% 30% 50% 70%; border-radius: 20px;*/
        background: #004aad;
    `,
    layout: css`
        padding: 100px;
        background: white;
        border: 1px solid black;
    `,
    name: css`
        display: 'inline';
        width: 'calc(50% - 8px)';
        margin: '0 8px';
    `,
    cancel: css`
        color: red;
        border: 1px red solid;
    `
}));