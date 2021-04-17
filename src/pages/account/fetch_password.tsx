import React, { useState } from 'react';
import { history } from 'umi';
import { message, Button, Result } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { MailOutlined } from '@ant-design/icons';
import styles from './login.less';

const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

export default () => {
    const [hasSubmit, setHasSubmit] = useState(false);
    return (
        <div className={styles.main}>
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
            {hasSubmit ?
                <Result
                    status="success"
                    subTitle={<div style={{ color: 'rgba(0, 0, 0, 0.85)' }}>提交成功！请注意查收您的邮箱</div>}
                    extra={[<Button type="primary" onClick={() => history.push('/login')} key="console">返回登录</Button>]}
                /> : <ProForm
                    title="找回密码"
                    onFinish={async (values) => {
                        await waitTime(2000);
                        message.success('提交成功');
                        setHasSubmit(true);
                    }}
                    submitter={{
                        searchConfig: { submitText: '提交' },
                        render: (_, dom) => dom.pop(),
                        submitButtonProps: { size: 'large', style: { width: '100%' } },
                    }}
                >

                    <div style={{ marginTop: 40, marginBottom: 20 }} >
                        请输入邮箱地址，获取重置密码的链接。
                        </div>
                    <ProFormText
                        fieldProps={{
                            size: 'large',
                            prefix: <MailOutlined />,
                        }}
                        name={['email']}
                        placeholder="请输入邮箱"
                        rules={[
                            {
                                required: true,
                                message: '请输入邮箱!',
                            },
                            { type: 'email', message: '请输入正确的邮箱格式', validateTrigger: 'onBlur' }
                        ]}
                    />
                </ProForm>}
        </div>
    );
};
