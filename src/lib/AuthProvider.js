"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromStorage, logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return children;
};

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (
      !isAuthenticated ||
      (allowedRoles && !allowedRoles.includes(userInfo.role))
    ) {
      router.push("/login");
    }
  }, [isAuthenticated, userInfo, allowedRoles, router]);

  if (
    !isAuthenticated ||
    (allowedRoles && !allowedRoles.includes(userInfo.role))
  ) {
    return null; // or a loading spinner
  }

  return children;
};
