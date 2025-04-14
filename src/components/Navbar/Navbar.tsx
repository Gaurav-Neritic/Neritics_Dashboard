"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  BadgeIndianRupee,
  Blocks,
  ChartPie,
  FileText,
  House,
  MessageCircleQuestion,
  MessageSquareMore,
  PackagePlus,
  Settings,
  SquarePlus,
} from "lucide-react";
import ToggleMode from "@/components/Theme/ToggleMode";
import axios from "axios";
import { useRouter } from "next/navigation";

const SidebarNav = () => {

  const [loggedUser, setLoggedUser]: any = useState({})
  const router = useRouter();


  async function clearCookies() {
    try {
      const response = await axios.get('api/clearCookies');
      if (response.data?.data) {
        router.push('/login')
      }
    } catch (error) {
      console.log(`Erro clearing cookies : ${error}`)
    }
  }


  useEffect(() => {
    const localUser: any = localStorage.getItem("user");
    const loggedUser = JSON.parse(localUser)

    if (loggedUser?.isAdmin) {
      setLoggedUser(loggedUser);
    } else {
      clearCookies();
    }

  }, [])


  return (
    <section className="p-5 border-lightBorder dark:border-darkBorder ">
      {/* logo Dashboard */}
      <div className="flex items-center justify-center py-3 ">
        <Link
          href={"/"}
          className="flex items-center justify-center uppercase font-semibold text-lg text-green-600"
        >
          <Image
            src={"/holi logo_12.png"}
            priority
            width={120}
            height={120}
            alt="logo"
            className="h-auto w-auto"
          />
          {/* <span className="text-cyan-600">Neri</span>tic's */}
        </Link>
      </div>

      {/* navbar Section */}
      <nav className="py-5 dark:text-black">
        <Link
          href={"/"}
          className="w-full bg-white border border-gray-200 rounded p-2 my-2 flex items-center justify-between gap-2 hover:bg-gray-200 transition-all ease-linear duration-200"
        >
          <span className="flex gap-3">
            <House />
            Home
          </span>
        </Link>

        <Link
          href={"/addProduct"}
          className="w-full bg-teal-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-teal-100 hover:text-teal-600 transition-all ease-linear duration-200"
        >
          <span className="flex gap-3">
            <SquarePlus className="text-teal-500" />
            Add Product
          </span>
        </Link>


        <Link
          href={"/addBlog"}
          className="w-full bg-cyan-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-cyan-200 hover:text-cyan-600 transition-all ease-linear duration-200"
        >
          <span className="flex gap-3">
            <FileText className="text-cyan-500" />
            Add Blog
          </span>
        </Link>

        <Link
          href={"/orders"}
          className="w-full bg-yellow-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-yellow-200 hover:text-yellow-600 transition-all ease-linear duration-200"
        >
          <span className="flex gap-3">
            <PackagePlus className="text-yellow-500" />
            Orders
          </span>
        </Link>

        <Link
          href={"/queries"}
          className="w-full bg-indigo-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-indigo-200 hover:text-indigo-600 transition-all ease-linear duration-200"
        >
          <span className="flex gap-3">
            <MessageCircleQuestion className="text-indigo-500" />
            Queries
          </span>
        </Link>

        <Link
          href={"/sales"}
          className="w-full bg-green-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-green-200 hover:text-green-600 transition-all ease-linear duration-200"
        >
          <span className="flex gap-3">
            <BadgeIndianRupee className="text-green-500" />
            Sales
          </span>
        </Link>


        <Link
          href={"/sales"}
          className="w-full bg-fuchsia-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-fuchsia-200 hover:text-fuchsia-600 transition-all ease-linear duration-200"
        >
          <span className="flex gap-3">
            <ChartPie className="text-fuchsia-500" />
            Reports
          </span>
        </Link>

        <Link
          href={"/stocks"}
          className="w-full bg-blue-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-blue-200 hover:text-blue-600 transition-all ease-linear duration-200"
        >
          <span className="flex gap-3">
            <Blocks className="text-blue-500" />
            Stocks
          </span>
        </Link>

        <Link
          href={"/enquiry"}
          className="w-full bg-red-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-red-200 hover:text-red-500 transition-all ease-linear duration-200"
        >
          <span className="flex gap-3">
            <MessageSquareMore className="text-red-500" />
            Enquiry
          </span>
        </Link>

        <Link
          href={"/settings"}
          className="w-full bg-gray-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-gray-200 hover:text-gray-700 transition-all ease-linear duration-200"
        >
          <span className="flex gap-3">
            <Settings className="text-gray-700" />
            Settings
          </span>
        </Link>
      </nav>

      {/* Action Button Section */}
      <div className="grid grid-cols-4 gap-4 place-items-center">
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
        <div className="relative group">
          <Image src={loggedUser?.avatar || "/placeholder.jpg"} alt="user-image" width={100} height={100} className="h-10 w-10 ring ring-darkMode rounded-full border border-gray-300 dark:border-neutral-700 dark:text-white cursor-pointer object-contain" />
          <div className="absolute -left-20 hidden group-hover:block w-auto border border-lightBorder dark:border-darkBorder p-2 rounded z-10 bg-white dark:bg-darkMode dark:text-white">
            <h1 className="py-1 px-2 border border-lightBorder dark:border-darkBorder my-1 rounded">{loggedUser?.name}</h1>
            <h1 className="py-1 px-2 border border-lightBorder dark:border-darkBorder my-1 rounded">{loggedUser?.email}</h1>
            <h1 className="py-1 px-2 border border-lightBorder dark:border-darkBorder my-1 rounded">isAdmin : {loggedUser?.isAdmin ? "✅" : "❌"}</h1>
            <button onClick={() => { clearCookies(); localStorage.clear(); }} className="p-1 w-full border border-lightBorder dark:border-darkBorder my-1 rounded cursor-pointer">Logout</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SidebarNav;
