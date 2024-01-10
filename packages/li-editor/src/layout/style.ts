import { css } from '@emotion/css';
import { useAntdToken } from '../hooks';

const useStyle = () => {
  const { colorBgContainer, colorSplit, colorText, colorTextSecondary, borderRadius } = useAntdToken();

  return {
    editorLayout: css`
      position: relative;
      display: flex;

      /* 滚动条整体部分,必须要设置 */
      ::-webkit-scrollbar {
        width: 7px;
        height: 7px;
        appearance: none;
      }

      /* 滚动条的滑块按钮 */
      ::-webkit-scrollbar-thumb {
        background: ${colorSplit};
        border-radius: 3px;
        cursor: pointer;

        &:hover {
          background-color: ${colorSplit};
        }
      }

      /* 滚动条的轨道 */
      ::-webkit-scrollbar-track {
        background: none;
        border-radius: 0;
      }
    `,

    loading: css`
      position: absolute;
      top: 30px;
      left: 50%;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 180px;
      margin-left: 50px;
      padding: 15px;
      color: ${colorTextSecondary};
      background-color: ${colorBgContainer};
      border-radius: ${borderRadius};
    `,

    left: css`
      position: relative;
      display: flex;
      color: ${colorText};
    `,

    sideNav: css`
      z-index: 2;
    `,

    sidePanel: css`
      z-index: 1;
      width: 350px;
      transition: width 50ms ease 0s;

      &_hidden {
        width: 0;
        visibility: hidden;
      }
    `,

    sidePanelHidden: css`
      width: 0;
      visibility: hidden;
    `,

    cavans: css`
      flex: 1;
      overflow: hidden;
      text-align: center;
      transition: width 50ms ease 0s;
    `,
  };
};

export default useStyle;
