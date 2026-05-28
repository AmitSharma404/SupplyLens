import React, { useState, useRef, useEffect } from 'react';
import { Bell, Search, User, Mail, Shield, Settings, LogOut, ChevronDown } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { logoutUser } from '../redux/slices/authSlice';

export const DashboardHeader = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      setShowDropdown(false);
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out successfully");
      navigate('/', { replace: true });
    } catch (err) {
      toast.success("Session expired. Local clean log out.");
      navigate('/', { replace: true });
    }
  };

  const handleSettingsClick = () => {
    setShowDropdown(false);
    navigate('/dashboard/settings');
  };

  return (
    <div className="bg-white border border-gray-100 w-full px-6 py-4 flex items-center justify-between rounded-3xl shadow-sm gap-4">
      {/* Search Input bar */}
      <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2.5 max-w-md w-full">
        <Search size={14} className="text-gray-400 shrink-0" />
        <input
          type="text"
          placeholder="Search global shipments, SKU logs, or audit records..."
          className="bg-transparent border-0 outline-none text-xs font-semibold text-gray-800 placeholder:text-gray-400 w-full"
          onChange={(e) => {
            // Can be expanded as global command filter
          }}
        />
      </div>

      {/* Notifications and Profile */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Notification Bell */}
        <button 
          onClick={() => toast.info("Querying notification event stream...")}
          className="relative p-2.5 border border-gray-100 hover:border-gray-200 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-gray-600 transition-all cursor-pointer"
        >
          <Bell size={15} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="hidden sm:block h-6 w-px bg-gray-100" />

        {/* User profile capsule wrapper */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer focus:outline-none select-none text-left border-0 bg-transparent p-0"
          >
            <div className="text-right hidden md:block">
              <p className="text-xs font-black text-gray-800 leading-none">
                {user?.name || "Operations Lead"}
              </p>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-1 block">
                {user?.role || "Global Logistics Admin"}
              </span>
            </div>
            
            <div className="w-10 h-10 rounded-xl bg-[#1F7A4D]/8 text-[#1F7A4D] border border-green-50 flex items-center justify-center font-black text-xs shrink-0 shadow-inner relative">
              {user?.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
              <span className="absolute -bottom-1 -right-1 bg-white border border-gray-100 rounded-full p-0.5 shadow-sm text-gray-500">
                <ChevronDown size={8} />
              </span>
            </div>
          </button>

          {/* Premium Dropdown menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-3.5 w-72 bg-white border border-gray-100 rounded-[24px] shadow-[0_12px_40px_-10px_rgba(25,35,45,0.12)] p-5 z-50 flex flex-col gap-4 animate-in fade-in slide-in-from-top-3 duration-250 ease-out">
              
              {/* Dropdown Header */}
              <div className="pb-3 border-b border-gray-50">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#1F7A4D] bg-[#1F7A4D]/8 px-2 py-0.5 rounded-md inline-block">
                  OPERATIONAL CREDENTIALS
                </span>
                <h4 className="text-sm font-black text-gray-900 mt-2">Identity Matrix</h4>
              </div>

              {/* Identity Details */}
              <div className="flex flex-col gap-3.5 text-left">
                {/* Full name detail */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1F7A4D]/8 text-[#1F7A4D] flex items-center justify-center text-sm font-black shadow-inner shrink-0">
                    {user?.name ? user.name.charAt(0).toUpperCase() : <User size={14} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black text-gray-800 leading-none truncate">
                      {user?.name || "Operations Lead"}
                    </p>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">
                      Full Name
                    </span>
                  </div>
                </div>

                {/* Email detail */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1F7A4D]/8 text-[#1F7A4D] flex items-center justify-center shadow-inner shrink-0">
                    <Mail size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-700 leading-none truncate">
                      {user?.email || "nirajtest@supplylens.com"}
                    </p>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">
                      Active Node Email
                    </span>
                  </div>
                </div>

                {/* Role / Clearance detail */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#1F7A4D]/8 text-[#1F7A4D] flex items-center justify-center shadow-inner shrink-0">
                    <Shield size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black text-[#1F7A4D] leading-none uppercase tracking-wide">
                      {user?.role === 'admin' ? 'Level 4 (Admin)' : 'Level 1 (User)'}
                    </p>
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1 block">
                      Clearance Level
                    </span>
                  </div>
                </div>
              </div>

              {/* Separator and Buttons */}
              <div className="border-t border-gray-50 pt-3 flex flex-col gap-2">
                <button
                  onClick={handleSettingsClick}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:text-[#1F7A4D] hover:bg-[#1F7A4D]/8 border-0 bg-transparent transition-all cursor-pointer text-left"
                >
                  <span className="flex items-center gap-2">
                    <Settings size={14} />
                    Settings Panel
                  </span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase">Config</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50/50 border-0 bg-transparent transition-all cursor-pointer text-left"
                >
                  <LogOut size={14} />
                  Disconnect Session
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};
