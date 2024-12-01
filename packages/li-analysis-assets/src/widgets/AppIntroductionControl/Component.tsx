import { CustomControl } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import classNames from 'classnames';
import { isEmpty } from 'lodash-es';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useEffect, useMemo, useRef } from 'react';
import type { Properties } from './registerForm';
import useStyle from './style';

const CLS_PREFIX = 'li-analysis-app-introduction';

export interface AppIntroductionControlProps extends Properties, ImplementWidgetProps {}

const AppIntroductionControl: React.FC<AppIntroductionControlProps> = (props) => {
  const { position, width, content } = props;
  const styles = useStyle();
  const informationRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill>();

  const isEffectiveContent = useMemo(() => {
    if (content && content.ops && Array.isArray(content.ops)) {
      const isExist = content.ops.find((item: { insert?: any }) => item.insert !== '\n');
      return isExist;
    }

    return false;
  }, [content]);

  useEffect(() => {
    const quill = new Quill(informationRef.current!, {
      modules: {},
      theme: 'bubble',
    });
    quill.enable(false);
    quillRef.current = quill;
  }, []);

  useEffect(() => {
    if (quillRef.current && isEffectiveContent) {
      // @ts-ignore
      quillRef.current.setContents(content);
    }
  }, [isEffectiveContent]);

  return (
    <CustomControl
      position={position}
      className={classNames(styles.appIntroduction, CLS_PREFIX)}
      style={{ display: isEmpty(isEffectiveContent) ? 'none' : 'block' }}
    >
      <div style={{ width }} ref={informationRef} />
    </CustomControl>
  );
};

export default AppIntroductionControl;
