import { accountInfo } from '@/services/account';


async function getInitialData() {
  const user = await accountInfo();
  return { user };
}

const initData = getInitialData();

export async function getInitialState() {
  return initData;
}

export const qiankun = initData;

