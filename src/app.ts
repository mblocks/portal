import { initialData } from '@/services/account';

async function getInitialData() {
  const data = await initialData();
  const apps = [];
  const routes = [];
  if (data.userinfo && data.userinfo.apps) {
    data.userinfo.apps
      .map((v) => ({
        ...v,
        name: v.name == 'origin' ? 'admin' : v.name,
      }))
      .forEach((v) => {
        apps.push({
          ...v,
          entry: `/load/${v.name}`,
          props: { userinfo: data.userinfo },
        });
        routes.push({
          path: `/${v.name}`,
          microApp: v.name,
        });
      });
  }
  return {
    ...data,
    apps,
    routes,
  };
}

const initData = getInitialData();

export async function getInitialState() {
  return initData;
}

export const qiankun = initData;
