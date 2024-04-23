import { css } from '@emotion/css';
import { theme } from 'antd';

const useStyle = () => {
  const { useToken } = theme;
  const { token } = useToken();

  const { colorTextSecondary, colorPrimary } = token;

  return {
    components: css`
      padding: 15px 5px;
    `,

    components__content: css`
      position: relative;
      display: flex;
      align-items: center;
    `,

    components__content__img: css`
      span {
        font-size: 60px;

        svg {
          color: ${colorPrimary};
        }
      }
    `,

    components__content__right: css`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 80px;
      overflow: hidden;
      padding: 0 5px;
    `,

    components__content__right__header: css`
      display: flex;
      align-items: center;
    `,

    components__content__right__header__name: css`
      height: 22px;
      font-size: 14px;
    `,

    components__content__right__header__verson: css`
      margin-left: 4px;
      color: ${colorPrimary};
    `,

    components__content__right__description: css`
      height: 18px;
      overflow: hidden;
      color: ${colorTextSecondary};
      font-size: 13px;
      white-space: nowrap;
      text-overflow: ellipsis;
    `,

    components__content__right__package: css`
      color: ${colorTextSecondary};
      font-size: 12px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: -o-ellipsis-lastline;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      line-clamp: 1;
      -webkit-box-orient: vertical;
    `,
  };
};

export default useStyle;
