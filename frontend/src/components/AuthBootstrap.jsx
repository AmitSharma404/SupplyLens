import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../redux/slices/authSlice.js";

const AuthBootstrap = ({ children }) => {
  const dispatch = useDispatch();
  const checkingAuth = useSelector((state) => state.auth.checkingAuth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-5 h-5 border-2 border-transparent rounded-full animate-spin" style={{ borderTopColor: 'var(--accent)' }} />
          <p style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>Loading…</p>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthBootstrap;
