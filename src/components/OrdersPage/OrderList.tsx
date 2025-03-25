"use client";
import { useState } from "react";


const OrderList = () => {
  const [activeTab, setActiveTab] = useState("all");

  const orders = [
    {
      id: 1,
      orderID: "#78522155",
      product: "Smart watch",
      address: "Pune,India",
      date: "20/03/2025",
      price: "₹3999.00",
      status: "Completed",
    },
    {
      id: 2,
      orderID: "#78522155",
      product: "Headphones",
      address: "Pune,India",
      date: "21/03/2025",
      price: "₹2760.00",
      status: "Processing",
    },
    {
      id: 3,
      orderID: "#78522155",
      product: "Iphone Pro",
      address: "Pune,India",
      date: "01/04/2025",
      price: "₹90000.00",
      status: "Cancelled",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600";
      case "Processing":
        return "bg-yellow-100 text-yellow-600";
      case "Cancelled":
        return "bg-red-100 text-red-500";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status.toLowerCase() === activeTab.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold uppercase ">Order Lists</h1>
      </div>
      <div className=" border  border-lightBorder dark:border-darkBorder  rounded overflow-hidden">
        {/* Tabs Button */}
        <div className="p-5">
          <div className="flex gap-5 justify-center items-center border   border-lightBorder dark:border-darkBorder rounded">
            <div className="flex">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-6 py-4 ${activeTab === "all" ? "border-b-2 border-sky-500 text--500 " : ""}`}
              >
                All orders
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`px-6 py-4 ${activeTab === "completed" ? "border-b-2   border-green-500 text-green-500" : ""}`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveTab("Processing")}
                className={`px-6 py-4 ${activeTab === "Processing" ? "border-b-2 text-yellow-500 border-yellow-500  " : ""}`}
              >
                Processing
              </button>
              <button
                onClick={() => setActiveTab("cancelled")}
                className={`px-6 py-4 ${activeTab === "cancelled" ? "border-b-2 text-red-500 border-red-500" : ""}`}
              >
                Cancelled
              </button>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className=" grid grid-cols-7 px-4 py-3 border-y    border-lightBorder dark:border-darkBorder ">
          <div className="">#</div>
          <div className="">Order ID</div>
          <div className="">Product Name</div>
          <div className="">Address</div>
          <div className="">Date</div>
          <div className="">Price</div>
          <div className="">Status</div>
        </div>
        {/* Order Rows */}
        <div className="divide-y divide-lightBorder  dark:divide-darkBorder  ">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-7 px-4 py-4 items-center "
            >
              <div className="">{order.id}</div>
              <div className="">{order.orderID}</div>
              <div className="flex items-center">
                <div className="ml-4">
                  <div className="">{order.product}</div>
                </div>
              </div>
              <div className="">{order.address}</div>
              <div className="">{order.date}</div>
              <div className="">{order.price}</div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
