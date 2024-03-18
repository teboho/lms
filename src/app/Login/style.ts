import { createStyles } from 'antd-style';

export const useMainStyles = createStyles(({css, cx}) => ({
    border: css`
        border: 1px solid #004aad;
    `,
    sider: css`
        margin: 100px;
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
    `
}));