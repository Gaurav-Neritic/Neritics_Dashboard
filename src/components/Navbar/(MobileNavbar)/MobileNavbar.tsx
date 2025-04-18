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
import { navLinks } from "@/lib/navLinks";

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
      <div className="lg:hidden flex items-center justify-between">
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
        <div className="flex items-center justify-center gap-3">
          <ToggleMode />
          <Link
            href="/blogList"
            title="View Blogs"
            className="p-2 border rounded-full border-gray-300 text-gray-500 flex items-center justify-center gap-2 dark:text-white dark:border-neutral-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <FileText />
          </Link>
          <Link
            href="/productList"
            title="View Products"
            className="p-2 border rounded-full border-gray-300 text-gray-500 flex items-center justify-center gap-2 dark:text-white dark:border-neutral-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <PackageSearch />
          </Link>
          <div className="relative">
            <Image
              onClick={() => setDropDown((prev) => !prev)}
              src={user?.avatar || "/placeholder.jpg"}
              alt="user-image"
              width={100}
              height={100}
              className="h-10 w-10 rounded-full border border-gray-300 dark:border-neutral-700 cursor-pointer object-contain ring-2 ring-lightBorder"
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
                  className="p-1 w-full border border-lightBorder dark:border-darkBorder my-1 rounded text-sm"
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
        <div className="lg:hidden min-h-screen py-10">
          <div className="px-4 py-4">
            <nav className="   ">
              {navLinks.map((link) => (
                <MobileNavLink
                  key={link.href}
                  href={link.href}
                  icon={link.icon}
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);
                  }}
                >
                  {link.label}
                </MobileNavLink>
              ))}

              {/* Action Icons */}
              <div className=" w-50  flex mx-auto p-2 my-5 rounded border border-lightBorder dark:border-darkBorder">
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
