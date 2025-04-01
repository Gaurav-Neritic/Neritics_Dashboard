import { Bell, CircleHelp, PackageSearch, SquarePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const AccessibilityMenu = () => {
  return (
    <div className="flex items-center justify-between p-5 gap-3 border-b border-lightBorder dark:border-darkBorder  m-5">
      <div className="flex gap-5 border  px-3 py-2 rounded border-lightBorder dark:border-darkBorder ">
        <Link
          href={"/notifications"}
          className="flex items-center justify-center gap-2 group cursor-pointer"
        >
          <Bell className="text-red-400 cursor-pointer dark:text-white group-hover:fill-red-200 dark:group-hover:fill-red-400" />
          <span className="text-gray-700 dark:text-white"> Notifications</span>
        </Link>
        <span className="h-auto w-[1px] bg-gray-300" />
        <Link
          href={"/help"}
          className="flex items-center justify-center gap-2 group cursor-pointer"
        >
          <CircleHelp className="text-blue-400 dark:text-white group-hover:fill-blue-200 dark:group-hover:fill-blue-400" />
          <span className="text-gray-700 dark:text-white"> Need Help</span>
        </Link>
      </div>
      <div className="flex gap-3">
        <Link
          href={"/addProduct"}
          className="px-4 py-2 border rounded border-gray-300 text-gray-500 flex items-center justify-center gap-2 dark:text-white dark:border-neutral-600 cursor-pointer hover:bg-gray-100 transition-all ease-linear duration-200 dark:hover:bg-neutral-800"
        >
          <SquarePlus />
          Add Product
        </Link>
        <Link
          href={"/productList"}
          className="px-4 py-2 border rounded border-gray-300 text-gray-500 flex items-center justify-center gap-2 dark:text-white dark:border-neutral-600 cursor-pointer hover:bg-gray-100 transition-all ease-linear duration-200 dark:hover:bg-neutral-800"
        >
          <PackageSearch />
          View Products
        </Link>
      </div>
    </div>
  );
};

export default AccessibilityMenu;
