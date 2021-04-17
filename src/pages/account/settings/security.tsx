import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, PageHeader } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

export default () => {
    return (<>
        <PageHeader title="设置密码" />
        <ProForm
            style={{ width: '50%' }}
            onFinish={async (values) => {
                console.log(values);
                message.success('修改成功');
            }}
            submitter={{
                searchConfig: {
                    submitText: '保存',
                },
                render: (_, dom) => dom.pop(),
                submitButtonProps: {
                    size: 'large',
                },
            }}
        >
            <ProFormText.Password
                fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                }}
                name={['password']}
                placeholder="请输入新密码"
                rules={[
                    {
                        required: true,
                        message: '请输入新密码!',
                    }
                ]}
            />
            <ProFormText.Password
                fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined />,
                }}
                dependencies={['password']}
                name={['confirm_password']}
                placeholder="请再次输入新密码"
                rules={[
                    {
                        required: true,
                        message: '请再次输入新密码!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue(['password']) === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),
                ]}
            />
        </ProForm></>
    );
}
