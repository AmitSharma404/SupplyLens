import React from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { Sidebar } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#F8FAF8] text-[#111A16] flex gap-4 px-4 py-4">
      {/* Sticky sidebar */}
      <aside className="hidden md:block shrink-0 sticky top-4 h-[94vh]">
        <Sidebar />
      </aside>

      {/* Main panel */}
      <main className="flex-1 flex flex-col gap-4 min-w-0">
        <DashboardHeader />
        <div className="flex-1 bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
