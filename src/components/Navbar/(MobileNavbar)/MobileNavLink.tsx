"use client";

import { useRouter } from "next/navigation";

interface mobileProps {
  href: string,
  children: React.ReactNode,
  icon: React.JSX.Element,
  onClick: () => void
}

const MobileNavLink = ({ href, icon, children, onClick }: mobileProps) => {
  const router = useRouter();

  const handleClick = () => {
    onClick();
    router.push(href as string);
  };

  return (
    <button
      onClick={handleClick}
      className="border border-lightBorder dark:border-darkBorder dark:bg-neutral-800/50 hover:dark:bg-neutral-700/50 dark:text-white hover:bg-gray-200/90 w-50 rounded p-2 my-2  mx-auto flex items-center gap-4"
    >
      <span className="flex items-center justify-center">
        {icon}
      </span>
      <span className="text-md">{children}</span>
    </button>
  );
};

export default MobileNavLink;
