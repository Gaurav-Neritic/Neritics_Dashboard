"use client";

import React, { useEffect, useState } from "react";

const ToggleMode = () => {
  const [mode, setMode] = useState("");

  const theme = {
    mode: 'dark'
  }

  const handelMode = () => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
      setMode("");
      localStorage.removeItem('siteMode')
    } else {
      document.body.classList.add("dark");
      setMode("dark");
      localStorage.setItem('siteMode', JSON.stringify(theme));
    }
  };


  useEffect(() => {
    const localModule = localStorage.getItem("siteMode");
    if (localModule === null) {
      setMode("")
    }
    if (localModule !== null) {
      const localStoreMode = JSON.parse(localModule);
      console.log(localStoreMode.mode)
      if (localStoreMode.mode === "dark") {
        setMode("dark")
      } else {
        setMode("")
      }
    }

    if (mode === "dark") {
      document.body.classList.add("dark")
    } else {
      document.body.classList.remove("dark");
    }


  }, [mode]);

  return (
    <>
      <button
        onClick={handelMode}
        className="p-1 border border-gray-300 rounded-full cursor-pointer dark:border-neutral-700 dark:text-white"
      >
        {mode === "" ? (
          <span className="text-2xl" title="day-time">
            🌞
          </span>
        ) : (
          <span className="text-2xl" title="night-time">
            🌚
          </span>
        )}
      </button>
    </>
  );
};

export default ToggleMode;
