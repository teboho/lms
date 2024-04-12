import { createStyles } from 'antd-style';

export const useStyles = createStyles(({css, cx}) => ({
    logo: css`
        padding-top: 25px;
    `,
    navbar: css`
        background: #d0e1e1;
        padding: 0 50px;
    `,
    search: css`
        max-width: 350px;
    `,
    flex: css`
        gap: 50px;
    `,
    sticky: css`
        position: sticky;
        top: 0;
    `,
    opaque: css`
        bakground: #004aad;
    `
}));