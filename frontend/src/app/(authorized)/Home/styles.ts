import { createStyles } from 'antd-style';

export const useStyles = createStyles(({css, cx}) => ({
    list: css`
        width: 800px;
    `,
    content: css`
        width: 100%;
    `,
    right: css`
        width: 100%;
        background: #d0e1e1;
    `,
    border: css`
        border: 1px solid blue;
    `,
    bgwhite: css`
        background: white;
    `,
}));