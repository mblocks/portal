import React, { useState } from 'react';
import { Link } from 'umi';
import { message, Tabs } from 'antd';
import ProForm, { ProFormText, ProFormCheckbox } from '@ant-design/pro-form';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { accountLogin } from '@/services/account';
import styles from './login.less';


export default () => {
    const [tabActive, setTabActive] = useState('login');

    return (
        <div className={styles.main}>
            <ProForm
                onFinish={async (values) => {
                    console.log(values[tabActive]);
                    const result = await accountLogin({ data:values[tabActive]});
                    message.success('提交成功');
                }}
                submitter={{
                    searchConfig: {
                        submitText: tabActive === 'login' ? '登录' : '提交',
                    },
                    render: (_, dom) => dom.pop(),
                    submitButtonProps: {
                        size: 'large',
                        style: {
                            width: '100%',
                        },
                    },
                }}
            >
                <h1 style={{ textAlign: 'center' }} >
                    <img style={{ height: '44px', marginRight: 16 }}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                    />
                    Ant Design
                </h1>
                <div
                    style={{
                        marginTop: 12,
                        textAlign: 'center',
                        marginBottom: 40,
                    }}
                >
                    Ant Design 是西湖区最具影响力的 Web 设计规范
                </div>
                <Tabs defaultActiveKey={tabActive} onChange={(v) => setTabActive(v)} >
                    <Tabs.TabPane tab="登录" key="login"></Tabs.TabPane>
                    <Tabs.TabPane tab="注册" key="join"></Tabs.TabPane> </Tabs>
                {tabActive === 'login' && <>
                    <ProFormText
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined />,
                        }}
                        name={['login', 'user_name']}
                        placeholder="请输入用户名"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            }
                        ]}
                    />
                    <ProFormText.Password
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined />,
                        }}
                        name={['login', 'password']}
                        placeholder="请输入密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            }
                        ]}
                    />
                    <div style={{ marginBottom: 24 }} >
                        <ProFormCheckbox noStyle name="autoLogin">自动登录</ProFormCheckbox>
                        <Link style={{ float: 'right' }} to="/fetch_password">忘记密码</Link>
                    </div>
                </>}
                {tabActive === 'join' && <>
                    <ProFormText
                        fieldProps={{
                            size: 'large',
                            prefix: <UserOutlined />,
                        }}
                        name={['join', 'user_name']}
                        placeholder="请输入用户名"
                        rules={[
                            {
                                required: true,
                                message: '请输入用户名!',
                            }
                        ]}
                    />
                    <ProFormText.Password
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined />,
                        }}
                        name={['join', 'password']}
                        placeholder="请输入密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码!',
                            }
                        ]}
                    />
                    <ProFormText.Password
                        fieldProps={{
                            size: 'large',
                            prefix: <LockOutlined />,
                        }}
                        dependencies={['join','password']}
                        name={['join', 'confirm_password']}
                        placeholder="请输入确认密码"
                        rules={[
                            {
                                required: true,
                                message: '请输入确认密码!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (!value || getFieldValue(['join','password']) === value) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                              }),
                        ]}
                    />
                </>}
            </ProForm>
        </div>
    );
};
