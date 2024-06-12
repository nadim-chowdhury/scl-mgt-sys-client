import { Avatar, Dropdown, Menu, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";

const AvatarWithLogout = ({ username, onLogout }) => {
  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <div
        style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        className="px-4"
      >
        <Avatar icon={<UserOutlined />} />
        <span style={{ marginLeft: 8 }}>{username}</span>
      </div>
    </Dropdown>
  );
};

export default AvatarWithLogout;
