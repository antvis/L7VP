import { defineConfig } from 'umi';

export default defineConfig({
  history: {
    type: 'hash',
  },
  routes: [
    { path: '/', component: 'Project' },
    { path: '/builder/:id', component: 'Builder' },
    { path: '/app/:id', component: 'App' },
  ],
});
