import { SquarePen } from "lucide-react";
import React from "react";

const SalesPage = () => {
  return (
    <section className="p-5">
      <div className="">
        <h1 className="text-2xl font-bold">Sale Lists</h1>
      </div>
      {/* Sale Lists */}
      <div className=" mt-5 border border-lightBorder dark:border-darkBorder rounded">
        <div className=" py-2 grid grid-cols-8 place-items-center ">
          <h1 className="text-md text-center">Order ID</h1>
          <h1 className="text-md text-center">Name</h1>
          <h1 className="text-md text-center">Product</h1>
          <h1 className="text-md text-center">Amount</h1>
          <h1 className="text-md text-center">Pay Status</h1>
          <h1 className="text-md text-center">Order Status</h1>
          <h1 className="text-md text-center">Date</h1>
          <h1 className="text-md text-center">Action</h1>
        </div>
        <hr className=" my-1 text-gray-300 dark:border-neutral-700 " />
        {/* order-1 */}
        <div className=" py-2 grid grid-cols-8 place-items-center gap-4 border-b last:border-0 border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
          <h1 className="text-sm text-center">#1020</h1>
          <h1   className="text-sm text-center">Sanket Pathare</h1>
          <h1  className="text-sm text-center capitalize line-clamp-1">Nerileum – Roll On Herbal Pain Relief Oil</h1>
          <h1 className="text-sm text-center" >₹280.00</h1>
          <div className=" flex gap-1 justify-between items-center">
            <span className="">✔️</span>
            <h1 className="text-sm text-center">Paid</h1>
          </div>
          <h1 className="text-sm text-center">Shipped</h1>
          <h1 className="text-sm text-center">2025-03-25</h1>
          <div className=" flex items-center justify-center">
            <button className="cursor-pointer flex items-center">
              <SquarePen className="text-green-500 hover:text-green-600 " />
            </button>
          </div>
        </div>
          {/* order-1 */}
          <div className=" py-2 grid grid-cols-8 place-items-center gap-4 border-b last:border-0 border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
          <h1 className="text-sm text-center">#1020</h1>
          <h1   className="text-sm text-center">Sanket Pathare</h1>
          <h1  className="text-sm text-center capitalize line-clamp-1">Nerileum – Roll On Herbal Pain Relief Oil</h1>
          <h1 className="text-sm text-center" >₹280.00</h1>
          <div className=" flex gap-1 justify-between items-center">
            <span className="">✔️</span>
            <h1 className="text-sm text-center">Paid</h1>
          </div>
          <h1 className="text-sm text-center">Shipped</h1>
          <h1 className="text-sm text-center">2025-03-25</h1>
          <div className=" flex items-center justify-center">
            <button className="cursor-pointer flex items-center">
              <SquarePen className="text-green-500 hover:text-green-600 " />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalesPage;
