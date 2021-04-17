import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  qiankun: {
    master: {
      apps: [],
    },
  },
  routes: [
    { path: '/login', component: '@/pages/account/login' },
    { path: '/fetch_password', component: '@/pages/account/fetch_password' },
    { path: '/reset_password', component: '@/pages/account/reset_password' },
    { path: '/', component: '@/layouts/SecurityLayout',
      routes:[
       {  path: '/', component: '@/pages/index' }
      ]
    },
  ],
  fastRefresh: {},
});
