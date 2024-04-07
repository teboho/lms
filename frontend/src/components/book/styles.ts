import { createStyles } from 'antd-style';

export const useStyles = createStyles(({css, cx}) => ({
    logo: css`
        padding-top: 25px;
    `,
    navbar: css`
        background: red;
    `,
    search: css`
        max-width: 350px;
    `,
    flex: css`
        gap: 50px;
    `, 
    maxHeight: css`
        height: 500px;
        max-height: 500px;
    `,
    // at the bottom of the parent div
    buttons: css`
        position: absolute;
        bottom: 5px;
    `
}));