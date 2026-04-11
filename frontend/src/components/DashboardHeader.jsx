import { BellIcon, SearchIcon } from 'lucide-react';

export const DashboardHeader = () => {
  return (
    <div className="bg-white w-full px-3 sm:px-6 py-2 flex items-center  rounded-4xl sticky top-0 z-100 text-gray-500 drop-shadow-xs gap-3">
      <div className="flex items-center gap-5 flex-1 w-full ">
        <h1 className="text-sm sm:text-lg font-bold  tracking-tight text-primary">
          Supply <span className="text-foreground">Lens</span>
        </h1>
        <div
          className="  bg-gray-200 flex flex-1 max-w-140 items-center px-2 rounded-4xl py-2 gap-2 text-sm 
        cursor-pointer border-primary transition duration-300 ease-in"
        >
          <SearchIcon size={17} />
          <input
            type="text"
            className=" w-full outline-none text-primary  placeholder:text-[0.9em]  placeholder:text-gray-400 "
            placeholder="Search Inventory items,or location...."
          />
        </div>
      </div>
      <div className="flex  gap-6 text-sm">
        <div className=" gap-4 lg:gap-10  hidden lg:flex  font-medium ">
          <span className="hover:text-primary cursor-pointer">Dashboard</span>
          <span className="hover:text-primary cursor-pointer">Shipments</span>
          <span className="hover:text-primary cursor-pointer">Inventory</span>
          <span className="hover:text-primary cursor-pointer">Alerts</span>
        </div>
        <div className="flex items-center  gap-4 lg:gap-6 ">
          <div className="hidden sm:block h-5 w-px bg-gray-200"></div>
          <BellIcon size={17} className="hidden sm:block" />
          <div className="bg-primary w-6 h-6 rounded-full">
            <img src="" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
