import { history, useModel } from 'umi';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Dropdown } from 'antd';
import styles from './index.less';

export default () => {
    const { initialState } = useModel('@@initialState');
    const { userinfo } = initialState;
    const handleMenuClick = ({ key }) => {
        history.push(`/${key}`);
    }
    const menuHeaderDropdown = (
        <Menu className={styles.menu} selectedKeys={[]} onClick={handleMenuClick}>
            <Menu.Item key="settings">
                <SettingOutlined /> 个人设置
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout">
                <LogoutOutlined /> 退出登录
            </Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={menuHeaderDropdown}>
            <span className={`${styles.action} ${styles.account}`}>
                <Avatar size="small" className={styles.avatar} alt="avatar" src={userinfo.avatar} />
                <span className={`${styles.name} anticon`}>{userinfo.display_name || userinfo.user_name}</span>
            </span>
        </Dropdown>
    )
}
