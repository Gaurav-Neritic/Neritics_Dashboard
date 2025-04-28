"use client";
import Image from "next/image";
import Link from "next/link";
import ToggleMode from "@/components/Theme/ToggleMode";
import NavLink from "./NavLink";
import { navLinks } from "@/lib/navLinks";


const SidebarNav = () => {
  return (
    <section className="p-5">
      {/* logo Dashboard */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-center py-3">
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
          </Link>
        </div>
      </div>

      <nav className="hidden lg:block py-5 dark:text-black">
        {navLinks.map((link) => (
          <NavLink key={link.href} href={link.href} icon={link.icon}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* Action Button Section */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-3 place-items-center">
          <ToggleMode />
          <Link
            href={"mailto:gaurav@neriticindustries.in"}
            target="_blank"
            className="p-1 rounded-full border border-gray-300 dark:border-neutral-700 dark:text-white cursor-pointer"
          >
            <span className="text-2xl" title="mail">✉️</span>
          </Link>
          <Link
            href={"https://neriticwellness.com/"}
            target="_blank"
            className="p-1 rounded-full border border-gray-300 dark:border-neutral-700 dark:text-white cursor-pointer"
          >
            <span className="text-2xl" title="site">🌐</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SidebarNav;
