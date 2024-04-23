import type { LIEditor } from '@antv/li-editor';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'umi';

export const useEditorNavbarKey = (liEditor: LIEditor) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultNavbarKey = searchParams.get('nav') || 'datasets';
  const [activeNavbarKey, setSctiveNavbarKey] = useState(defaultNavbarKey);

  useEffect(() => {
    const onSelectedNav = (key: string) => {
      searchParams.set('nav', key);
      setSearchParams(searchParams);
      setSctiveNavbarKey(key);
    };

    liEditor.on('select-nav-menu', onSelectedNav);
    return () => {
      liEditor.off('select-nav-menu', onSelectedNav);
    };
  }, [liEditor, searchParams, setSearchParams]);

  return activeNavbarKey;
};
