import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../redux/slices/authSlice";

const AuthBootstrap = ({ children }) => {
  const dispatch = useDispatch();
  const checkingAuth = useSelector((state) => state.auth.checkingAuth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8] text-[#102a43] font-semibold">
        Checking your session...
      </div>
    );
  }

  return children;
};

export default AuthBootstrap;
