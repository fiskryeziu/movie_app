import { useAuth } from "@/hooks/useAuth";
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { userData, token } = useAuth();

  return userData && userData.token && token?.role === "ADMIN" ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
