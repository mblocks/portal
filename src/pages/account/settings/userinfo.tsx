import { useEffect } from 'react';
import { useModel, useIntl } from 'umi';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, PageHeader } from 'antd';
import { getUserInfo, updateUserInfo } from '@/services/account';

export default () => {
  const intl = useIntl();
  const { initialState, setInitialState } = useModel('@@initialState');
  const [form] = ProForm.useForm();
  useEffect(() => {
    getUserInfo().then((res) => {
      form.setFieldsValue(res);
    });
  }, []);
  return (
    <>
      <PageHeader title={intl.formatMessage({ id: 'portal.profile.title' })} />
      <ProForm
        form={form}
        style={{ width: '50%' }}
        onFinish={async (values) => {
          const result = await updateUserInfo({ data: values });
          if (result.response.status == 200) {
            message.success(
              intl.formatMessage({ id: 'portal.messages.success' }),
            );
            setInitialState({
              ...initialState,
              userinfo: { ...initialState.userinfo, ...result.data },
            });
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
        <ProFormText
          fieldProps={{
            size: 'large',
          }}
          label={intl.formatMessage({ id: 'portal.profile.display_name' })}
          name={['display_name']}
          rules={[
            {
              required: true,
              message:
                intl.formatMessage({ id: 'portal.placeholder.input' }) +
                intl.formatMessage({ id: 'portal.profile.display_name' }),
            },
          ]}
        />
      </ProForm>
    </>
  );
};
