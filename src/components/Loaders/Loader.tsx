import { LoaderCircle } from "lucide-react";
import React from "react";

const Loader = ({ title }: { title: string }) => {
  return (
    <>
      <span className="flex items-center justify-center gap-3">
        <LoaderCircle className="animate-spin" />
        {title}
      </span>
    </>
  );
};

export default Loader;
