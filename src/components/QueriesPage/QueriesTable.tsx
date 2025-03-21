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

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
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

        {/* Queries List */}
        <div className="border border-lightBorder dark:border-darkBorder  rounded overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 bg-gray-100 dark:bg-neutral-800 p-4 border-b border-lightBorder dark:border-darkBorder  font-medium text-gray-700 dark:text-gray-200">
            <div className="col-span-1">ID</div>
            <div className="col-span-1">Profile</div>
            <div className="col-span-2">Customer</div>
            <div className="col-span-3">Subject</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-1">Actions</div>
          </div>

          {/* Query Items */}
          {queries.map((query) => (
            <div
              key={query.id}
              className="border-b border-lightBorder dark:border-darkBorder  last:border-b-0"
            >
              {/* Summary Row */}
              <div
                className={`grid grid-cols-12 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-700 ${
                  expandedQuery === query.id
                    ? "bg-gray-50 dark:bg-neutral-700"
                    : ""
                }`}
                onClick={() => toggleQueryExpansion(query.id)}
              >
                <div className="col-span-1 text-gray-500 dark:text-gray-300">
                  #{query.id}
                </div>
                <div className=" col-span-1 text-gray-500 dark:text-gray-400">
                  <img
                    src={query.profile}
                    alt="Profile"
                    className=" rounded-full w-10 h-10"
                  />
                </div>
                <div className="col-span-2 text-gray-800 dark:text-gray-200">
                  {query.customer}
                </div>
                <div className="col-span-3 text-gray-800 dark:text-gray-200 truncate">
                  {query.subject}
                </div>
                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClass(
                      query.status
                    )}`}
                  >
                    {getStatusIcon(query.status)}
                    <span className="ml-1">{query.status}</span>
                  </span>
                </div>
                <div className="col-span-2 text-gray-500 dark:text-gray-400">
                  {query.date}
                </div>
                <div className="grid place-items-center ">
                  <Trash2
                    className="text-red-500  hover:text-red-600"
                    onClick={() => handleDelete("Product 1")}
                  />
                </div>
              </div>

              {/* Expanded View */}
              {expandedQuery === query.id && (
                <div className="p-4 bg-gray-50 dark:bg-neutral-700">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Customer
                      </p>
                      <p className="text-gray-800 dark:text-gray-200">
                        {query.customer}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Email
                      </p>
                      <p className="text-gray-800 dark:text-gray-200">
                        {query.email}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Date
                      </p>
                      <p className="text-gray-800 dark:text-gray-200">
                        {query.date}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className=" text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Subject
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 ">
                      {query.subject}
                    </p>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Message
                    </p>
                    <div className="bg-white dark:bg-neutral-800 p-4 rounded border border-gray-300 dark:border-neutral-600 text-gray-800 dark:text-gray-200">
                      {query.message}
                    </div>
                  </div>

                  {/* Responses */}
                  {query.responses.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
                        Responses
                      </p>
                      <div className="space-y-4">
                        {query.responses.map((response, idx) => (
                          <div
                            key={idx}
                            className="bg-white dark:bg-neutral-800 p-4 rounded border border-gray-300 dark:border-neutral-600"
                          >
                            <div className="flex justify-between mb-2">
                              <span className="font-medium text-gray-800 dark:text-gray-200">
                                {/* @ts-ignore  */}
                                {response.from}
                              </span>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {/* @ts-ignore  */}
                                {response.date}
                              </span>
                            </div>
                            <p className="text-gray-800 dark:text-gray-200">
                              {/* @ts-ignore  */}
                              {response.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Response Form */}
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                      Add Response
                    </p>
                    <textarea
                      className="w-full p-3 border border-gray-300 dark:border-neutral-600 rounded  dark:bg-neutral-800 dark:text-gray-200 mb-3"
                      rows={4}
                      placeholder="Type your response here..."
                    ></textarea>
                    <div className="flex justify-end gap-2">
                      <button
                        className="px-4 py-2 border border-gray-300 dark:border-neutral-600 rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-600"
                        onClick={() => toggleQueryExpansion(query.id)}
                      >
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-500">
                        Send Response
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Delete Confirmation Popup */}
      {deletePopup && (
        <div className="fixed inset-0  backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-neutral-800 border border-neutral-700 p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex items-center mb-4 text-red-500">
              <AlertCircle className="mr-2" />
              <h2 className="text-xl font-bold">Confirm Delete</h2>
            </div>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Are you sure you want to delete action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QueriesTable;
