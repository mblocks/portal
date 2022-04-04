import { history, useLocation, useIntl } from 'umi';
import { Menu, Row, Col, Card } from 'antd';
import { GridContent } from '@ant-design/pro-layout';

export default ({ children }) => {
  const intl = useIntl();
  const location = useLocation();
  const { pathname } = location;

  return (
    <GridContent contentWidth="Fixed">
      <Card bordered={false} bodyStyle={{ padding: '24px 0' }}>
        <Row>
          <Col span={6}>
            <Menu
              mode="inline"
              selectedKeys={[pathname]}
              onClick={({ key }) => history.push(key)}
            >
              <Menu.Item key="/settings">
                {intl.formatMessage({ id: 'portal.profile' })}
              </Menu.Item>
              <Menu.Item key="/settings/security">
                {intl.formatMessage({ id: 'portal.security' })}
              </Menu.Item>
            </Menu>
          </Col>
          <Col span={17} push={1} style={{ backgroundColor: '#fff' }}>
            {children}
          </Col>
        </Row>
      </Card>
    </GridContent>
  );
};
