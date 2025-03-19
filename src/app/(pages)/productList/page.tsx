import { SlidersHorizontal, Trash2 } from "lucide-react";
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

      <div className="py-5">
        <div className="p-1  border border-gray-300 dark:border-neutral-700 rounded ">
          <div className=" bg-neutral-100/10 dark:bg-neutral-500/10  m-5  border border-gray-300 dark:border-neutral-700 rounded">
            <div className=" py-3 grid grid-cols-6 place-items-center gap-3 ">
              <h1>Products Id</h1>
              <h1>Products Name</h1>
              <h1>Price</h1>
              <h1>Category</h1>
              <h1>Stock</h1>
              <h1>Delete</h1>
            </div>
            <hr className=" my-1 border-gray-300 dark:border-neutral-500" />
            <div>
              {/* Product Item */}
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50 ">
                <h1>Product 1</h1>
                <h1>Product 1 Name</h1>
                <h1>$100</h1>
                <h1>Category 1</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500 grid place-items-center ">
                  <Trash2 className="text-s " />
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 2</h1>
                <h1>Product 2 Name</h1>
                <h1>$100</h1>
                <h1>Category 2</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2 className="text-sm" />
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 3</h1>
                <h1>Product 3 Name</h1>
                <h1>$100</h1>
                <h1>Category 3</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2 className="text-sm" />
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 4</h1>
                <h1>Product 4 Name</h1>
                <h1>$100</h1>
                <h1>Category 4</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2 className="text-sm" />
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 5</h1>
                <h1>Product 5 Name</h1>
                <h1>$100</h1>
                <h1>Category 5</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2 className="text-sm" />
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 6</h1>
                <h1>Product 6 Name</h1>
                <h1>$100</h1>
                <h1>Category 6</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2 className="text-sm" />
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 6</h1>
                <h1>Product 6 Name</h1>
                <h1>$100</h1>
                <h1>Category 6</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2 className="text-sm" />
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 7</h1>
                <h1>Product 7 Name</h1>
                <h1>$100</h1>
                <h1>Category 7</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2 className="text-sm" />
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 8</h1>
                <h1>Product 8 Name</h1>
                <h1>$100</h1>
                <h1>Category 8</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2 className="text-sm" />
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 9</h1>
                <h1>Product 9 Name</h1>
                <h1>$100</h1>
                <h1>Category 9</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2 className="text-sm" />
                </button>
              </div>
              <div className="py-3 grid grid-cols-6 place-items-center gap-3 border-b border-gray-200 dark:border-neutral-600 text-gray-500 dark:text-gray-50">
                <h1>Product 10</h1>
                <h1>Product 10 Name</h1>
                <h1>$100</h1>
                <h1>Category 10</h1>
                <h1>100</h1>
                <button className="text-red-400 hover:text-red-500">
                  <Trash2 className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductList;
