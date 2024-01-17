import { css } from '@emotion/css';
import { useAntdToken } from '../../hooks';

const useStyle = () => {
  const { antCls, colorSplit, colorPrimaryText, colorTextSecondary, borderRadius } = useAntdToken();

  return {
    mapSetting: css`
      display: flex;
      justify-content: space-between;
      padding-top: 10px !important;

      ${antCls}-form-item {
        margin-bottom: 10px !important;
      }

      ,
      ${antCls}-input-number {
        width: 100px;
      }
    `,

    settingDesc: css`
      margin-bottom: 0;
      color: ${colorTextSecondary};
      font-size: 12px;
    `,

    settingBtn: css`
      width: 100%;
      margin-bottom: 10px;
    `,

    mapContent: css`
      display: flex;
      align-items: center;
    `,

    selectMapCenter: css`
      display: flex;
      justify-content: flex-end;
      margin-bottom: 20px;
    `,

    selectMapCenterText: css`
      color: ${colorPrimaryText};
    `,

    mapType: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,

    viewMode: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
    `,

    viewAngle: css`
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    `,

    viewAngleItem: css`
      display: flex;
      align-items: center;
    `,
    viewAngleItemInput: css`
      display: flex;
      justify-content: space-between;
      width: 100px;
      margin-left: 10px;
    `,

    settingStyle: css`
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      max-height: 250px;
      margin-top: 10px;
      overflow-y: auto;
    `,

    settingStyleContent: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 12px 12px 0;
      cursor: pointer;

      &:hover {
        box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08),
          0 9px 28px 8px rgba(0, 0, 0, 0.05);
      }
    `,

    settingStyleItem: css`
      border: solid 1px ${colorSplit};
      border-radius: ${borderRadius}px;

      &:nth-child(3n) {
        margin-right: 0;
      }
    `,

    settingStyleItemActive: css`
      box-sizing: content-box;
      border: solid 1px ${colorPrimaryText};
      border-radius: 4px;
    `,

    settingStyleItemText: css`
      display: flex;
      flex-direction: column;
      align-items: center;
    `,
    settingStyleItemTextActive: css`
      display: flex;
      flex-direction: column;
      align-items: center;
      color: ${colorPrimaryText};
    `,

    settingStyleItemImg: css`
      border-radius: ${borderRadius}px;
    `,
  };
};

export default useStyle;
