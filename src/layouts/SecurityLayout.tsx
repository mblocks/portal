import { useModel, Redirect, Link } from 'umi';
import { stringify } from 'querystring';
import ProLayout, { DefaultFooter } from '@ant-design/pro-layout';
import RightConent from '@/components/GlobalHeader/RightConent';

export default ({ children }) => {
  const { initialState, loading } = useModel('@@initialState');
  const { userinfo, title, logo } = initialState;
  const { pathname, search } = location;
  const queryString = stringify({
    redirect: pathname + search,
  });

  if (!userinfo) {
    return <Redirect to={`/login?${queryString}`} />;
  }

  return (
    <ProLayout
      title={title}
      logo={logo}
      loading={loading}
      menuHeaderRender={(logo, title) => (
        <Link to="/">
          {logo} {title}
        </Link>
      )}
      layout="top"
      navTheme="light"
      footerRender={() => <DefaultFooter copyright="Mblocks" links={[]} />}
      rightContentRender={RightConent}
    >
      {children}
    </ProLayout>
  );
};
