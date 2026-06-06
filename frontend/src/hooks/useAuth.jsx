import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, isAuthenticated, checkingAuth } = useSelector((state) => state.auth);
  
  return {
    user,
    role: user?.role,
    isAuthenticated,
    checkingAuth,
    token: null, // Token is securely managed via HTTP-only cookies
  };
};

export default useAuth;
