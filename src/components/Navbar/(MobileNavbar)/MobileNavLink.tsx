"use client";

import { useRouter } from "next/navigation";

const MobileNavLink = ({ href, icon: Icon, children, onClick }: any) => {
  const router = useRouter();

  const handleClick = () => {
    onClick();
    router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      className="border border-lightBorder dark:border-darkBorder dark:bg-neutral-800/50 hover:dark:bg-neutral-700/50 dark:text-white hover:bg-gray-200/90 w-50 rounded p-2 my-2  mx-auto flex gap-4 "
    >
      <span className="flex gap-3">
        <Icon />
      </span>
      {children}
    </button>
  );
};

export default MobileNavLink;
