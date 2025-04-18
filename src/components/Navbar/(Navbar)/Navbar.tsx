"use client";
import Image from "next/image";
import Link from "next/link";
import {
  BadgeIndianRupee,
  Blocks,
  ChartPie,
  CircleUserRound,
  FilePlus,
  FileText,
  Home,
  House,
  Info,
  MessageCircleQuestion,
  MessageSquareMore,
  PackagePlus,
  Settings,
  SquarePlus,
} from "lucide-react";
import ToggleMode from "@/components/Theme/ToggleMode";
import NavLink from "./NavLink";


const SidebarNav = () => {
  const navLinks = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/addProduct", icon: FilePlus, label: "Add Product" },
    { href: "/addBlog", icon: SquarePlus, label: " Add Blog" },
    { href: "/orders", icon: PackagePlus, label: " Orders" },
    { href: "/queries", icon: MessageCircleQuestion, label: "Queries" },
    { href: "/sales", icon: ChartPie, label: "Sales" },
    { href: "/stocks", icon: Blocks, label: " Stocks" },
    { href: "/enquiry", icon: MessageSquareMore, label: "Enquiry" },
    { href: "/profile", icon: CircleUserRound, label: "Profile" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <section className="p-5">
      {/* logo Dashboard */}
      <div className="hidden lg:block ">
        <div className="flex items-center justify-center py-3  ">
          <Link
            href={"/"}
            className="flex items-center justify-center uppercase font-semibold text-lg text-green-600"
          >
            <Image
              src={"/logo-wellness.png"}
              priority
              width={120}
              height={120}
              alt="logo"
              className="h-auto w-auto"
            />
            {/* <span className="text-cyan-600">Neri</span>tic's */}
          </Link>
        </div>
      </div>
      <nav className=" hidden lg:block py-5 dark:text-black ">
        {navLinks.map((link) => (
          <NavLink key={link.href} href={link.href} icon={link.icon}>
            {link.label}
          </NavLink>
        ))}
      </nav>
      {/* Action Button Section */}
      <div className="hidden lg:block">
        <div className=" grid grid-cols-3 place-items-center">
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
    </section>
  );
};

export default SidebarNav;
