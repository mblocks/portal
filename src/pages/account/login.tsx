import React from 'react';
import { Link, useModel, useLocation, Redirect, useIntl } from 'umi';
import { Tabs } from 'antd';
import ProForm, { ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { accountLogin, accountJoin } from '@/services/account';
import styles from './login.less';

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { title, description, logo, userinfo } = initialState;
  const intl = useIntl();
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
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'portal.login.title' })}
          key="login"
        >
          <ProForm
            form={loginForm}
            onFinish={async (data) => {
              const result = await accountLogin({ data });
              if (result.errors) {
                loginForm.setFields(result.errors);
              } else {
                window.location.reload(true);
              }
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({ id: 'portal.actions.login' }),
              },
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
              placeholder={intl.formatMessage({ id: 'portal.login.username' })}
              rules={[
                {
                  required: true,
                  message:
                    intl.formatMessage({ id: 'portal.placeholder.input' }) +
                    intl.formatMessage({ id: 'portal.login.username' }),
                },
              ]}
            />
            <ProFormText.Password
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined />,
              }}
              name={['password']}
              placeholder={intl.formatMessage({ id: 'portal.login.password' })}
              rules={[
                {
                  required: true,
                  message:
                    intl.formatMessage({ id: 'portal.placeholder.input' }) +
                    intl.formatMessage({ id: 'portal.login.password' }),
                },
              ]}
            />
            <div style={{ marginBottom: 24 }}>
              <ProFormCheckbox noStyle name="autoLogin">
                {intl.formatMessage({ id: 'portal.login.rememberme' })}
              </ProFormCheckbox>
              <Link style={{ float: 'right' }} to="/fetch_password">
                {intl.formatMessage({ id: 'portal.forgot.title' })}
              </Link>
            </div>
          </ProForm>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={intl.formatMessage({ id: 'portal.join.title' })}
          key="join"
        >
          <ProForm
            form={joinForm}
            onFinish={async (data) => {
              const result = await accountJoin({ data });
              if (result.errors) {
                joinForm.setFields(result.errors);
              } else {
                setInitialState(result);
                location.href = '/';
              }
            }}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({ id: 'portal.actions.join' }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: { size: 'large', style: { width: '100%' } },
            }}
          >
            <ProFormText
              fieldProps={{ size: 'large', prefix: <UserOutlined /> }}
              name={['user_name']}
              placeholder={intl.formatMessage({ id: 'portal.login.username' })}
              rules={[
                {
                  required: true,
                  message:
                    intl.formatMessage({ id: 'portal.placeholder.input' }) +
                    intl.formatMessage({ id: 'portal.login.username' }),
                },
              ]}
            />
            <ProFormText.Password
              fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
              name={['password']}
              placeholder={intl.formatMessage({ id: 'portal.login.password' })}
              rules={[
                {
                  required: true,
                  message:
                    intl.formatMessage({ id: 'portal.placeholder.input' }) +
                    intl.formatMessage({ id: 'portal.login.password' }),
                },
              ]}
            />
            <ProFormText.Password
              fieldProps={{ size: 'large', prefix: <LockOutlined /> }}
              dependencies={['password']}
              name={['confirm_password']}
              placeholder={intl.formatMessage({
                id: 'portal.join.confirm_password',
              })}
              rules={[
                {
                  required: true,
                  message:
                    intl.formatMessage({ id: 'portal.placeholder.input' }) +
                    intl.formatMessage({ id: 'portal.join.confirm_password' }),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue(['password']) === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        intl.formatMessage({
                          id: 'portal.join.not_match_password',
                        }),
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
