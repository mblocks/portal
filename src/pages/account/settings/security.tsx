import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, PageHeader } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { updatePassword } from '@/services/account';
import { formatErrors } from '@/utils';

export default () => {
  const [form] = ProForm.useForm();

  return (
    <>
      <PageHeader title="Change password" />
      <ProForm
        form={form}
        style={{ width: '50%' }}
        onFinish={async (values) => {
          const result = await updatePassword({ data: values });
          if (result.response.status == 200) {
            message.success('修改成功');
          } else {
            form.setFields(formatErrors(result.data));
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
          label="Old password"
          placeholder=""
          rules={[
            {
              required: true,
              message: 'Please input old password!',
            },
          ]}
        />
        <ProFormText.Password
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
          }}
          name={['new_password']}
          label="New password"
          placeholder=""
          rules={[
            {
              required: true,
              message: 'Please input new password!',
            },
          ]}
        />
        <ProFormText.Password
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
          }}
          dependencies={['new_password']}
          name={['confirm_new_password']}
          label="Confirm new password"
          placeholder=""
          rules={[
            {
              required: true,
              message: 'Please input confirm new password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue(['new_password']) === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords that you entered do not match!'),
                );
              },
            }),
          ]}
        />
      </ProForm>
    </>
  );
};
