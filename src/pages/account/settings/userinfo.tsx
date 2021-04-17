import ProForm, { ProFormText } from '@ant-design/pro-form';
import { message, PageHeader } from 'antd';

export default () => {
    return (<>
        <PageHeader title="用户信息" />
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
            <ProFormText
                fieldProps={{
                    size: 'large'
                }}
                label="昵称"
                name={['display_name']}
                placeholder="请输入昵称"
                rules={[
                    {
                        required: true,
                        message: '请输入昵称!',
                    }
                ]}
            />

        </ProForm></>
    );
}
