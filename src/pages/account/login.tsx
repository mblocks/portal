import React from 'react';
import { Link, useModel, useLocation, Redirect } from 'umi';
import { Tabs } from 'antd';
import ProForm, { ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { accountLogin, accountJoin } from '@/services/account';
import { formatErrors } from '@/utils';
import styles from './login.less';

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { title, description, logo, userinfo } = initialState;
  const location = useLocation();
  const [loginForm] = ProForm.useForm();
  const [joinForm] = ProForm.useForm();

  if (userinfo) {
    return <Redirect to={location.query.redirect} />;
  }

  return (
    <div className={styles.main}>
      <h1 style={{ textAlign: 'center' }}>
        <img
          style={{ height: '44px', marginRight: 16 }}
          alt="logo"
          src={logo}
        />
        {title}
      </h1>
      <div
        style={{
          marginTop: 12,
          textAlign: 'center',
          marginBottom: 40,
        }}
      >
        {description}
      </div>
      <Tabs>
        <Tabs.TabPane tab="登录" key="login">
          <ProForm
            form={loginForm}
            onFinish={async (data) => {
              const result = await accountLogin({ data });
              if (result.response.status == 200) {
                setInitialState(result.data);
              } else {
                loginForm.setFields(formatErrors(result.data));
              }
            }}
            submitter={{
              searchConfig: { submitText: '登录' },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                size: 'large',
                style: { width: '100%' },
              },
            }}
          >
            <ProFormText
              fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
              name={['user_name']}
              placeholder="请输入用户名"
              rules={[{ required: true, message: '请输入用户名!' }]}
            />
            <ProFormText.Password
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              name={['password']}
              placeholder="请输入密码"
              rules={[{ required: true, message: '请输入密码!' }]}
            />
            <div style={{ marginBottom: 24 }}>
              <ProFormCheckbox noStyle name="autoLogin">
                自动登录
              </ProFormCheckbox>
              <Link style={{ float: 'right' }} to="/fetch_password">
                忘记密码
              </Link>
            </div>
          </ProForm>
        </Tabs.TabPane>
        <Tabs.TabPane tab="注册" key="join">
          <ProForm
            form={joinForm}
            onFinish={async (data) => {
              const result = await accountJoin({ data });
              if (result.response.status == 200) {
                setInitialState(result.data);
                location.href = '/';
              } else {
                joinForm.setFields(formatErrors(result.data));
              }
            }}
            submitter={{
              searchConfig: { submitText: '提交' },
              render: (_, dom) => dom.pop(),
              submitButtonProps: { size: 'large', style: { width: '100%' } },
            }}
          >
            <ProFormText
              fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
              name={['user_name']}
              placeholder="请输入用户名"
              rules={[{ required: true, message: '请输入用户名!' }]}
            />
            <ProFormText.Password
              fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
              name={['password']}
              placeholder="请输入密码"
              rules={[{ required: true, message: '请输入密码!' }]}
            />
            <ProFormText.Password
              fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
              dependencies={['password']}
              name={['confirm_password']}
              placeholder="请输入确认密码"
              rules={[
                { required: true, message: '请输入确认密码!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue(['password']) === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        'The two passwords that you entered do not match!',
                      ),
                    );
                  },
                }),
              ]}
            />
          </ProForm>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
