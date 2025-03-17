"use client";
import { MoonStar, Sun } from "lucide-react";
import React, { useState } from "react";

const SettingsPage = () => {

    const [dark, setDark] = useState(false);

    const handelDark = () => {
        if (document.body.classList.contains('dark')) {
            document.body.classList.remove('dark')
            setDark(false);
        } else {
            document.body.classList.add('dark')
            setDark(true)
        }
    }
    return (
        <div className="p-5">
            <h1>Appearence</h1>
            <div>
                <button type="button" onClick={handelDark} className="cursor-pointer bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition-all ease-linear duration-200 dark:text-black dark:bg-gray">
                    <span >
                        {dark ?
                            <span className="flex items-center justify-center gap-3">Dark < MoonStar className="h-5 w-5" />
                            </span> : <span className="flex items-center justify-center gap-3">Light < Sun className="h-5 w-5" /></span>}
                    </span>
                </button>
            </div>
        </div>
    );
};

export default SettingsPage;
