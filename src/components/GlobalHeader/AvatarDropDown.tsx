import { history, useModel } from 'umi';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Dropdown } from 'antd';
import styles from './index.less';

export default () => {
  const { initialState } = useModel('@@initialState');
  const { userinfo } = initialState;
  const is_admin = userinfo.apps?.filter((v) => v.name == 'admin').length > 0;
  const handleMenuClick = ({ key }) => {
    history.push(`/${key}`);
  };
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={handleMenuClick}>
      <Menu.Item key="settings">Your profile</Menu.Item>
      {is_admin && <Menu.Item key="admin">System admin</Menu.Item>}
      <Menu.Divider />
      <Menu.Item key="logout">Sign out</Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          alt="avatar"
          src={userinfo.avatar}
        />
        <span className={`${styles.name} anticon`}>
          {userinfo.display_name || userinfo.user_name}
        </span>
      </span>
    </Dropdown>
  );
};
