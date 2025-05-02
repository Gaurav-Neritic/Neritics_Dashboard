
import { Search, Filter, ChevronDown } from "lucide-react";

const QueriesTable = () => {

  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold mb-6">Customer Queries</h1>
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search queries..."
              className="pl-10 pr-4 py-2 w-full border border-lightBorder dark:border-darkBorder  rounded  dark:bg-neutral-800 dark:text-gray-100"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <select className="appearance-none pl-3 pr-8 py-2 border border-lightBorder dark:border-darkBorder  rounded  dark:bg-neutral-800 dark:text-gray-100">
                <option>All Statuses</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border border-lightBorder dark:border-darkBorder  rounded dark:bg-neutral-800 dark:text-gray-100">
              <Filter size={16} />
              <span>More Filters</span>
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default QueriesTable;
