"use client";

import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { GiTeacher } from "react-icons/gi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { MdSpaceDashboard } from "react-icons/md";
import { FaHouseUser } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/client";

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  const { Header, Sider, Content } = Layout;
  const isLoggedIn = true;
  // const [session, loading] = useSession();
  const router = useRouter();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuItemClick = (key) => {
    router.push(`/${key}`);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div
          className="h-16 text-2xl text-white w-full bg-blue-500 font-bold tracking-widest flex items-center justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Link href="/" type="text">
            MGT
          </Link>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={({ key }) => handleMenuItemClick(key)}
        >
          <Menu.Item
            key="dashboard"
            icon={<MdSpaceDashboard />}
            title="Dashboard"
          >
            Dashboard
          </Menu.Item>
          <Menu.Item key="students" icon={<HiMiniUserGroup />} title="Students">
            Students
          </Menu.Item>
          <Menu.Item key="teachers" icon={<GiTeacher />} title="Teachers">
            Teachers
          </Menu.Item>
          <Menu.Item key="classes" icon={<FaHouseUser />} title="Classes">
            Classes
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {isLoggedIn && children}
        </Content>
      </Layout>
    </Layout>
  );
}
