"use client";
import {
  BadgeIndianRupee,
  Blocks,
  ChartPie,
  FileText,
  House,
  Menu,
  MessageCircleQuestion,
  MessageSquareMore,
  PackagePlus,
  Settings,
  SquarePlus,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import ToggleMode from "../Theme/ToggleMode";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav>
      {/* nav buttons */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className=" p-2 outline-none transition-all duration-300"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 dark:text-white" />
          ) : (
            <Menu className="w-6 h-6 dark:text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden transition-all duration-300">
          <div className="px-4 py-4 ">
            <nav className="min-h-screen">
              <Link
                href={"/"}
                onClick={() => setIsMenuOpen(false)}
                className=" bg-white border border-gray-200 rounded p-2 my-2 flex items-center justify-between gap-2 hover:bg-gray-200 transition-all ease-linear duration-200"
              >
                <span className="flex gap-3">
                  <House />
                  Home
                </span>
              </Link>

              <Link
                href={"/addProduct"}
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-teal-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-teal-100 hover:text-teal-600 transition-all ease-linear duration-200"
              >
                <span className="flex gap-3">
                  <SquarePlus className="text-teal-500" />
                  Add Product
                </span>
              </Link>

              <Link
                href={"/addBlog"}
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-cyan-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-cyan-200 hover:text-cyan-600 transition-all ease-linear duration-200"
              >
                <span className="flex gap-3">
                  <FileText className="text-cyan-500" />
                  Add Blog
                </span>
              </Link>

              <Link
                href={"/orders"}
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-yellow-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-yellow-200 hover:text-yellow-600 transition-all ease-linear duration-200"
              >
                <span className="flex gap-3">
                  <PackagePlus className="text-yellow-500" />
                  Orders
                </span>
              </Link>

              <Link
                href={"/queries"}
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-indigo-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-indigo-200 hover:text-indigo-600 transition-all ease-linear duration-200"
              >
                <span className="flex gap-3">
                  <MessageCircleQuestion className="text-indigo-500" />
                  Queries
                </span>
              </Link>

              <Link
                href={"/sales"}
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-green-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-green-200 hover:text-green-600 transition-all ease-linear duration-200"
              >
                <span className="flex gap-3">
                  <BadgeIndianRupee className="text-green-500" />
                  Sales
                </span>
              </Link>

              <Link
                href={"/sales"}
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-fuchsia-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-fuchsia-200 hover:text-fuchsia-600 transition-all ease-linear duration-200"
              >
                <span className="flex gap-3">
                  <ChartPie className="text-fuchsia-500" />
                  Reports
                </span>
              </Link>

              <Link
                href={"/stocks"}
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-blue-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-blue-200 hover:text-blue-600 transition-all ease-linear duration-200"
              >
                <span className="flex gap-3">
                  <Blocks className="text-blue-500" />
                  Stocks
                </span>
              </Link>

              <Link
                href={"/enquiry"}
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-red-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-red-200 hover:text-red-500 transition-all ease-linear duration-200"
              >
                <span className="flex gap-3">
                  <MessageSquareMore className="text-red-500" />
                  Enquiry
                </span>
              </Link>

              <Link
                href={"/settings"}
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-gray-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-gray-200 hover:text-gray-700 transition-all ease-linear duration-200"
              >
                <span className="flex gap-3">
                  <Settings className="text-gray-700" />
                  Settings
                </span>
              </Link>

              {/* Action Button Section */}
              <div className="p-2 my-5 rounded border border-lightBorder dark:border-darkBorder">
                <div className="grid grid-cols-3 place-items-center">
                  <ToggleMode />
                  <Link
                    href={"https://gmail.com"}
                    target="_blank"
                    className="p-1 rounded-full border border-gray-300 dark:border-neutral-700 dark:text-white cursor-pointer"
                  >
                    <span className="text-2xl" title="mail">
                      ✉️
                    </span>
                  </Link>
                  <Link
                    href={"https://neriticwellness.com/"}
                    target="_blank"
                    className="p-1 rounded-full border border-gray-300 dark:border-neutral-700 dark:text-white cursor-pointer"
                  >
                    <span className="text-2xl" title="mail">
                      🌐
                    </span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
