import { useModel, Redirect } from 'umi';
import { stringify } from 'querystring';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import RightConent from '@/components/GlobalHeader/RightConent';


export default ({ children }) => {
    const { initialState, loading } = useModel('@@initialState');
    const { user } = initialState;
    const { pathname, search } = location;
    const queryString = stringify({
        redirect: pathname + search
    });

    if (user == null) {
        return <Redirect to={`/login?${queryString}`} />;
    }

    return (
        <ProLayout
            title="helloworld"
            layout="top"
            navTheme="light"
            footerRender={() => <DefaultFooter copyright="Origins" links={[]} />}
            rightContentRender={RightConent}
        >
            {children}
        </ProLayout>);
}
