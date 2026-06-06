import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { getAlerts } from '../../Instance/API';
import { logoutUser } from '../../redux/slices/authSlice';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard, Archive, Users, ShoppingCart,
  TrendingUp, Bell, Settings, LogOut,
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', end: true, allowedRoles: ['admin', 'manager', 'staff'] },
  { icon: Archive, label: 'Inventory', path: '/dashboard/inventory', allowedRoles: ['admin', 'manager', 'staff'] },
  { icon: ShoppingCart, label: 'Orders', path: '/dashboard/orders', allowedRoles: ['admin', 'manager', 'staff'] },
  { icon: Bell, label: 'Alerts', path: '/dashboard/alerts', allowedRoles: ['admin', 'manager', 'staff'] },
  { icon: Users, label: 'Suppliers', path: '/dashboard/suppliers', allowedRoles: ['admin', 'manager'] },
  { icon: TrendingUp, label: 'Forecast', path: '/dashboard/forecast', allowedRoles: ['admin', 'manager'] },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings', allowedRoles: ['admin'] },
];

const AppSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, role } = useAuth();
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    const fetchAlertCount = async () => {
      try {
        const res = await getAlerts(false); // unread only
        setAlertCount(res.data?.length || 0);
      } catch (err) {
        console.error("Failed to fetch alert count");
      }
    };
    if (user) fetchAlertCount();
    const interval = setInterval(fetchAlertCount, 60000);
    return () => clearInterval(interval);
  }, [user]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out');
      navigate('/', { replace: true });
    } catch {
      navigate('/', { replace: true });
    }
  };

  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 h-screen flex-col z-40"
      style={{ width: 'var(--sidebar-width)', background: 'var(--app-surface)', borderRight: '1px solid var(--app-border)' }}
    >
      <div className="px-6 py-5">
        <NavLink to="/" style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.4px', color: 'var(--app-text)' }}>
          SupplyLens
        </NavLink>
      </div>

      <nav className="flex-1 px-3 mt-2 flex flex-col gap-0.5">
        {menuItems.filter(item => !item.allowedRoles || item.allowedRoles.includes(role)).map((item) => (
          <NavLink key={item.path} to={item.path} end={item.end}
            className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-150 relative"
            style={({ isActive }) => ({
              fontSize: '13px', fontWeight: 500,
              color: isActive ? 'var(--app-text)' : 'var(--app-text-muted)',
              background: isActive ? 'var(--app-overlay)' : 'transparent',
            })}>
            <div className="relative">
              <item.icon size={16} />
              {item.label === 'Alerts' && alertCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" 
                  style={{ background: 'var(--red, #ef4444)', boxShadow: '0 0 4px rgba(239, 68, 68, 0.5)' }}>
                </span>
              )}
            </div>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-5 py-4" style={{ borderTop: '1px solid var(--app-border)' }}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'var(--app-overlay)', fontSize: '13px', fontWeight: 500, color: 'var(--app-text)' }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="min-w-0 flex-1">
            <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--app-text)' }} className="truncate leading-tight">{user?.name || 'User'}</p>
            <p style={{ fontSize: '12px', color: 'var(--app-text-muted)' }} className="truncate">{user?.role || 'Member'}</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg cursor-pointer bg-transparent border-0 transition-colors"
          style={{ fontSize: '13px', fontWeight: 500, color: 'var(--app-text-muted)' }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--red)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--app-text-muted)')}>
          <LogOut size={14} /><span>Log out</span>
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
