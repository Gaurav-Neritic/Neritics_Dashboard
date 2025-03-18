import { SlidersHorizontal } from "lucide-react";
import React from "react";

const ProductList = () => {
  return (
    <section className="p-5">
      {/* Filters Tray*/}
      <div className="border px-4 py-2 rounded border-gray-300 dark:border-neutral-700">
        <div className="flex items-center justify-start gap-3">
          <SlidersHorizontal />
          <select className="border border-gray-400 px-3 py-1 rounded outline-none">
            <option className="dark:bg-neutral-600">Filter One</option>
            <option className="dark:text-black">Option 2</option>
            <option className="dark:text-black">Option 3</option>
            <option className="dark:text-black">Option 4</option>
          </select>
          <select className="border border-gray-400 px-3 py-1 rounded outline-none">
            <option className="dark:bg-neutral-600">Type</option>
            <option className="dark:text-black">Type 2</option>
            <option className="dark:text-black">Type 3</option>
            <option className="dark:text-black">Type 4</option>
          </select>

          <select className="border border-gray-400 px-3 py-1 rounded outline-none">
            <option className="dark:bg-neutral-600">Range</option>
            <option className="dark:text-black">From 1 to 2</option>
            <option className="dark:text-black">From 2 to 3</option>
            <option className="dark:text-black">From 3 to 4</option>
          </select>

          <select className="border border-gray-400 px-3 py-1 rounded outline-none">
            <option className="dark:bg-neutral-600">Time</option>
            <option className="dark:text-black">Recently</option>
            <option className="dark:text-black">Frequently</option>
            <option className="dark:text-black">Earlier</option>
          </select>
        </div>
      </div>

      {/* Products List */}
      <div></div>
    </section>
  );
};

export default ProductList;
