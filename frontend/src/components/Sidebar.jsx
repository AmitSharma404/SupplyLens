import { useState } from 'react';
import {
  Archive,
  ChevronsLeft,
  ChevronsRight,
  LayoutDashboard,
  Settings,
  TriangleAlert,
  Truck,
  LogOut
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { clearAuthError, logoutUser } from '../redux/slices/authSlice';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
      navigate('/', { replace: true });
    } catch (err) {
      // Direct client side fallback if backend is offline
      toast.success("Session expired. Local clean log out.");
      navigate('/', { replace: true });
    }
  };

  const menuItems = [
    {
      icons: <LayoutDashboard size={18} />,
      name: 'Dashboard',
      path: '/dashboard',
      end: true,
    },
    {
      icons: <Truck size={18} />,
      name: 'Shipments',
      path: '/dashboard/delivery',
    },
    {
      icons: <Archive size={18} />,
      name: 'Inventory',
      path: '/dashboard/inventory',
    },
    {
      icons: <TriangleAlert size={18} />,
      name: 'Alerts',
      path: '/dashboard/alerts',
    },
    {
      icons: <Settings size={18} />,
      name: 'Settings',
      path: '/dashboard/settings',
    },
  ];

  return (
    <div
      className={`bg-white border border-gray-100 shadow-sm transition-all duration-300 ease-in-out h-full rounded-3xl py-6 flex flex-col justify-between ${
        isOpen ? 'w-52' : 'w-20'
      }`}
    >
      <div className="flex flex-col px-4 gap-8">
        {/* Toggle Button */}
        <div className="flex items-center justify-between">
          {isOpen && (
            <span className="text-xs font-black tracking-widest text-[#111A16] uppercase ml-2">
              COMMAND
            </span>
          )}
          <button
            onClick={handleSideBar}
            className="p-2 text-gray-400 hover:text-[#1F7A4D] hover:bg-[#1F7A4D]/8 rounded-xl transition-colors cursor-pointer"
          >
            {isOpen ? <ChevronsLeft size={16} /> : <ChevronsRight size={16} />}
          </button>
        </div>

        {/* Menu Navigation */}
        <div className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              end={item.end}
              key={index}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer text-xs font-bold leading-none ${
                  isActive
                    ? 'text-white bg-[#1F7A4D] shadow-sm shadow-[#1F7A4D]/25'
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                }
              `}
            >
              <span className="shrink-0">{item.icons}</span>
              {isOpen && <span>{item.name}</span>}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Logout button at bottom */}
      <div className="px-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50/50 hover:text-red-600 transition-colors cursor-pointer"
        >
          <LogOut size={18} className="shrink-0" />
          {isOpen && <span>Log Out</span>}
        </button>
      </div>
    </div>
  );
};
