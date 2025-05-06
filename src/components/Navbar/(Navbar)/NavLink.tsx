import Link from "next/link";

const NavLink = ({ href, icon, children }: { href: string, icon: React.JSX.Element, children: React.ReactNode }) => (
  <Link
    href={href}
    className="flex items-center w-full gap-2 p-2 my-2 transition-all duration-200 ease-linear bg-red-100 border rounded border-lightBorder dark:border-darkBorder dark:bg-neutral-800/50 hover:dark:bg-neutral-700/50 dark:text-white hover:bg-gray-200/90"
  >
    <span className="flex gap-3">
      {icon}
    </span>
    {children}
  </Link>
);

export default NavLink;
