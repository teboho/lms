import { createStyles } from 'antd-style';

export const useMainStyles = createStyles(({ css, cx }) => ({
  footer: css`
    color: red;
  `,
  padding: css`
    padding: 20px;
  `,
  border: css`
    height: 300px;
    border-radius: 20px;
    box-shadow: 2px 2px 5px grey;
  `, 
  image: css`
    width: 200px;
    height: 300px;
    object-fit: cover;
  `
}));
