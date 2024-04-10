import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();
  
    if (isLoading) {
      return <div>Loading...</div>; 
    }
  
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
  
    return <Outlet />;
  }

export default ProtectedRoute;
