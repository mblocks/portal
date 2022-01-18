import { request } from 'umi';

export async function accountLogin({ data }): Promise<any> {
  return request(`/api/welcome/login`, {
    method: 'post',
    data,
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

export async function accountJoin({ data }): Promise<any> {
  return request(`/api/welcome/join`, {
    method: 'post',
    data,
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

export async function updatePassword({ data }): Promise<any> {
  return request(`/api/settings/security/password`, {
    method: 'post',
    data,
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

export async function updateUserInfo({ data }): Promise<any> {
  return request(`/api/settings/userinfo`, {
    method: 'post',
    data,
    getResponse: true,
    skipErrorHandler: true,
  }).catch(function (error) {
    return error;
  });
}

export async function getUserInfo(): Promise<any> {
  return request(`/api/settings/userinfo`);
}

export async function initialData(): Promise<any> {
  const res = await request(`/api/userinfo`).catch(function () {
    return request(`/api/welcome`);
  });
  return res;
}
