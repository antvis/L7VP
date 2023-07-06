import type { ImplementEditorWidgetProps } from '@antv/li-editor';
import React from 'react';
import { history } from 'umi';
import styles from './NavLogo.less';

type NavLogoProps = ImplementEditorWidgetProps;

const NavLogo: React.FC<NavLogoProps> = (props) => {
  const onClickLogo = () => {
    history.push('/');
  };

  return (
    <div className={styles.logo} onClick={onClickLogo}>
      <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*xuDWR7uXkbkAAAAAAAAAAAAADmJ7AQ/original" />
    </div>
  );
};

export default NavLogo;
