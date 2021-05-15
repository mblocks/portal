import { initialData } from '@/services/account';

async function getInitialData() {
  const data = await initialData();
  const apps = [];
  const routes = [];
  if (data.user && data.user.apps) {
    data.user.apps.forEach((v) => {
      apps.push({
        ...v,
        entry: `/load/${v.name}`,
        props: { user: data.user },
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
