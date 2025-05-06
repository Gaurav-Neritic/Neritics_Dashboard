"use client";
import { useUser } from "@/app/context/UserContext";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Bell, CircleHelp, FileText, PackageSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "../Loaders/Loader";

const AccessibilityMenu = () => {
  const { user } = useUser();
  const router = useRouter();

  const logout = async () => {
    const id = JSON.stringify(user?._id);
    const _id = JSON.parse(id);
    try {
      const response = await axios.post("../api/logout", { _id });

      if (response.data.data) {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.log("Error logging out ", error);
    }
  };

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged Out");
      router.push("/login");
    },
  });

  const handelLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logoutMutation.mutate();
  };

  return (
    <div className="hidden lg:block">
      <div className="flex items-center justify-between gap-3 p-5 m-5 border-b border-lightBorder dark:border-darkBorder">
        <div className="flex gap-5 px-3 py-2 border rounded border-lightBorder dark:border-darkBorder ">
          <Link
            href={"/enquiry"}
            className="flex items-center justify-center gap-2 cursor-pointer group"  >
            <Bell className="text-red-400 cursor-pointer dark:text-white group-hover:fill-red-200 dark:group-hover:fill-red-400" />
            <span className="hidden text-gray-700 dark:text-white lg:block">
              {" "}
              Notifications
            </span>
          </Link>
          <span className="h-auto w-[1px] bg-gray-300" />
          <Link
            href={"/help"}
            className="flex items-center justify-center gap-2 cursor-pointer group">
            <CircleHelp className="text-blue-400 dark:text-white group-hover:fill-blue-200 dark:group-hover:fill-blue-400" />
            <span className="hidden text-gray-700 dark:text-white lg:block">
              Ask Help
            </span>
          </Link>
        </div>
        <div className="flex gap-3">
          <Link
            href={"/blogList"}
            className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 transition-all duration-200 ease-linear border border-gray-300 rounded cursor-pointer dark:text-white dark:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-800">
            <FileText />
            View Blogs
          </Link>
          <Link
            href={"/productList"}
            className="flex items-center justify-center gap-2 px-4 py-2 text-gray-700 transition-all duration-200 ease-linear border border-gray-300 rounded cursor-pointer dark:text-white dark:border-neutral-600 hover:bg-gray-100 dark:hover:bg-neutral-800">
            <PackageSearch />
            View Products
          </Link>
          <div className="relative hidden group lg:block">
            <div className="relative">
              <Image
                src={user?.avatar || "/placeholder.jpg"}
                alt="user-image"
                width={100}
                height={100}
                className="object-contain w-10 h-10 border border-gray-300 rounded-full cursor-pointer dark:border-neutral-700 dark:text-white ring-2 ring-lightBorder" />
              <span className="absolute -top-1 -right-1 text-[10px] animate-pulse">
                {user?.isAdmin ? "🟢" : "🔴"}
              </span>
            </div>
            <div className="absolute -right-10 my-[5px] hidden group-hover:block w-auto border border-lightBorder dark:border-darkBorder p-2 rounded z-10 bg-white dark:bg-darkMode dark:text-white ">
              <h1 className="px-2 py-1 my-1 border rounded border-lightBorder dark:border-darkBorder">
                {user?.name}
              </h1>
              <h1 className="px-2 py-1 my-1 border rounded border-lightBorder dark:border-darkBorder">
                {user?.email}
              </h1>
              <button
                onClick={handelLogout}
                className="w-full p-1 my-1 text-red-500 border border-red-500 rounded cursor-pointer dark:border-darkBorder dark:text-white hover:bg-red-500/80 hover:text-white">
                {logoutMutation.isPending ? (
                  <Loader title="Logging Out.." />
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessibilityMenu;
