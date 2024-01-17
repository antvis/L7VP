import { css } from '@emotion/css';
import { useAntdToken } from '../../../../../hooks';
import { LayerIconBg } from './constant';

const useStyle = () => {
  const { colorPrimaryActive, colorPrimaryHover, borderRadius } = useAntdToken();

  return {
    dropDown: css`
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      max-height: 280px;
      padding: 12px 5px;
      overflow-y: auto;
    `,

    selectItem: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 60px;
      margin: 5px 0;
      cursor: pointer;
    `,

    itemIcon: css`
      width: 50px;
      height: 50px;
      line-height: 50px;
      color: rgb(106 116 133);
      background-image: url(${LayerIconBg});
      background-repeat: no-repeat;
      border-radius: @border-radius;
      font-size: 50px;

      :hover {
        color: ${colorPrimaryHover};
      }
    `,
    itemIconSelected: css`
      color: ${colorPrimaryActive};
    `,

    itemLabel: css`
      height: 20px;
      line-height: 20px;
      text-align: center;
    `,

    selectedOption: css`
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      margin: 0;
    `,

    selectedIcon: css`
      width: 22px;
      height: 22px;
      line-height: 22px;
      color: ${colorPrimaryActive};
      background-image: url(${LayerIconBg});
      background-repeat: no-repeat;
      background-size: 22px 22px;
      border-radius: ${borderRadius}px;
      font-size: 22px;
    `,

    selectedLabel: css`
      margin-left: 12px;
    `,
  };
};

export default useStyle;
