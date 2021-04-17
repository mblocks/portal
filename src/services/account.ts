
import { request } from 'umi';

export async function accountLogin({ data }): Promise<any> {
    console.log(data);
    return request(`/api/login`, {
        method: 'post',
        data,
        getResponse: true,
        skipErrorHandler: true,
    }).catch(function(error) {
        return error;
    });
}


export async function accountInfo(): Promise<any> {
    const result = request(`/api/userinfo`, {
        skipErrorHandler: true,
      }).catch(function(error) {
        return null
    });
    return result
}
