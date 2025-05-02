"use client";
import { FileText, Menu, PackageSearch, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import ToggleMode from "../../Theme/ToggleMode";
import Image from "next/image";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import MobileNavLink from "./MobileNavLink";

import {
  Home,
  FilePlus,
  SquarePlus,
  PackagePlus,
  MessageCircleQuestion,
  ChartPie,
  Blocks,
  MessageSquareMore,
  CircleUserRound,
  Settings,
} from "lucide-react";

const navLinks = [
  {
    href: "/", icon: <Home />, label: "Home"
  },
  { href: "/addProduct", icon: <FilePlus />, label: "Add Product" },
  { href: "/addBlog", icon: <SquarePlus />, label: " Add Blog" },
  { href: "/orders", icon: <PackagePlus />, label: " Orders" },
  { href: "/queries", icon: <MessageCircleQuestion />, label: "Queries" },
  { href: "/sales", icon: <ChartPie />, label: "Sales" },
  { href: "/stocks", icon: <Blocks />, label: " Stocks" },
  { href: "/enquiry", icon: <MessageSquareMore />, label: "Enquiry" },
  { href: "/profile", icon: <CircleUserRound />, label: "Profile" },
  { href: "/settings", icon: <Settings />, label: "Settings" },
];

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
      console.log(`Error clearing cookies: ${error}`);
    }
  }

  return (
    <>
      {/* Top Bar */}
      <div className="lg:hidden flex items-center justify-between p-2">
        <button
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
          className="p-2  "
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 dark:text-white" />
          ) : (
            <Menu className="w-6 h-6 dark:text-white" />
          )}
        </button>
        {/* Navbar Buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-3">
          <ToggleMode />
          <Link
            href="/blogList"
            title="View Blogs"
            className="p-2 border rounded-full border-gray-300 text-gray-500 flex items-center justify-center gap-2 dark:text-white dark:border-neutral-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <FileText className="w-6 h-6 sm:w-5 sm:h-5" />
          </Link>
          <Link
            href="/productList"
            title="View Products"
            className="p-2 border rounded-full border-gray-300 text-gray-500 flex items-center justify-center gap-2 dark:text-white dark:border-neutral-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <PackageSearch className="w-6 h-6 sm:w-5 sm:h-5" />
          </Link>
          <div className="relative">
            <Image
              onClick={() => setDropDown((prev) => !prev)}
              src={user?.avatar || "/placeholder.jpg"}
              alt="user-image"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border border-gray-300 dark:border-neutral-700 cursor-pointer object-contain ring-2 ring-lightBorder"
              style={{ height: "40px", width: "40px" }}
            />
            <span className="absolute -top-1 -right-1 text-[10px] animate-pulse">
              {user?.isAdmin ? "🟢" : "🔴"}
            </span>

            {dropDown && (
              <div className="absolute -right-2 mt-2 w-max border border-lightBorder dark:border-darkBorder p-2 rounded z-10 bg-white dark:bg-darkMode dark:text-white">
                <h1 className="py-1 px-2 text-sm border border-lightBorder dark:border-darkBorder my-1 rounded">
                  {user?.name}
                </h1>
                <h1 className="py-1 px-2 text-sm border border-lightBorder dark:border-darkBorder my-1 rounded">
                  {user?.email}
                </h1>
                <button
                  onClick={() => {
                    clearCookies();
                    localStorage.clear();
                  }}
                  className="p-1 w-full border border-lightBorder dark:border-darkBorder my-1 rounded text-sm cursor-pointer hover:bg-red-500/80 hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden min-h-screen py-5">
          <div className="px-4 py-4">
            <nav>
              {navLinks.map(({ href, icon, label }: { href: string, icon: React.JSX.Element, label: string }) => (
                <MobileNavLink
                  key={href}
                  href={href}
                  icon={icon}
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                  }}
                >
                  {label}
                </MobileNavLink>
              ))}

              {/* Action Icons */}
              <div className=" w-50  flex mx-auto p-1.5 my-5 rounded border border-lightBorder dark:border-darkBorder">
                <div className="grid grid-cols-3 place-items-center  mx-auto gap-4">
                  <ToggleMode />
                  <Link
                    href="https://gmail.com"
                    target="_blank"
                    className="p-1 rounded-full border border-gray-300 dark:border-neutral-700 dark:text-white cursor-pointer"
                  >
                    <span className="text-2xl" title="mail">
                      ✉️
                    </span>
                  </Link>
                  <Link
                    href="https://neriticwellness.com/"
                    target="_blank"
                    className="p-1 rounded-full border border-gray-300 dark:border-neutral-700 dark:text-white cursor-pointer"
                  >
                    <span className="text-2xl" title="site">
                      🌐
                    </span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNavbar;
