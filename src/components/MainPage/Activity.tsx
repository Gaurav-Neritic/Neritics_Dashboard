"use client";
import { LineChart } from "@mui/x-charts";
import { CircleDot } from "lucide-react";
import React from "react";


const Activity = () => {

    return (
        <div className="p-4 my-5 border rounded border-lightBorder dark:border-darkBorder">
            <div className="flex items-center justify-between ">
                <h1 className="font-semibold text-gray-600 uppercase dark:text-gray-200">
                    Market Overview
                </h1>
                <div className="items-center justify-center hidden gap-5 lg:flex">

                    <button type="button" className="flex items-center justify-center gap-3 cursor-pointer">
                        <CircleDot className="w-5 h-5 text-white bg-blue-700 rounded-full" />
                        Goal
                    </button>
                    <button className="flex items-center justify-center gap-3">

                        <CircleDot className="w-5 h-5 text-white bg-blue-200 rounded-full" />
                        Activity
                    </button>
                </div>
            </div>
            <div className="flex mt-4 dark:bg-neutral-800/50">
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
