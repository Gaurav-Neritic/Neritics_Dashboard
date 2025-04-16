"use client";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Radar, Pie } from "react-chartjs-2";
import { ChevronDown } from "lucide-react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

export const anlyticsData = {
  labels: [
    "Product 1",
    "Product 2",
    "Product 3",
    "Product 4",
    "Product 5",
    "Product 6",
  ],
  datasets: [
    {
      label: "Product Votes",
      data: [2, 9, 3, 5, 2, 3],
      backgroundColor: "rgba(255, 99, 132, 0.3)",
      borderColor: "rgba(255, 99, 132)",
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    r: {
      angleLines: {
        display: true,
        color: "rgba(255, 99, 132, 0.3)", // Color of the radar lines
      },
      grid: {
        color: "gray", // Color of the grid lines
      },
      ticks: {
        backdropColor: "rgba(255, 255, 255, 0.1)", // Color of the background behind the ticks
      },
    },
  },
};

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.4)",
        "rgba(54, 162, 235, 0.4)",
        "rgba(255, 206, 86, 0.4)",
        "rgba(75, 192, 192, 0.4)",
        "rgba(153, 102, 255, 0.4)",
        "rgba(255, 159, 64, 0.4)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const OverView = () => {
  return (
    <div className="grid-cols-1 lg:grid-cols-2 grid gap-4">
      <div className="border my-5 p-4 rounded border-lightBorder dark:border-darkBorder ">
        <div className="flex items-center justify-between pb-3 border-b border-lightBorder dark:border-darkBorder ">
          <h1 className="font-semibold uppercase text-gray-600 dark:text-gray-200">
            Sales Overview
          </h1>
          <button
            type="button"
            className="flex items-center justify-center gap-1 text-gray-600 cursor-pointer dark:text-gray-200"
          >
            <span>Today</span>
            <ChevronDown />
          </button>
        </div>
        <div className="py-3 dark:bg-neutral-800">
          <Pie data={data} />
        </div>
      </div>

      <div className="border my-5 p-4 rounded border-lightBorder dark:border-darkBorder ">
        <div className="flex items-center justify-between pb-3 border-b border-lightBorder dark:border-darkBorder ">
          <h1 className="font-semibold uppercase text-gray-600 dark:text-gray-200">
            Sales Analytics
          </h1>
        </div>
        <div className="py-3 dark:bg-neutral-800 dark:text-gray-200">
          <Radar data={anlyticsData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default OverView;
