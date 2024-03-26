import { createStyles } from 'antd-style';

export const useMainStyles = createStyles(({ css, cx }) => ({
  // normal css through css string templates
  footer: css`
    color: red;
  `,
}));
