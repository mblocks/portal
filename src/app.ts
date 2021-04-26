import { initialData } from '@/services/account';


async function getInitialData() {
  return await initialData();
}

const initData = getInitialData();

export async function getInitialState() {
  return initData;
}

export const qiankun = initData;

