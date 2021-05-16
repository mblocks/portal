import { useEffect } from 'react';
import { useModel } from 'umi';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, PageHeader } from 'antd';
import { getUserInfo, updateUserInfo } from '@/services/account';

export default () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [form] = ProForm.useForm();
  useEffect(() => {
    getUserInfo().then((res) => {
      form.setFieldsValue(res);
    });
  }, []);
  return (
    <>
      <PageHeader title="用户信息" />
      <ProForm
        form={form}
        style={{ width: '50%' }}
        onFinish={async (values) => {
          const result = await updateUserInfo({ data: values });
          if (result.response.status == 200) {
            message.success('修改成功');
            setInitialState({
              ...initialState,
              userinfo: { ...initialState.userinfo, ...result.data },
            });
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
        <ProFormText
          fieldProps={{
            size: 'large',
          }}
          label="昵称"
          name={['display_name']}
          placeholder="请输入昵称"
          rules={[
            {
              required: true,
              message: '请输入昵称!',
            },
          ]}
        />
      </ProForm>
    </>
  );
};
