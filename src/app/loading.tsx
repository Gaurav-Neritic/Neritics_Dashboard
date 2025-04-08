import Loader from "@/components/Loaders/Loader";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center py-10 h-auto text-2xl font-semibold">
      <Loader title="Loading ...." />
    </div>
  );
};

export default Loading;
