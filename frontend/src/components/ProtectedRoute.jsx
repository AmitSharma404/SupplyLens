import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "sonner";
import { useEffect } from "react";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { role, isAuthenticated, checkingAuth } = useAuth();

  useEffect(() => {
    if (allowedRoles && role && !allowedRoles.includes(role)) {
      toast.error("You do not have permission to access this page");
    }
  }, [role, allowedRoles]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="w-6 h-6 border-2 border-transparent rounded-full animate-spin" style={{ borderTopColor: 'var(--accent)' }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && role && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
