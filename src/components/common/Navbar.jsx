"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Drawer, Space } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  return (
    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/">
            <span className="text-amber-500 text-2xl font-bold">SCLSYS</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={showDrawer}
            className="text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          open={isDrawerVisible}
          width={220}
          extra={
            <Button onClick={closeDrawer} className="bg-amber-600 text-white">
              <CloseCircleOutlined />
            </Button>
          }
        >
          <div className="p-4 flex flex-col gap-2">
            <Link href="#">
              <span className="text-gray-800 hover:">Features</span>
            </Link>

            <Link href="#">
              <span className="text-gray-800 hover:">Pricing</span>
            </Link>

            <Link href="#">
              <span className="text-gray-800 hover:">About</span>
            </Link>

            <Link href="#">
              <span className="text-gray-800 hover:">Contact</span>
            </Link>
          </div>

          <div className="mt-4">
            <Link href="/login">
              <span className="block text-center bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700">
                Log In
              </span>
            </Link>
            <Link href="/register">
              <span className="block text-center bg-amber-600 text-white py-2 mt-2 rounded-md hover:bg-amber-700">
                Register
              </span>
            </Link>
          </div>
        </Drawer>

        {/* Main Navigation for larger screens */}
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-4">
            <Link href="#">
              <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Features
              </span>
            </Link>
            <Link href="#">
              <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Pricing
              </span>
            </Link>
            <Link href="#">
              <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                About
              </span>
            </Link>
            <Link href="#">
              <span className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </span>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <Link href="/dashboard">
              <span className="bg-amber-600 text-white py-2 px-4 text-sm font-medium rounded-md hover:bg-amber-700">
                Dashboard
              </span>
            </Link>
          ) : (
            <>
              <Link href="/login">
                <span className="text-white py-2 font-medium text-sm">
                  Log In
                </span>
              </Link>
              <Link href="/register">
                <span className="bg-amber-600 text-white py-2 px-4 text-sm font-medium rounded-md hover:bg-amber-700">
                  Register
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
