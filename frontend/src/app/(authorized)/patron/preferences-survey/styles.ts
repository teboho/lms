import { createStyles } from 'antd-style';

export const useStyles = createStyles(({css, cx}) => ({
    list: css`
        width: 800px;
    `,
    content: css`
        width: 100%;
        border: 1px solid red;
    `,
    right: css`
        width: 100%;
        border: 1px solid red;
        background: white;
    `,
    center: css`
        align-items: center;
        text-align: center;
    `,
    padding: css`
        padding: 20px;
    `
}));