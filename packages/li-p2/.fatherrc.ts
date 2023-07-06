import { defineConfig } from 'father';
import { getUMDConfig } from '../../scripts/fatherrc.base';

const isBundle = process.env.BUNDLE_ENV !== 'bundless' && process.env.NODE_ENV === 'production';

export default defineConfig({
  extends: '../../.fatherrc.base.ts',
  umd: isBundle ? getUMDConfig('LIP2') : undefined,
});
