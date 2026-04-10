import React from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { Sidebar } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export const Dashboard = () => {

  return (
    <div className="px-1  md:px-2 lg:px-3 flex gap-3  ">
      

      <div className=" h-screen  py-4 shrink-0 sticky top-2 left-0 ">
        <Sidebar  />
      </div>
      <div
        className="flex-1 transition-all duration-300 ease-in-out drop-shadow-xs 
       "
      >
        <div className="flex flex-col gap-3 py-4 ">
          <DashboardHeader />
          <div className="bg-white  rounded-2xl drop-shadow-xs">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
