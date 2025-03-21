import {
  ChartNoAxesCombined,
  CircleHelp,
  IndianRupee,
  MoveDown,
  MoveUp,
  PackagePlus,
} from "lucide-react";
import React from "react";

const DashBoardStats = () => {
  return (
    <section>
      {/* Dashboard Stats Grid */}
      <div className="grid grid-cols-4 gap-5 ">
        {/* Single Container */}
        {/* TODO: Still need to make it dynamic */}
        <div className="border border-gray-300 dark:border-neutral-600 py-3 px-6 rounded">
          <div className="py-3">
            <h1 className="text-4xl font-semibold pb-2">3451 +</h1>
            <p className="text-gray-500 dark:text-gray-400">Number of Sales</p>
          </div>
          <div className="flex items-end justify-between py-3">
            <div className="flex text-green-500 ">
              <MoveUp className="text-green-500 " />
              25%
            </div>
            <div>
              <ChartNoAxesCombined className="h-12 w-12 text-white bg-yellow-400 p-1 rounded" />
            </div>
          </div>
        </div>

        {/* Total Sales Revenue */}
        <div className="border border-gray-300 dark:border-neutral-600 py-3 px-6 rounded">
          <div className="py-3">
            <h1 className="text-4xl font-semibold pb-2">$35.50 +</h1>
            <p className="text-gray-500 dark:text-gray-400">Sales Revenue</p>
          </div>
          <div className="flex items-end justify-between py-3">
            <div className="flex text-green-500 ">
              <MoveUp className="text-green-500 " />
              15%
            </div>
            <div>
              <IndianRupee className="h-12 w-12 text-white bg-green-400 p-1 rounded" />
            </div>
          </div>
        </div>

        {/* Total Number of Orders */}
        <div className="border border-gray-300 dark:border-neutral-600 py-3 px-6 rounded">
          <div className="py-3">
            <h1 className="text-4xl font-semibold pb-2">380</h1>
            <p className="text-gray-500 dark:text-gray-400">Number of Orders</p>
          </div>
          <div className="flex items-end justify-between py-3">
            <div className="flex text-green-500 ">
              <MoveUp className="text-green-500 " />
              5%
            </div>
            <div>
              <PackagePlus className="h-12 w-12 text-white bg-blue-400 p-1 rounded" />
            </div>
          </div>
        </div>

        {/* Total Number of Queries */}
        <div className="border border-gray-300 dark:border-neutral-600 py-3 px-6 rounded">
          <div className="py-3">
            <h1 className="text-4xl font-semibold pb-2">4</h1>
            <p className="text-gray-500 dark:text-gray-400">Total Queries</p>
          </div>
          <div className="flex items-end justify-between py-3">
            <div className="flex text-red-500 ">
              <MoveDown className="text-red-500 " />
              25%
            </div>
            <div>
              <CircleHelp className="h-12 w-12 text-white bg-red-400 p-1 rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashBoardStats;
