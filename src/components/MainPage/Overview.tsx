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
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loaders/Loader";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

interface productProps {
  title: string,
  stock: number,
  image: [string],
  price: number,
  category: string,
  listingStatus: boolean
}

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

  async function getProducts() {
    try {
      const response = await axios.get("api/getProducts");
      if (response.data.data) {
        return response.data.data;
      }
      return []
    } catch (error: any) {
      console.log("Error fetching the products : ", error);
      return []
    }
  }

  const { data: productAnalytics = [], isLoading, isError } = useQuery({
    queryFn: getProducts,
    queryKey: ['productAnalytics'],
    refetchOnWindowFocus: false
  })

  const anlyticsData = {
    labels: productAnalytics.map((product: productProps) => product?.title.split(" ")[0].toUpperCase()),
    datasets: [
      {
        label: "Product Stock",
        data: productAnalytics.map((product: productProps) => product?.stock),
        backgroundColor: "rgba(255, 99, 132, 0.3)",
        borderColor: "rgba(255, 99, 132)",
        borderWidth: 1,
      },
    ],
  };
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
        <div className="py-3 dark:bg-neutral-800/50">
          <Pie data={data} />
        </div>
      </div>

      <div className="border my-5 p-4 rounded border-lightBorder dark:border-darkBorder ">
        <div className="flex items-center justify-between pb-3 border-b border-lightBorder dark:border-darkBorder ">
          <h1 className="font-semibold uppercase text-gray-600 dark:text-gray-200">
            Stock Analytics
          </h1>
        </div>
        <div className="py-3 dark:bg-neutral-800/50 dark:text-gray-200">
          {isError && <span>Something went Wrong</span>}
          {isLoading ? <Loader title="Fetching..." /> :
            <Radar data={anlyticsData} options={options} />}
        </div>
      </div>
    </div>
  );
};

export default OverView;
