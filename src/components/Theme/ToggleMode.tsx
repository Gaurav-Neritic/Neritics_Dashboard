"use client";

import { MoonStar, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

const ToggleMode = () => {
  const [mode, setMode] = useState("");

  const handelMode = () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
      setMode("");
    } else {
      document.body.classList.add("dark");
      setMode("dark");
    }
  };

  useEffect(() => {
    mode === "dark"
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [mode]);

  return (
    <button
      onClick={handelMode}
      className="p-2 rounded-full border border-gray-300 dark:border-neutral-700 dark:text-white cursor-pointer"
    >
      {mode === "" ? (
        <span>
          <Sun />
        </span>
      ) : (
        <span>
          <MoonStar />
        </span>
      )}
    </button>
  );
};

export default ToggleMode;
