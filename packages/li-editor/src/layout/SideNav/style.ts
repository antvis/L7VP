import { css } from '@emotion/css';
import { useAntdToken } from '../../hooks';

const useStyle = () => {
  const { colorBgContainer } = useAntdToken();

  return {
    sideNav: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 46px;
      background-color: ${colorBgContainer};
    `,

    sideNavMenu: css`
      margin-top: 0;
    `,

    sideNavBottom: css`
      margin-top: auto;
      padding-bottom: 25px;
    `,
  };
};

export default useStyle;
