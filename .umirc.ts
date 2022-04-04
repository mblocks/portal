import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  locale: {
    antd: true,
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
    {
      path: '/',
      component: '@/layouts/SecurityLayout',
      routes: [
        {
          path: '/settings',
          component: '@/pages/account/settings/layout',
          routes: [
            {
              path: '/settings',
              component: '@/pages/account/settings/userinfo',
            },
            {
              path: '/settings/security',
              component: '@/pages/account/settings/security',
            },
          ],
        },
        { path: '/', component: '@/pages/index' },
        { component: '@/pages/404' },
      ],
    },
  ],
  fastRefresh: {},
});
