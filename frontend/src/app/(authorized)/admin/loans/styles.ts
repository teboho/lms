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
    padding: css`
        padding: 0;
    `,
    blue: css`
        background: #004AAD;
        color: #fff
    `,
}));