"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  AlertCircle,
  Check,
  Trash2,
} from "lucide-react";

const QueriesTable = () => {
  const [expandedQuery, setExpandedQuery] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Delete Handle
  const handleDelete = (productId: any) => {
    setProductToDelete(productId);
    setDeletePopup(true);
  };

  const confirmDelete = () => {
    // Here you would add the actual delete logic
    console.log(`Deleting product: ${productToDelete}`);
    setDeletePopup(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setDeletePopup(false);
    setProductToDelete(null);
  };
  const queries = [
    {
      id: 1,
      profile: "./user.jpg",
      customer: "Sanket",
      email: "Sanket@example.com",
      subject: "Order #1234 Delivery Issue ",
      status: "Open",
      date: "2025-03-15",
      message:
        "I ordered 3 items on March 10th but only received 2. The missing item is Product ID #5678. Could you please help me resolve this issue?",
      responses: [],
    },
    {
      id: 2,
      customer: "Gaurav",
      profile: "./user.jpg",
      email: "Gaurav@example.com",
      subject: "Account Access Problem",
      status: "In Progress",
      date: "2025-03-16",
      message:
        "I'm having trouble logging into my account. I've tried resetting my password but I'm not receiving the reset email. Can someone help?",
      responses: [],
    },
    {
      id: 3,
      customer: "Yash",
      profile: "./user.jpg",
      email: "Yash@example.com",
      subject: "Account Access Problem",
      status: "Resolved",
      date: "2025-03-16",
      message:
        "I'm having trouble logging into my account. I've tried resetting my password but I'm not receiving the reset email. Can someone help?",
      responses: [],
    },
  ];

  const toggleQueryExpansion = (id: any) => {
    if (expandedQuery === id) {
      setExpandedQuery(null);
    } else {
      setExpandedQuery(id);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertCircle size={16} className="text-yellow-500" />;
      case "In Progress":
        return <MessageSquare size={16} className="text-blue-500" />;
      case "Resolved":
        return <Check size={16} className="text-green-500" />;
      default:
        return null;
    }
  };


  return (
    <>
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold mb-6">Customer Queries</h1>
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search queries..."
              className="pl-10 pr-4 py-2 w-full border border-lightBorder dark:border-darkBorder  rounded  dark:bg-neutral-800 dark:text-gray-100"
            />
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <select className="appearance-none pl-3 pr-8 py-2 border border-lightBorder dark:border-darkBorder  rounded  dark:bg-neutral-800 dark:text-gray-100">
                <option>All Statuses</option>
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <ChevronDown size={16} className="text-gray-400" />
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 border border-lightBorder dark:border-darkBorder  rounded dark:bg-neutral-800 dark:text-gray-100">
              <Filter size={16} />
              <span>More Filters</span>
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default QueriesTable;
