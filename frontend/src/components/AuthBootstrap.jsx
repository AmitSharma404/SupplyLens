import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../redux/slices/authSlice.js";

const AuthBootstrap = ({ children }) => {
  const dispatch = useDispatch();
  const checkingAuth = useSelector((state) => state.auth.checkingAuth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return children;
};

export default AuthBootstrap;
