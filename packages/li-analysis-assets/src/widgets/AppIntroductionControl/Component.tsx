import { CustomControl } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import classNames from 'classnames';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useEffect, useRef } from 'react';
import type { Properties } from './registerForm';
import useStyle from './style';

const CLS_PREFIX = 'li-analysis-app-introduction';

export interface AppIntroductionControlProps extends Properties, ImplementWidgetProps {}

const AppIntroductionControl: React.FC<AppIntroductionControlProps> = (props) => {
  const { position, width, content } = props;
  const styles = useStyle();
  const informationRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill>();

  useEffect(() => {
    const quill = new Quill(informationRef.current!, {
      modules: {},
      theme: 'bubble',
    });
    quill.enable(false);
    quillRef.current = quill;
  }, []);

  useEffect(() => {
    if (content && quillRef.current) {
      // @ts-ignore
      quillRef.current.setContents(content);
    }
  }, [content]);

  return (
    <CustomControl position={position} className={classNames(styles.appIntroduction, CLS_PREFIX)}>
      <div style={{ width }} ref={informationRef} />
    </CustomControl>
  );
};

export default AppIntroductionControl;
