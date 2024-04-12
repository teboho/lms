import { createStyles } from 'antd-style';

export const useStyles = createStyles(({css, cx}) => ({
    list: css`
        width: 800px;
    `,
    content: css`
        width: 100%;
        padding-right: 20px;
        padding-left: 20px;
    `,
    right: css`
        width: 100%;
        background: white;
    `,
    border: css`
        border: 1px solid blue;
    `,
    bgwhite: css`
        background: white;
    `,
    sticky: css`
        position: sticky;
        top: 0px;
    `,
    bgblue: css`
        background: #d0e1e1;
    `
}));