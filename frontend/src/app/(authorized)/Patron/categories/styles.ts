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
    hoverable: css`
        &:hover {
            background-color: #f0f0f0;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
    `,
    padding: css`  
        padding: 10px;
    `,
}));