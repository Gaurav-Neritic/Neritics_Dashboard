import Link from "next/link";

const NavLink = ({ href, icon: Icon, children }: any) => (
  <Link
    href={href}
    className="border border-lightBorder dark:border-darkBorder dark:bg-neutral-800/50  hover:dark:bg-neutral-700/50 dark:text-white hover:bg-gray-200/90 w-full rounded p-2 my-2 flex items-center  gap-2 transition-all ease-linear duration-200 bg-red-100"
  >
    <span className="flex gap-3">
      <Icon />
    </span>
    {children}
  </Link>
);

export default NavLink;
