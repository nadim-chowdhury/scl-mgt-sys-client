"use client";

import { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, theme } from "antd";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import AvatarWithLogout from "../../components/common/AvatarWithLogout";
import { sidebarMenuItems } from "@/utils/sidebar-menu-items";
import { ProtectedRoute } from "@/lib/AuthProvider";

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false); // Default set to false

  const { Header, Sider, Content } = Layout;
  const router = useRouter();
  const pathname = usePathname();
  console.log("🚀 ~ RootLayout ~ pathname:", pathname);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Function to handle logging out the user
  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("scl-mgt-auth");
    // setIsLoggedIn(false);
    router.push("/login"); // Redirect to login page
  };

  // Check authentication status on component mount
  // useEffect(() => {
  //   const authData = localStorage.getItem("scl-mgt-auth");
  //   console.log("🚀 ~ useEffect ~ authData:", authData);

  //   if (authData) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, [pathname]); // Re-run the check when the pathname changes

  // Function to handle navigation within the sidebar
  const handleMenuItemClick = (key) => {
    router.push(`/${key}`);
  };

  return (
    <ProtectedRoute
      allowedRoles={["admin", "student", "teacher", "user", "parent"]}
    >
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#f59e0b",
            borderRadius: 2,
            colorBgContainer: "#fff",
          },
        }}
      >
        <Layout className="h-screen">
          <Sider
            trigger={null}
            width={280}
            collapsible
            collapsed={collapsed}
            className="h-screen overflow-y-scroll"
          >
            <div
              className="h-16 text-2xl text-white w-full bg-amber-500 font-bold tracking-widest flex items-center justify-center sticky top-0 z-50"
              onClick={() => setCollapsed(!collapsed)}
            >
              <Link href="/" type="text">
                MGT
              </Link>
            </div>

            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[pathname]}
              onSelect={({ key }) => handleMenuItemClick(key)}
            >
              {sidebarMenuItems.map((item) =>
                item.subMenu ? (
                  <Menu.SubMenu
                    key={item.key}
                    icon={item.icon}
                    title={item.title}
                  >
                    {item.subMenu.map((subItem) => (
                      <Menu.Item
                        key={subItem.key}
                        icon={subItem.icon}
                        title={subItem.title}
                      >
                        {subItem.title}
                      </Menu.Item>
                    ))}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item key={item.key} icon={item.icon} title={item.title}>
                    {item.title}
                  </Menu.Item>
                )
              )}
            </Menu>
          </Sider>

          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
              className="flex items-center justify-between"
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

              <AvatarWithLogout
                username="Nadim Chowdhury"
                onLogout={handleLogout}
              />
            </Header>

            <Content
              style={{
                margin: "24px 16px",
                padding: 28,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
              className="overflow-y-scroll"
            >
              {children}
              {/* {isLoggedIn ? ( ) : (
                <p>Please log in to view this content.</p>
              )} */}
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </ProtectedRoute>
  );
}
