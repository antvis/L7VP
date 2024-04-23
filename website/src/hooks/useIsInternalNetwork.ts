import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { ping } from '@/utils/internal';

const L7VP_DOT_NOT_SHOW_PROMPT_MODAL = 'L7VP_DOT_NOT_SHOW_PROMPT_MODAL';
let pingDeferrer: PromiseLike<boolean>;

export function useIsInternalNetwork() {
  const [isInternalNetwork, setIsInternalNetwork] = useState(false);

  useEffect(() => {
    pingDeferrer ??= new Promise<boolean>((resolve) => {
      ping((status) => {
        if (status !== 'timeout' && status !== 'error') {
          return resolve(true);
        }

        return resolve(false);
      });
    });
    pingDeferrer.then(setIsInternalNetwork);
  }, []);

  return isInternalNetwork;
}

export function useInternalUserPrompt() {
  const isExternalURL = ['li.antv.antgroup.com', 'locationinsight.antv.antgroup.com'].includes(
    window.location.hostname,
  );
  const isInternalNetwork = useIsInternalNetwork();
  const [modal, contextHolder] = Modal.useModal();
  const isInternalUserToExternalURL = isExternalURL && isInternalNetwork;

  useEffect(() => {
    if (!isInternalUserToExternalURL) return;
    const lastShowTime = window.localStorage.getItem(L7VP_DOT_NOT_SHOW_PROMPT_MODAL);
    if (
      lastShowTime &&
      lastShowTime !== 'true' &&
      Date.now() - new Date(lastShowTime).getTime() < 5 * 24 * 60 * 60 * 1000
    ) {
      return;
    }

    const onCancel = () => {
      window.localStorage.setItem(L7VP_DOT_NOT_SHOW_PROMPT_MODAL, new Date().toISOString());
    };
    const onOk = () => {
      const url = window.location.href.replace(window.location.host, 'li.antgroup-inc.cn');
      window.location.replace(url);
    };

    modal.confirm({
      icon: null,
      title: '提示',
      content: '内网用户推荐访问内网版以获得完整的功能体验～',
      cancelText: '5 天内不再显示',
      okText: '立即前往',
      onCancel,
      onOk,
    });
  }, [isInternalUserToExternalURL]);

  return contextHolder;
}
