import { SquarePen } from "lucide-react";
import React from "react";

const SalesPage = () => {
  return (
    <section className="p-5">
      {/* Headline */}
      <div className="py-4">
        <h1 className="text-2xl font-bold">Sale Lists</h1>
      </div>
      <div className="p-5 border border-lightBorder dark:border-darkBorder rounded">
        <div className=" border border-lightBorder dark:border-darkBorder rounded overflow-x-auto  ">
          {/* Table Selection */}
          <table className="w-full  table-auto ">
            <thead>
              <tr className=" border-b border-lightBorder dark:border-darkBorder rounded my-3">
                <th className="py-2 px-4 text-left text-sm  font-semibold">
                  #ID
                </th>
                <th className="py-2 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="py-2 text-left text-sm font-semibold">
                  Products
                </th>
                <th className="py-2 px-2 text-center text-sm font-semibold">
                  Amount
                </th>
                <th className="py-2 px-2 text-center text-sm  font-semibol">
                  Paid
                </th>
                <th className="py-2 px-2 text-center text-sm font-semibold">
                  Status
                </th>
                <th className="py-2 px-2 text-center text-sm font-semibold">
                  Date
                </th>
                <th className="py-2 px-2 text-center text-sm font-semibold">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              <tr className=" border-b last:border-b-0 border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50 my-3">
                <td className="p-4 text-sm  capitalize text-left">#1020</td>
                <td className="text-sm  capitalize text-left">
                  Sanket Pathare
                </td>
                <td className="py-2 text-sm  capitalize text-left">
                  <div className="line-clamp-2 ">
                    Nerileum – Roll On Herbal Pain Relief Oil
                  </div>
                </td>
                <td className="py-2 px-4 text-sm  capitalize text-center">
                  ₹280.00
                </td>
                <td className="py-2 px-4 text-sm  capitalize text-center  ">
                  Paid
                </td>
                <td className="py-2 px-4  capitalize text-center ">
                  <h1 className="p-0.5 border border-green-500/40 bg-green-500/40 rounded-full text-sm  text-center">
                    Shipped
                  </h1>
                </td>
                <td className="py-2 px-4 text-sm  capitalize text-center">
                  2025-03-25
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <button className="cursor-pointer flex items-center">
                      <SquarePen className="text-red-500 hover:text-green-600 " />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default SalesPage;
