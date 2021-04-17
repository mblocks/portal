import { accountInfo } from '@/services/account';


async function getInitialData() {
  const currentUser = await accountInfo();
  return { currentUser };
}

const initData = getInitialData();

export async function getInitialState() {
  return initData;
}

export const qiankun = initData;

