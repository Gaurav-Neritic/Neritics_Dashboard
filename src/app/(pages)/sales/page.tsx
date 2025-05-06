import { SquarePen } from "lucide-react";
import React from "react";

const SalesPage = () => {
  return (
    <section className="p-5">
      {/* Headline */}
      <div className="py-4">
        <h1 className="text-2xl font-bold">Sale Lists</h1>
      </div>
      <div className="p-5 border rounded border-lightBorder dark:border-darkBorder">
        <div className="overflow-x-auto border rounded border-lightBorder dark:border-darkBorder">
          {/* Table Selection */}
          <table className="w-full table-auto ">
            <thead>
              <tr className="my-3 border-b rounded border-lightBorder dark:border-darkBorder">
                <th className="px-4 py-2 text-sm font-semibold text-left">
                  #ID
                </th>
                <th className="py-2 text-sm font-semibold text-left">
                  Name
                </th>
                <th className="py-2 text-sm font-semibold text-left">
                  Products
                </th>
                <th className="px-2 py-2 text-sm font-semibold text-center">
                  Amount
                </th>
                <th className="px-2 py-2 text-sm text-center font-semibol">
                  Paid
                </th>
                <th className="px-2 py-2 text-sm font-semibold text-center">
                  Status
                </th>
                <th className="px-2 py-2 text-sm font-semibold text-center">
                  Date
                </th>
                <th className="px-2 py-2 text-sm font-semibold text-center">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              <tr className="my-3 text-gray-500 border-b border-gray-200 last:border-b-0 dark:border-neutral-600 dark:text-gray-50">
                <td className="p-4 text-sm text-left capitalize">#1020</td>
                <td className="text-sm text-left capitalize">
                  Sanket Pathare
                </td>
                <td className="py-2 text-sm text-left capitalize">
                  <div className="line-clamp-2 ">
                    Nerileum – Roll On Herbal Pain Relief Oil
                  </div>
                </td>
                <td className="px-4 py-2 text-sm text-center capitalize">
                  ₹280.00
                </td>
                <td className="px-4 py-2 text-sm text-center capitalize ">
                  Paid
                </td>
                <td className="px-4 py-2 text-center capitalize ">
                  <h1 className="p-0.5 border border-green-500/40 bg-green-500/40 rounded-full text-sm  text-center">
                    Shipped
                  </h1>
                </td>
                <td className="px-4 py-2 text-sm text-center capitalize">
                  2025-03-25
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <button className="flex items-center cursor-pointer">
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
