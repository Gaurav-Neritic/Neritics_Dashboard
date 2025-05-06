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
      className="flex items-center gap-4 p-2 mx-auto my-2 border rounded border-lightBorder dark:border-darkBorder dark:bg-neutral-800/50 hover:dark:bg-neutral-700/50 dark:text-white hover:bg-gray-200/90 w-50"
    >
      <span className="flex items-center justify-center">
        {icon}
      </span>
      <span className="text-md">{children}</span>
    </button>
  );
};

export default MobileNavLink;
