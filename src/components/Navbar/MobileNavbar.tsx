"use client";
import {
  BadgeIndianRupee,
  Blocks,
  ChartPie,
  CircleUserRound,
  FileText,
  House,
  Menu,
  MessageCircleQuestion,
  MessageSquareMore,
  PackagePlus,
  PackageSearch,
  Settings,
  SquarePlus,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import ToggleMode from "../Theme/ToggleMode";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  async function clearCookies() {
    try {
      const response = await axios.get("api/clearCookies");
      if (response.data?.data) {
        router.push("/login");
      }
    } catch (error) {
      console.log(`Erro clearing cookies : ${error}`);
    }
  }

  return (
    <>
      <div className="lg:hidden flex items-center justify-between">
        <div>
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
        <div className="flex items-center justify-center gap-3">
          <ToggleMode />
          <Link
            href={"/blogList"}
            title="View Blogs"
            className="p-2 border rounded-full border-gray-300 text-gray-500 flex items-center justify-center gap-2 dark:text-white dark:border-neutral-600 cursor-pointer hover:bg-gray-100 transition-all ease-linear duration-200 dark:hover:bg-neutral-800"
          >
            <FileText />
          </Link>
          <Link
            href={"/productList"}
            title="View Products"
            className="p-2 border rounded-full border-gray-300 text-gray-500 flex items-center justify-center gap-2 dark:text-white dark:border-neutral-600 cursor-pointer hover:bg-gray-100 transition-all ease-linear duration-200 dark:hover:bg-neutral-800"
          >
            <PackageSearch />
          </Link>
          <div className="relative">
            <div className="relative">
              <Image
                onClick={() => {
                  setDropDown((prev) => !prev);
                }}
                src={user?.avatar || "/placeholder.jpg"}
                alt="user-image"
                width={100}
                height={100}
                className="h-10 w-10 rounded-full border border-gray-300 dark:border-neutral-700 dark:text-white cursor-pointer object-contain ring-2 ring-lightBorder"
              />
              <span className="absolute -top-1 -right-1 text-[10px] animate-pulse">
                {user?.isAdmin ? "🟢" : "🔴"}
              </span>
            </div>
            {dropDown && (
              <div className="absolute -right-2 my-[5px] transition-all ease-linear duration-300 w-auto border border-lightBorder dark:border-darkBorder p-2 rounded z-10 bg-white dark:bg-darkMode dark:text-white ">
                <h1 className="py-1 px-2 text-sm  border border-lightBorder dark:border-darkBorder my-1 rounded">
                  {user?.name}
                </h1>
                <h1 className="py-1 px-2 text-sm  border border-lightBorder dark:border-darkBorder my-1 rounded">
                  {user?.email}
                </h1>
                <button
                  onClick={() => {
                    clearCookies();
                    localStorage.clear();
                  }}
                  className="p-1 w-full border border-lightBorder dark:border-darkBorder my-1 rounded cursor-pointer text-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <nav>
        {/* nav buttons */}

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden transition-all duration-300 ">
            <div className="px-4 py-4 ">
              <nav className="h-fit">
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
                  href={"/blogList"}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-orange-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-orange-200 hover:text-orange-600 transition-all ease-linear duration-200"
                >
                  <span className="flex gap-3">
                    <FileText className="text-orange-500" />
                    View Blogs
                  </span>
                </Link>

                <Link
                  href={"/productList"}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-fuchsia-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-fuchsia-200 hover:text-fuchsia-600 transition-all ease-linear duration-200"
                >
                  <span className="flex gap-3">
                    <FileText className="text-fuchsia-500" />
                    View Products
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
                  href={"/profile"}
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-gray-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-gray-200 hover:text-gray-700 transition-all ease-linear duration-200"
                >
                  <span className="flex gap-3">
                    <CircleUserRound className="text-gray-700" />
                    Profile
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
    </>
  );
};

export default MobileNavbar;
