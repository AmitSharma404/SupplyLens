import { useState } from 'react';
import {
  Archive,
  ChevronsLeft,
  ChevronsRight,
  CircleQuestionMark,
  FileQuestionMark,
  LayoutDashboard,
  Settings,
  TriangleAlert,
  Truck,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSideBar = () => {
    if (window.innerWidth < 640) return;
    setIsOpen(!isOpen);
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
      name: 'Truck',
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
      className={`bg-white drop-shadow-xs cursor-pointer transition-all duration-300 ease-in-out h-[92vh] rounded-2xl py-4  self-start ${isOpen ? 'w-40' : 'w-16'} 
     
      `}
    >
      <div className="flex justify-between flex-col px-3 ">
        <button
          onClick={handleSideBar}
          className="bg-primary text-white p-2 rounded-full  "
        >
          {isOpen ? (
            <ChevronsLeft size={24} className="relative left- " />
          ) : (
            <ChevronsRight size={24} />
          )}
        </button>
        <div className="mt-10 flex gap-5 flex-col items-center ">
          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              end={item.end}
              key={index}
              className={({ isActive }) => `
              w-full flex items-center   px-3  py-2 gap-6  rounded-md  text-gray-500 hover:bg-primary/20 hover:text-primary transition duration-200 ease-in ${
                isActive
                  ? ' text-white bg-primary/80 items-start  '
                  : 'text-foreground  items-center '
              }
              `}
            >
              <span>{item.icons}</span>
              {isOpen && (
                <span className="text-sm font-medium">{item.name}</span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
