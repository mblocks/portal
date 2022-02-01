import { request } from 'umi';
import { formatErrors } from '@/utils';

function fixedUserinfo(value) {
  const fixedApps = value.apps.map((v) => ({
    ...v,
    name: v.name == 'origin' ? 'admin' : v.name,
  }));
  return {
    ...value,
    admin: fixedApps.filter((v) => v.name == 'admin').length > 0,
    apps: fixedApps,
  };
}

export async function accountLogin({ data }): Promise<any> {
  const { userinfo, ...res } = await request(`/api/welcome/login`, {
    method: 'post',
    data,
    skipErrorHandler: true,
  }).catch(function (error) {
    return { errors: formatErrors(error.data) };
  });
  if (!userinfo) {
    return res;
  }
  return {
    ...res,
    userinfo: fixedUserinfo(userinfo),
  };
}

export async function accountJoin({ data }): Promise<any> {
  return request(`/api/welcome/join`, {
    method: 'post',
    data,
    skipErrorHandler: true,
  }).catch(function (error) {
    return { errors: formatErrors(error.data) };
  });
}

export async function updatePassword({ data }): Promise<any> {
  return request(`/api/settings/security/password`, {
    method: 'post',
    data,
    skipErrorHandler: true,
  }).catch(function (error) {
    return { errors: formatErrors(error.data) };
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
  const { userinfo, ...res } = await request(`/api/userinfo`, {
    skipErrorHandler: true,
  }).catch(function () {
    return request(`/api/welcome`);
  });
  if (!userinfo) {
    return res;
  }
  return {
    ...res,
    userinfo: fixedUserinfo(userinfo),
  };
}
