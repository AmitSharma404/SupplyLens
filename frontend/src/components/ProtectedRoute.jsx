import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkingAuth } = useSelector((state) => state.auth);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] text-[#102a43] font-semibold">
        Checking your session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
