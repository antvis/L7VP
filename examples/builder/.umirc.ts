import { defineConfig } from 'umi';

export default defineConfig({
  routes: [
    { path: '/', component: 'Project' },
    { path: '/builder/:id', component: 'Builder' },
    { path: '/app/:id', component: 'App' },
  ],
  npmClient: 'npm',
});
