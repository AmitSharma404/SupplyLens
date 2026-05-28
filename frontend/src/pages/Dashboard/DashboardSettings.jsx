import React from "react";
import { Settings, Shield, Bell, Eye, Database, Key } from "lucide-react";
import { toast } from "sonner";

export const DashboardSettings = () => {
  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Configurations saved successfully! Operating parameters synchronized.");
  };

  return (
    <div className="p-6 md:p-8 bg-[#F8FAF8] min-h-screen">
      
      {/* HEADER */}
      <div className="mb-8">
        <span className="text-[10px] font-extrabold tracking-widest text-[#1F7A4D] bg-[#1F7A4D]/8 px-2.5 py-1 rounded-full uppercase">
          SYSTEM PARAMETERS • Config panel
        </span>
        <h1 className="text-3xl font-black text-[#111A16] tracking-tight mt-3">Account Configurations</h1>
        <p className="text-xs text-gray-400 font-semibold mt-1">
          Manage your system settings, API keys, and notification triggers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
        
        {/* Profile Card */}
        <div className="bg-white border border-gray-100 rounded-[26px] p-6 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1F7A4D]/8 text-[#1F7A4D] flex items-center justify-center">
              <Shield size={18} />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-800">Security Credentials</h3>
              <p className="text-[10px] text-gray-400 font-semibold">Verify active login node.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">ORGANIZATION LOGS</span>
              <p className="text-xs font-bold text-gray-700 bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                Supply Lens Operations (HQ)
              </p>
            </div>
            
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">SECURITY CLEARANCE</span>
              <p className="text-xs font-bold text-[#1F7A4D] bg-[#1F7A4D]/8 px-4 py-3 rounded-xl border border-green-100">
                ADMIN COMMAND NODE
              </p>
            </div>
          </div>
        </div>

        {/* Operating Limits Card */}
        <div className="bg-white border border-gray-100 rounded-[26px] p-6 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1F7A4D]/8 text-[#1F7A4D] flex items-center justify-center">
              <Settings size={18} />
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-800">Operating Safety Metrics</h3>
              <p className="text-[10px] text-gray-400 font-semibold">Tweak default replenishment alerts.</p>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">
                Default Safety Threshold (%)
              </label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="10" 
                  max="50" 
                  defaultValue="25" 
                  className="flex-1 accent-[#1F7A4D]" 
                />
                <span className="text-xs font-bold text-gray-700 font-mono">25%</span>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 mb-1.5">
                Delivery Lead Days Buffer
              </label>
              <input 
                type="number" 
                defaultValue="3" 
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border-0 outline-none text-xs font-bold text-gray-800 focus:bg-white focus:ring-1 focus:ring-[#1F7A4D]" 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#111A16] hover:bg-[#1F7A4D] text-white py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 active:scale-97 cursor-pointer text-center block"
            >
              Apply Configurations
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
