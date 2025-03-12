"use client";
import { LineChart } from "@mui/x-charts";
import { CircleDot } from "lucide-react";
import React from "react";

const Activity = () => {

    return (
        <div className="border my-5 p-4 rounded border-gray-200">
            <div className="flex items-center justify-between ">

                <h1 className="uppercase font-semibold text-gray-600">
                    Market Overview
                </h1>
                <div className="flex items-center justify-center gap-5">
                    <button type="button" className="flex gap-3 items-center justify-center cursor-pointer">
                        <CircleDot className="h-5 w-5 bg-blue-700 text-white rounded-full" />
                        Goal
                    </button>
                    <button type="button" className="flex gap-3 items-center justify-center cursor-pointer">
                        <CircleDot className="h-5 w-5 bg-blue-200 text-white rounded-full" />
                        Activity
                    </button>
                </div>
            </div>
            <div className="flex">
                <LineChart
                    className="w-full"
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                        {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                    ]}
                    height={300}
                />
            </div>
        </div>
    );
};

export default Activity;
