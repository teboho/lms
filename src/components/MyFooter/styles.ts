import { createStyles } from 'antd-style';

// const useStyles = () => {
//     const footer = "footer";
//     return {
//         styles: {
//             footer
//         }
//     };
// }

export const useMainStyles = createStyles(({ css, cx }) => ({
  // normal css through css string templates
  footer: css`
    color: red;
  `,
}));
