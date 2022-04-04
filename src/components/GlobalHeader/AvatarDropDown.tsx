import { history, useModel, useIntl } from 'umi';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Menu, Dropdown } from 'antd';
import styles from './index.less';

export default () => {
  const intl = useIntl();
  const { initialState } = useModel('@@initialState');
  const { userinfo } = initialState;
  const handleMenuClick = ({ key }) => {
    if (key == 'logout') {
      const { pathname, search } = location;
      location.href = `/api/logout?redirect=${encodeURIComponent(
        pathname + search,
      )}`;
    } else {
      history.push(`/${key}`);
    }
  };
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={handleMenuClick}>
      <Menu.Item key="settings" icon={<UserOutlined />}>
        {intl.formatMessage({ id: 'portal.profile' })}
      </Menu.Item>
      {userinfo.admin == true && (
        <Menu.Item key="admin" icon={<SettingOutlined />}>
          {intl.formatMessage({ id: 'portal.admin' })}
        </Menu.Item>
      )}
      <Menu.Divider />
      <Menu.Item icon={<LogoutOutlined />} key="logout">
        {intl.formatMessage({ id: 'portal.logout' })}
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          alt="avatar"
          {...(userinfo.avatar
            ? { src: userinfo.avatar }
            : { icon: <UserOutlined /> })}
        />
        <span className={`${styles.name} anticon`}>
          {userinfo.display_name || userinfo.user_name}
        </span>
      </span>
    </Dropdown>
  );
};
