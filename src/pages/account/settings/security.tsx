import { useIntl } from 'umi';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, PageHeader } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { updatePassword } from '@/services/account';

export default () => {
  const [form] = ProForm.useForm();
  const intl = useIntl();
  return (
    <>
      <PageHeader title={intl.formatMessage({ id: 'portal.security.title' })} />
      <ProForm
        form={form}
        style={{ width: '50%' }}
        onFinish={async (values) => {
          const result = await updatePassword({ data: values });
          if (result.errors) {
            form.setFields(result.errors);
          } else {
            message.success(
              intl.formatMessage({ id: 'portal.messages.success' }),
            );
          }
        }}
        submitter={{
          searchConfig: {
            submitText: intl.formatMessage({ id: 'portal.actions.save' }),
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
          label={intl.formatMessage({ id: 'portal.security.old_password' })}
          placeholder=""
          rules={[
            {
              required: true,
              message:
                intl.formatMessage({ id: 'portal.placeholder.input' }) +
                intl.formatMessage({ id: 'portal.security.old_password' }),
            },
          ]}
        />
        <ProFormText.Password
          fieldProps={{
            size: 'large',
            prefix: <LockOutlined />,
          }}
          name={['new_password']}
          label={intl.formatMessage({ id: 'portal.security.new_password' })}
          placeholder=""
          rules={[
            {
              required: true,
              message:
                intl.formatMessage({ id: 'portal.placeholder.input' }) +
                intl.formatMessage({ id: 'portal.security.new_password' }),
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
          label={intl.formatMessage({ id: 'portal.security.confirm_password' })}
          placeholder=""
          rules={[
            {
              required: true,
              message:
                intl.formatMessage({ id: 'portal.placeholder.input' }) +
                intl.formatMessage({ id: 'portal.security.confirm_password' }),
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
