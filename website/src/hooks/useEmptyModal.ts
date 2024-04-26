import { Modal } from 'antd';
import { history, useLocation } from 'umi';

export const useEmptyModal = () => {
  const [modal, contextHolder] = Modal.useModal();
  const location = useLocation();

  const goBack = () => {
    if (location.pathname.includes('/builder/') || location.pathname.includes('/app/')) {
      history.push({ pathname: `/project` });
    } else {
      history.push({ pathname: `/case` });
    }
  };

  return {
    emptyModal: (title: string, backUp = goBack) => {
      let secondsToGo = 5;
      // eslint-disable-next-line prefer-const
      let timer: NodeJS.Timer | undefined;
      // eslint-disable-next-line prefer-const
      let timeout: NodeJS.Timeout | undefined;

      const _modal = modal.warning({
        title: title,
        content: `${secondsToGo} 秒后会自动退到上一页面。`,
        onOk: () => {
          if (timer) {
            clearInterval(timer);
          }
          if (timeout) {
            clearTimeout(timeout);
          }

          backUp();
        },
      });

      // eslint-disable-next-line prefer-const
      timer = setInterval(() => {
        secondsToGo -= 1;
        _modal.update({
          content: `${secondsToGo} 秒后自动会退到上一页面。`,
        });
      }, 1000);

      // eslint-disable-next-line prefer-const
      timeout = setTimeout(() => {
        clearInterval(timer);
        _modal.destroy();
        backUp();
      }, secondsToGo * 1000);
    },
    emptyContextHolder: contextHolder,
  };
};
