"use client";
import Image from "next/image";
import Link from "next/link";
import ToggleMode from "@/components/Theme/ToggleMode";
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
import { usePathname } from "next/navigation";


const navLinks = [
  {
    href: "/", icon: <Home />, label: "Home"
  },
  {
    href: "/addProduct", icon: <FilePlus />, label: "Add Product"
  },
  { href: "/addBlog", icon: <SquarePlus />, label: " Add Blog" },
  { href: "/orders", icon: <PackagePlus />, label: " Orders" },
  { href: "/queries", icon: <MessageCircleQuestion />, label: "Queries" },
  { href: "/sales", icon: <ChartPie />, label: "Sales" },
  { href: "/stocks", icon: <Blocks />, label: " Stocks" },
  { href: "/enquiry", icon: <MessageSquareMore />, label: "Enquiry" },
  { href: "/profile", icon: <CircleUserRound />, label: "Profile" },
  { href: "/settings", icon: <Settings />, label: "Settings" },
];

const SidebarNav = () => {

  const pathName = usePathname();
  return (
    <section className="p-5">
      {/* logo Dashboard */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-center py-3">
          <Link href={"/"} className="flex items-center justify-center text-lg font-semibold text-green-600 uppercase">
            <Image
              src={"/logo-wellness.png"}
              priority
              width={120}
              height={120}
              alt="logo"
              className="w-auto h-auto" />
          </Link>
        </div>
      </div>

      <nav className="hidden py-5 lg:block dark:text-black">
        {navLinks.map(({ href, icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`border-y-[1px] border-4 border-x-4 hover:dark:bg-neutral-700/50 dark:text-white hover:bg-gray-100/90 w-full rounded p-2 my-2 flex items-center  gap-2 transition-all ease-linear duration-200  
            ${pathName === href ?
                " dark:bg-neutral-700/50 dark:text-black dark:shadow-neutral-500 shadow-neutral-300 dark:ring-neutral-500 border-black/70 dark:border-white/80 text-black"
                : "border-lightBorder dark:border-darkBorder text-gray-700 "}`}>
            {/* Name */}
            {icon}
            {label}
          </Link>
        ))}
      </nav>

      {/* Action Button Section */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 place-items-center">
          <ToggleMode />
          <Link
            href={"mailto:gaurav@neriticindustries.in"}
            target="_blank"
            className="p-1 border border-gray-300 rounded-full cursor-pointer dark:border-neutral-700 dark:text-white"
          >
            <span className="text-2xl" title="mail">✉️</span>
          </Link>
          <Link
            href={"https://neriticwellness.com/"}
            target="_blank"
            className="p-1 border border-gray-300 rounded-full cursor-pointer dark:border-neutral-700 dark:text-white"
          >
            <span className="text-2xl" title="site">🌐</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SidebarNav;
