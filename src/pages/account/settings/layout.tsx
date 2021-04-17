import { history, useLocation } from 'umi';
import { Menu, Row, Col, Card } from 'antd';
import { PageContainer, GridContent } from '@ant-design/pro-layout';

export default ({ children }) => {
    const location = useLocation();
    const { pathname } = location;

    return (
        <GridContent contentWidth="Fixed">
            <Row>
                <Col span={6} >
                    <Menu mode="vertical-left" selectedKeys={[pathname]} onClick={({ key }) => history.push(key)}>
                        <Menu.Item key="/settings" >
                            基本设置
                        </Menu.Item>
                        <Menu.Item key="/settings/security">
                            安全设置
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={18} style={{ backgroundColor: '#fff' }} >
                    <Card bordered={false}>
                        {children}
                    </Card>
                </Col>
            </Row>
        </GridContent>
    );
}
