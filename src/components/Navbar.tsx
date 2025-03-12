"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";
import {
    BadgeIndianRupee,
    Blocks,
    Bug,
    ChartPie,
    House,
    MessageCircleQuestion,
    PackagePlus,
    Settings,
    SquarePlus,
} from "lucide-react";

const SidebarNav = () => {
    return (
        <section className="p-5 border-gray-300">
            {/* logo Dashboard */}
            <div className="flex items-center justify-center py-3 ">
                <Link
<<<<<<< HEAD
                    href={"/"} className="flex items-center justify-center uppercase font-semibold text-lg text-green-600" >
                    <Image src={"/holi logo_12.png"} width={120} height={120} alt="logo" />
                    {/* <span className="text-cyan-600">Neri</span>tic's */}
=======
                    href={"/"}
                    className="flex items-center justify-center uppercase font-semibold text-lg text-green-600"
                >
                    <Image src={"/mini_Logo.png"} width={50} height={50} alt="logo" />
                    <span className="text-cyan-600">Neri</span>tic's
>>>>>>> fb4571e (start push in gaurav-home branch)
                </Link>
            </div>

            {/* navbar Section */}
            <nav className="py-5">
                <Link
                    href={"/"}
<<<<<<< HEAD
                    className="w-full bg-white border border-gray-200 rounded p-2 my-2 flex items-center justify-between gap-2 hover:bg-gray-200 transition-all ease-linear duration-200">
=======
                    className="w-full bg-white border border-gray-200 rounded p-2 my-2 flex items-center justify-between gap-2 hover:bg-gray-200 transition-all ease-linear duration-200"
                >
>>>>>>> fb4571e (start push in gaurav-home branch)
                    <span className="flex gap-3">
                        <House />
                        Home
                    </span>
                </Link>

                <Link
                    href={"/addProdduct"}
<<<<<<< HEAD
                    className="w-full bg-teal-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-teal-100 hover:text-teal-600 transition-all ease-linear duration-200">
=======
                    className="w-full bg-teal-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-teal-100 hover:text-teal-600 transition-all ease-linear duration-200"
                >
>>>>>>> fb4571e (start push in gaurav-home branch)
                    <span className="flex gap-3">
                        <SquarePlus className="text-teal-500" />
                        Add Product
                    </span>
                </Link>

                <Link
                    href={"/orders"}
<<<<<<< HEAD
                    className="w-full bg-yellow-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-yellow-200 hover:text-yellow-600 transition-all ease-linear duration-200">
=======
                    className="w-full bg-yellow-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-yellow-200 hover:text-yellow-600 transition-all ease-linear duration-200"
                >
>>>>>>> fb4571e (start push in gaurav-home branch)
                    <span className="flex gap-3">
                        <PackagePlus className="text-yellow-500" />
                        Orders
                    </span>
                </Link>

                <Link
                    href={"/queries"}
<<<<<<< HEAD
                    className="w-full bg-indigo-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-indigo-200 hover:text-indigo-600 transition-all ease-linear duration-200">
=======
                    className="w-full bg-indigo-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-indigo-200 hover:text-indigo-600 transition-all ease-linear duration-200"
                >
>>>>>>> fb4571e (start push in gaurav-home branch)
                    <span className="flex gap-3">
                        <MessageCircleQuestion className="text-indigo-500" />
                        Queries
                    </span>
                </Link>

                <Link
                    href={"/sales"}
<<<<<<< HEAD
                    className="w-full bg-green-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-green-200 hover:text-green-600 transition-all ease-linear duration-200">
=======
                    className="w-full bg-green-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-green-200 hover:text-green-600 transition-all ease-linear duration-200"
                >
>>>>>>> fb4571e (start push in gaurav-home branch)
                    <span className="flex gap-3">
                        <BadgeIndianRupee className="text-green-500" />
                        Sales
                    </span>
                </Link>

                <Link
                    href={"/sales"}
<<<<<<< HEAD
                    className="w-full bg-fuchsia-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-fuchsia-200 hover:text-fuchsia-600 transition-all ease-linear duration-200">
=======
                    className="w-full bg-fuchsia-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-fuchsia-200 hover:text-fuchsia-600 transition-all ease-linear duration-200"
                >
>>>>>>> fb4571e (start push in gaurav-home branch)
                    <span className="flex gap-3">
                        <ChartPie className="text-fuchsia-500" />
                        Reports
                    </span>
                </Link>

                <Link
                    href={"/stocks"}
<<<<<<< HEAD
                    className="w-full bg-blue-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-blue-200 hover:text-blue-600 transition-all ease-linear duration-200">
=======
                    className="w-full bg-blue-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-blue-200 hover:text-blue-600 transition-all ease-linear duration-200"
                >
>>>>>>> fb4571e (start push in gaurav-home branch)
                    <span className="flex gap-3">
                        <Blocks className="text-blue-500" />
                        Stocks
                    </span>
                </Link>

                <Link
                    href={"/report"}
<<<<<<< HEAD
                    className="w-full bg-red-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-red-200 hover:text-red-500 transition-all ease-linear duration-200">
=======
                    className="w-full bg-red-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-red-200 hover:text-red-500 transition-all ease-linear duration-200"
                >
>>>>>>> fb4571e (start push in gaurav-home branch)
                    <span className="flex gap-3">
                        <Bug className="text-red-500" />
                        Report Bug
                    </span>
                </Link>

                <Link
                    href={"/settings"}
<<<<<<< HEAD
                    className="w-full bg-gray-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-gray-200 hover:text-gray-700 transition-all ease-linear duration-200">
=======
                    className="w-full bg-gray-100 border border-gray-200 rounded p-2 my-2 flex items-start justify-between gap-2 hover:bg-gray-200 hover:text-gray-700 transition-all ease-linear duration-200"
                >
>>>>>>> fb4571e (start push in gaurav-home branch)
                    <span className="flex gap-3">
                        <Settings className="text-gray-700" />
                        Settings
                    </span>
                </Link>
            </nav>

            {/* Action Button Section */}
            <div></div>
        </section>
    );
};

export default SidebarNav;
