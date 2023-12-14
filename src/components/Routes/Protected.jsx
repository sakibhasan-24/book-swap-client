import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const { currentUser } = useSelector((state) => state.user);
  if (currentUser) {
    return children;
  }
  return <Navigate to="/login" />;
}
