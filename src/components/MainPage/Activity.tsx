"use client";
import { LineChart } from "@mui/x-charts";
import { CircleDot } from "lucide-react";
import React, { useState } from "react";


const Activity = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleHover = () => {
        setIsHovered(!isHovered);
    };
    return (
        <div className="border my-5 p-4 rounded border-lightBorder  dark:border-darkBorder">
            <div className="flex items-center justify-between ">
                <h1 className="uppercase font-semibold text-gray-600 dark:text-gray-200">
                    Market Overview
                </h1>
                <div className="items-center justify-center gap-5 hidden lg:flex">

                    <button type="button" className="flex gap-3 items-center justify-center cursor-pointer">
                        <CircleDot className="h-5 w-5 bg-blue-700 text-white rounded-full" />
                        Goal
                    </button>
                    <button className="flex gap-3 items-center justify-center">

                        <CircleDot className="h-5 w-5 bg-blue-200 text-white rounded-full" />
                        Activity
                    </button>
                </div>
            </div>
            <div className="flex dark:bg-neutral-800/50 mt-4">
                <LineChart
                    className="w-full"
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    sx={{
                        '& .MuiChartsAxis-left .MuiChartsAxis-line': {
                            stroke: 'gray',
                            strokeWidth: 1,
                        },
                        '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
                            stroke: 'gray',
                            strokeWidth: 1,
                        },
                        '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
                            fill: 'gray', // Text color
                        },
                        '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
                            fill: 'gray', // Text color
                        },
                    }}
                    height={300}
                />
            </div>
        </div>
    );
};

export default Activity;
