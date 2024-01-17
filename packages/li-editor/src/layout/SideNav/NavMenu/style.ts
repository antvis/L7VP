import { css } from '@emotion/css';
import { useAntdToken } from '../../../hooks';

const useStyle = () => {
  const { colorText, colorPrimaryTextActive } = useAntdToken();

  return {
    navMenu: css`
      width: 100%;
      margin: 0;
      padding: 0;
      text-align: center;
    `,

    menuItem: css`
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 10px 0;
      color: ${colorText};
      text-align: center;
      cursor: pointer;

      &::before {
        position: absolute;
        top: 0;
        bottom: 0;
        left: -3px;
        display: block;
        width: 3px;
        border-radius: 0 100px 100px 0;
        visibility: hidden;
        transition: left 0.4s ease-in;
        content: '';
      }
    `,

    menuItemActive: css`
      color: ${colorPrimaryTextActive};

      &::before {
        left: 0;
        background: ${colorPrimaryTextActive};
        visibility: visible;
      }
    `,

    menuItemIcon: css`
      padding: 4px 0;
      font-size: 18px;
      line-height: 1;
    `,

    menuItemTitle: css`
      padding: 2px 0;
      font-weight: bold;
      font-size: 12px;
      line-height: 1;
      white-space: nowrap;
    `,
  };
};

export default useStyle;
