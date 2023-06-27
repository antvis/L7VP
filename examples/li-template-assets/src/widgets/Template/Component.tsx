import type { ImplementWidgetProps } from '@antv/li-sdk';
import { Button } from 'antd';
import React from 'react';
import type { Properties } from './registerForm';
import { useStyle } from './style';

export interface TemplateProps extends Properties, ImplementWidgetProps {}

const Template: React.FC<TemplateProps> = (props) => {
  const styles = useStyle();

  return (
    <div className={styles.templateControl}>
      <h3>TemplateControl</h3>
      <Button>Hello World</Button>
    </div>
  );
};

export default Template;
