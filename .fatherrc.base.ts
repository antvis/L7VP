import { defineConfig } from 'father';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  esm: { output: 'dist/esm' },
  cjs: isProduction ? { output: 'dist/cjs' } : undefined,
});
