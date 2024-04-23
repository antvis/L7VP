import type { ImplementEditorWidgetProps } from '@antv/li-editor';
import React from 'react';
import { history } from 'umi';
import classNames from 'classnames';
import { usePrefixCls } from '../../hooks';
import useStyle from './NavLogoStyle';
import { SITE_LOGO } from '@/constants';

type NavLogoProps = ImplementEditorWidgetProps;

const NavLogo: React.FC<NavLogoProps> = (props) => {
  const prefixCls = usePrefixCls('logo');
  const styles = useStyle();

  const onClickLogo = () => {
    history.push('/project');
  };

  return (
    <div className={classNames(prefixCls, styles.logo)} onClick={onClickLogo}>
      <img src={SITE_LOGO} />
    </div>
  );
};

export default NavLogo;
