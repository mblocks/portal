import { useModel, history, useIntl } from 'umi';
import { Row, Col, Card, Avatar } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { userinfo } = initialState || {};
  return (
    <PageContainer title={intl.formatMessage({ id: 'portal.index.title' })}>
      <Row gutter={[16, 16]}>
        {userinfo.apps.map((v) => (
          <Col key={v.name} xs={24} sm={12} md={12} lg={6} xl={6}>
            <Card
              hoverable
              onClick={() => {
                history.push(`/${v.name}`);
              }}
            >
              <Card.Meta
                avatar={
                  <Avatar
                    {...(v.logo
                      ? { src: v.logo }
                      : { icon: <PictureOutlined /> })}
                  />
                }
                title={v.title || v.name}
                description={v.description || <>&nbsp;</>}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </PageContainer>
  );
};
