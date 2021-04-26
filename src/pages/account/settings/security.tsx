import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, PageHeader } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { updatePassword } from '@/services/account';

export default () => {
    return (<>
        <PageHeader title="设置密码" />
        <ProForm
            style={{ width: '50%' }}
            onFinish={async (values) => {
                const result = await updatePassword({ data:values })
                if(result.response.status == 200){
                    message.success('修改成功');
                }
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
                label="旧密码"
                placeholder=""
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
                name={['new_password']}
                label="请输入新密码"
                placeholder=""
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
                dependencies={['new_password']}
                name={['confirm_new_password']}
                label="请再次输入新密码"
                placeholder=""
                rules={[
                    {
                        required: true,
                        message: '请再次输入新密码!',
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue(['new_password']) === value) {
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
