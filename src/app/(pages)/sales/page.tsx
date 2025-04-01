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
        <div className=" py-3 px-5 grid grid-cols-8 place-items-center ">
          <h1>Order ID</h1>
          <h1>Customer Name</h1>
          <h1> Product</h1>
          <h1> Amount</h1>
          <h1>Payment Status</h1>
          <h1>Order Status</h1>
          <h1>Order Status</h1>
          <h1>Action</h1>
        </div>
        <hr className=" my-1 text-gray-300 dark:border-neutral-700 " />
        {/* order-1 */}
        <div className="px-5 py-3 grid grid-cols-8 place-items-center gap-4 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
          <h1 className="">#1020</h1>
          <h1>Sanket</h1>
          <h1>phone</h1>
          <h1>90000.00</h1>
          <div className=" flex gap-1 justify-between items-center">
            <span className="">✔️</span>
            <h1>Paid</h1>
          </div>
          <h1>Shipped</h1>
          <h1>2025-03-25</h1>
          <div className="">
            <button className="cursor-pointer flex items-center">
              <SquarePen className="text-green-500 hover:text-green-600 " />
            </button>
          </div>
        </div>
        {/* order-2 */}
        <div className="px-5 py-3 grid grid-cols-8 place-items-center gap-4 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
          <h1 className="">#1020</h1>
          <h1>Yash </h1>
          <h1>laptop</h1>
          <h1>70000.00</h1>
          <div className=" flex gap-1">
            <span className="items-start">❌</span>
            <h1>Canceled</h1>
          </div>
          <h1>Refunded</h1>
          <h1>2025-03-25</h1>
          <div className="">
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
