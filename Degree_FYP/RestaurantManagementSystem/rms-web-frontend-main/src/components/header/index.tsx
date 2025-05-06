import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import { useGetIdentity, useLogout } from "@refinedev/core";
import {
  Layout as AntdLayout,
  Avatar,
  Dropdown,
  Menu,
  Space,
  Switch,
  theme,
  Typography,
} from "antd";
import React, { useContext } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }
  const {mutate:logout} = useLogout()
  const userMenu = (
    <Menu>

        {/* <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}> */}
        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={()=>logout()}>
            Logout
        </Menu.Item>
    </Menu>
);

  return (
    <AntdLayout.Header style={headerStyles}>
      <Space>
        <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />
          <Dropdown overlay={userMenu} placement="bottomRight">
            <Space style={{ marginLeft: "8px" }} size="middle">
                {user?.name && <Text strong>{user.name}</Text>}
                {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
            </Space>
          </Dropdown>
      
                 
               
      </Space>
    </AntdLayout.Header>
  );
};
