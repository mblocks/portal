import Avatar from './AvatarDropdown';
import styles from './index.less';


export default () => {
  let className = styles.right;
  return (
    <div className={className}>
      <Avatar />
    </div>
  );
};
