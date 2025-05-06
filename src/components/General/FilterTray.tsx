import { SlidersHorizontal } from "lucide-react";
import React from "react";

const FilterTray = () => {


    return (
        <div className="px-4 py-2 border rounded border-lightBorder dark:border-darkBorder ">
            <div className="flex items-center justify-start gap-3">
                <SlidersHorizontal />
                <select className="px-3 py-1 border rounded outline-none border-lightBorder dark:border-darkBorder">
                    <option className="dark:bg-neutral-600">Filter One</option>
                    <option className="dark:text-black">Option 2</option>
                    <option className="dark:text-black">Option 3</option>
                    <option className="dark:text-black">Option 4</option>
                </select>
                <select className="px-3 py-1 border rounded outline-none border-lightBorder dark:border-darkBorder">
                    <option className="dark:bg-neutral-600">Type</option>
                    <option className="dark:text-black">Type 2</option>
                    <option className="dark:text-black">Type 3</option>
                    <option className="dark:text-black">Type 4</option>
                </select>

                <select className="px-3 py-1 border rounded outline-none border-lightBorder dark:border-darkBorder">
                    <option className="dark:bg-neutral-600">Range</option>
                    <option className="dark:text-black">From 1 to 2</option>
                    <option className="dark:text-black">From 2 to 3</option>
                    <option className="dark:text-black">From 3 to 4</option>
                </select>

                <select className="px-3 py-1 border rounded outline-none border-lightBorder dark:border-darkBorder">
                    <option className="dark:bg-neutral-600">Time</option>
                    <option className="dark:text-black">Recently</option>
                    <option className="dark:text-black">Frequently</option>
                    <option className="dark:text-black">Earlier</option>
                </select>

                <select
                    onChange={() => { }}
                    className="px-3 py-1 border rounded outline-none border-lightBorder dark:border-darkBorder"
                >
                    <option className="dark:bg-neutral-600">All</option>
                    <option className="dark:text-black">Listed</option>
                    <option className="dark:text-black">UnListed</option>
                </select>
            </div>
        </div>
    );
};

export default FilterTray;
