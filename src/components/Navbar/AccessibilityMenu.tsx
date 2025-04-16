"use client";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";
import { Bell, CircleHelp, File, FileText, PackageSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AccessibilityMenu = () => {
  const { user } = useUser();
  const router = useRouter();

  async function clearCookies() {
    try {
      const response = await axios.get("api/clearCookies");
      if (response.data?.data) {
        router.push("/login");
      }
    } catch (error) {
      console.log(`Error clearing cookies : ${error}`);
    }
  }

  return (
    <div className="hidden sm:block">
      <div className=" flex items-center justify-between p-5 gap-3 border-b border-lightBorder dark:border-darkBorder  m-5">
        <div className="flex gap-5 border  px-3 py-2 rounded border-lightBorder dark:border-darkBorder ">
          <Link
            href={"/notifications"}
            className="flex items-center justify-center gap-2 group cursor-pointer"
          >
            <Bell className="text-red-400 cursor-pointer dark:text-white group-hover:fill-red-200 dark:group-hover:fill-red-400" />
            <span className="text-gray-700 dark:text-white hidden lg:block">
              {" "}
              Notifications
            </span>
          </Link>
          <span className="h-auto w-[1px] bg-gray-300" />
          <Link
            href={"/help"}
            className="flex items-center justify-center gap-2 group cursor-pointer"
          >
            <CircleHelp className="text-blue-400 dark:text-white group-hover:fill-blue-200 dark:group-hover:fill-blue-400" />
            <span className="text-gray-700 dark:text-white hidden lg:block">Ask Help</span>
          </Link>
        </div>
        <div className="flex gap-3">
          <Link
            href={"/blogList"}
            className="px-4 py-2 border rounded border-gray-300 text-gray-500 flex items-center justify-center gap-2 dark:text-white dark:border-neutral-600 cursor-pointer hover:bg-gray-100 transition-all ease-linear duration-200 dark:hover:bg-neutral-800"
          >
            <FileText />
            View Blogs
          </Link>
          <Link
            href={"/productList"}
            className="px-4 py-2 border rounded border-gray-300 text-gray-500 flex items-center justify-center gap-2 dark:text-white dark:border-neutral-600 cursor-pointer hover:bg-gray-100 transition-all ease-linear duration-200 dark:hover:bg-neutral-800"
          >
            <PackageSearch />
            View Products
          </Link>
          <div className="relative group ">
            <div className="relative">
              <Image
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
            <div className="absolute -right-10 my-[5px] hidden group-hover:block w-auto border border-lightBorder dark:border-darkBorder p-2 rounded z-10 bg-white dark:bg-darkMode dark:text-white ">
              <h1 className="py-1 px-2 border border-lightBorder dark:border-darkBorder my-1 rounded">
                {user?.name}
              </h1>
              <h1 className="py-1 px-2 border border-lightBorder dark:border-darkBorder my-1 rounded">
                {user?.email}
              </h1>
              <button
                onClick={() => {
                  clearCookies();
                  localStorage.clear();
                }}
                className="p-1 w-full border border-lightBorder dark:border-darkBorder my-1 rounded cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default AccessibilityMenu;
