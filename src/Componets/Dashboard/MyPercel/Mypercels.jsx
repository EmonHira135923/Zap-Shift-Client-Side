import React, { useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCreditCard,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { MdLocalShipping, MdPendingActions } from "react-icons/md";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const deleteIdRef = useRef(null);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("list"); // Default to list view
  const [sortConfig, setSortConfig] = useState({
    key: "deliveryDate",
    direction: "ascending",
  });

  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["Mypercel", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/mypercel?email=${user.email}`);
      return res.data.result;
    },
  });

  const handleDelete = async () => {
    const id = deleteIdRef.current;
    if (!id) return;

    try {
      const res = await axiosSecure.delete(`delete-percel/${id}`);
      if (res.data.result.deletedCount) {
        refetch();
        toast.success("Your parcel has been successfully deleted");
      } else {
        toast.error("Failed to delete parcel");
      }
    } catch (error) {
      toast.error("Error deleting parcel");
    } finally {
      modalRef.current.close();
      deleteIdRef.current = null;
    }
  };

  // Filter parcels based on search and status
  const filteredParcels = parcels.filter((parcel) => {
    const matchesSearch =
      parcel.parcelName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.receiverName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.trackingId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcel.deliveryAddress?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      parcel.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Sort parcels
  const sortedParcels = [...filteredParcels].sort((a, b) => {
    if (sortConfig.key === "deliveryDate") {
      return sortConfig.direction === "ascending"
        ? new Date(a.deliveryDate || 0) - new Date(b.deliveryDate || 0)
        : new Date(b.deliveryDate || 0) - new Date(a.deliveryDate || 0);
    }
    if (sortConfig.key === "totalPrice") {
      return sortConfig.direction === "ascending"
        ? (a.totalPrice || 0) - (b.totalPrice || 0)
        : (b.totalPrice || 0) - (a.totalPrice || 0);
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort className="ml-2 opacity-50" />;
    if (sortConfig.direction === "ascending")
      return <FaSortUp className="ml-2" />;
    return <FaSortDown className="ml-2" />;
  };

  // Get status configuration
  const getStatusConfig = (status) => {
    const statusLower = status?.toLowerCase();
    const configs = {
      pending: {
        color: "text-yellow-400",
        bgColor: "bg-yellow-900/20",
        borderColor: "border-yellow-700/30",
        icon: <MdPendingActions className="w-4 h-4" />,
        gradient: "from-yellow-600/20 to-yellow-900/10",
        dotColor: "bg-yellow-500",
      },
      "in transit": {
        color: "text-blue-400",
        bgColor: "bg-blue-900/20",
        borderColor: "border-blue-700/30",
        icon: <MdLocalShipping className="w-4 h-4" />,
        gradient: "from-blue-600/20 to-blue-900/10",
        dotColor: "bg-blue-500",
      },
      delivered: {
        color: "text-green-400",
        bgColor: "bg-green-900/20",
        borderColor: "border-green-700/30",
        icon: <FaCheckCircle className="w-4 h-4" />,
        gradient: "from-green-600/20 to-green-900/10",
        dotColor: "bg-green-500",
      },
      cancelled: {
        color: "text-red-400",
        bgColor: "bg-red-900/20",
        borderColor: "border-red-700/30",
        icon: <FaTimesCircle className="w-4 h-4" />,
        gradient: "from-red-600/20 to-red-900/10",
        dotColor: "bg-red-500",
      },
    };
    return (
      configs[statusLower] || {
        color: "text-gray-400",
        bgColor: "bg-gray-900/20",
        borderColor: "border-gray-700/30",
        icon: <FaBoxOpen className="w-4 h-4" />,
        gradient: "from-gray-600/20 to-gray-900/10",
        dotColor: "bg-gray-500",
      }
    );
  };

  // Get payment status config
  const getPaymentConfig = (status) => {
    return status === "paid"
      ? {
          color: "text-green-400",
          bgColor: "bg-green-900/20",
          text: "Paid",
          icon: <FaCheckCircle className="w-3 h-3" />,
        }
      : {
          color: "text-red-400",
          bgColor: "bg-red-900/20",
          text: "Unpaid",
          icon: <FaCreditCard className="w-3 h-3" />,
        };
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6">
        <div className="animate-pulse space-y-6">
          {/* Header skeleton */}
          <div className="flex justify-between items-center">
            <div className="h-10 bg-gray-800 rounded-lg w-64"></div>
            <div className="h-10 bg-gray-800 rounded-lg w-32"></div>
          </div>

          {/* Filters skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-800 rounded-lg"></div>
            ))}
          </div>

          {/* Table skeleton */}
          <div className="bg-gray-800/30 rounded-xl overflow-hidden">
            <div className="h-16 bg-gray-800"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-20 border-t border-gray-700/50 bg-gray-800/50"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const stats = {
    total: parcels.length,
    pending: parcels.filter((p) => p.status?.toLowerCase() === "pending")
      .length,
    inTransit: parcels.filter((p) => p.status?.toLowerCase() === "in transit")
      .length,
    delivered: parcels.filter((p) => p.status?.toLowerCase() === "delivered")
      .length,
    unpaid: parcels.filter((p) => p.paymentStatus !== "paid").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              My Parcels
            </h1>
            <p className="text-gray-400 mt-2">
              Track and manage all your shipments
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex bg-gray-800/50 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 rounded-md transition-all ${viewMode === "grid" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}`}
                title="Grid View"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 rounded-md transition-all ${viewMode === "list" ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white"}`}
                title="List View"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 whitespace-nowrap">
              <FaShippingFast />
              <span className="hidden sm:inline">New Parcel</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>

        {/* Statistics Cards - Mobile Scrollable */}
        <div className="mb-8">
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-4 min-w-max">
              {[
                {
                  label: "Total",
                  value: stats.total,
                  color: "from-blue-500 to-blue-600",
                  icon: <FaBoxOpen />,
                },
                {
                  label: "Pending",
                  value: stats.pending,
                  color: "from-yellow-500 to-yellow-600",
                  icon: <MdPendingActions />,
                },
                {
                  label: "In Transit",
                  value: stats.inTransit,
                  color: "from-purple-500 to-purple-600",
                  icon: <MdLocalShipping />,
                },
                {
                  label: "Delivered",
                  value: stats.delivered,
                  color: "from-green-500 to-green-600",
                  icon: <FaCheckCircle />,
                },
                {
                  label: "Unpaid",
                  value: stats.unpaid,
                  color: "from-red-500 to-red-600",
                  icon: <FaCreditCard />,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 text-white shadow-lg min-w-[140px]`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-90">{stat.label}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className="text-xl opacity-80">{stat.icon}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gray-700/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search parcels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent appearance-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in transit">In Transit</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Parcels Grid/List View */}
      <AnimatePresence mode="wait">
        {viewMode === "grid" ? (
          /* Grid View */
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sortedParcels.map((parcel, index) => {
              const statusConfig = getStatusConfig(parcel.status);
              const paymentConfig = getPaymentConfig(parcel.paymentStatus);

              return (
                <motion.div
                  key={parcel._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  className={`bg-gradient-to-br ${statusConfig.gradient} bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border ${statusConfig.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                >
                  {/* Card content remains the same as before */}
                  {/* ... (same card content as previous version) ... */}
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* List View - Enhanced Table */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden shadow-2xl"
          >
            {/* Table Header with Results Count */}
            <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
              <div className="text-gray-300">
                Showing{" "}
                <span className="font-semibold text-white">
                  {sortedParcels.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-white">
                  {parcels.length}
                </span>{" "}
                parcels
              </div>
              <div className="text-sm text-gray-400">
                Sorted by:{" "}
                <span className="text-white font-medium">
                  {sortConfig.key === "deliveryDate"
                    ? "Delivery Date"
                    : "Amount"}
                </span>
              </div>
            </div>

            {/* Scrollable Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead className="bg-gradient-to-r from-gray-800 to-gray-900">
                  <tr>
                    {/* Parcel Column */}
                    <th className="p-4 text-left text-gray-300 font-semibold">
                      <button
                        onClick={() => requestSort("deliveryDate")}
                        className="flex items-center hover:text-white transition-colors"
                      >
                        Parcel Details
                        {getSortIcon("deliveryDate")}
                      </button>
                    </th>

                    {/* Status Column */}
                    <th className="p-4 text-left text-gray-300 font-semibold">
                      Status
                    </th>

                    {/* Destination Column */}
                    <th className="p-4 text-left text-gray-300 font-semibold">
                      Destination
                    </th>

                    {/* Amount Column */}
                    <th className="p-4 text-left text-gray-300 font-semibold">
                      <button
                        onClick={() => requestSort("totalPrice")}
                        className="flex items-center hover:text-white transition-colors"
                      >
                        Amount
                        {getSortIcon("totalPrice")}
                      </button>
                    </th>

                    {/* Payment Column */}
                    <th className="p-4 text-left text-gray-300 font-semibold">
                      Payment
                    </th>

                    {/* Actions Column */}
                    <th className="p-4 text-left text-gray-300 font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  {sortedParcels.map((parcel) => {
                    const statusConfig = getStatusConfig(parcel.status);
                    const paymentConfig = getPaymentConfig(
                      parcel.paymentStatus,
                    );

                    return (
                      <motion.tr
                        key={parcel._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-gray-800/20 transition-colors group"
                      >
                        {/* Parcel Details Cell */}
                        <td className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-start gap-3">
                              <div className="mt-1">
                                <div
                                  className={`w-3 h-3 rounded-full ${statusConfig.dotColor}`}
                                ></div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
                                  {parcel.parcelName}
                                </p>
                                <div className="flex items-center gap-3 text-sm text-gray-400 mt-1">
                                  <div className="flex items-center gap-1">
                                    <FaCalendarAlt className="w-3 h-3" />
                                    <span className="whitespace-nowrap">
                                      {parcel.deliveryDate || "No date"}
                                    </span>
                                  </div>
                                  {parcel.trackingId && (
                                    <div className="flex items-center gap-1">
                                      <span className="text-gray-500">•</span>
                                      <span className="font-mono text-xs bg-gray-800/50 px-2 py-0.5 rounded">
                                        {parcel.trackingId.slice(0, 8)}...
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Status Cell */}
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig.color} ${statusConfig.bgColor} border ${statusConfig.borderColor}`}
                            >
                              {statusConfig.icon}
                              <span className="capitalize">
                                {parcel.status || "Pending"}
                              </span>
                            </span>
                          </div>
                        </td>

                        {/* Destination Cell */}
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-start gap-2">
                              <FaMapMarkerAlt className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="font-medium text-white truncate">
                                  {parcel.receiverName}
                                </p>
                                <p className="text-sm text-gray-400 truncate">
                                  {parcel.deliveryAddress || "No address"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Amount Cell */}
                        <td className="p-4">
                          <div className="space-y-1">
                            <p className="text-xl font-bold text-white">
                              ৳{parcel.totalPrice?.toLocaleString() || "0"}
                            </p>
                            <p className="text-xs text-gray-400">
                              {parcel.weight
                                ? `${parcel.weight}kg`
                                : "Weight N/A"}
                            </p>
                          </div>
                        </td>

                        {/* Payment Cell */}
                        <td className="p-4">
                          <div className="space-y-2">
                            <span
                              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${paymentConfig.color} ${paymentConfig.bgColor}`}
                            >
                              {paymentConfig.icon}
                              {paymentConfig.text}
                            </span>
                            {parcel.paymentStatus !== "paid" &&
                              parcel.deliveryDate && (
                                <p className="text-xs text-yellow-400">
                                  Due: {parcel.deliveryDate}
                                </p>
                              )}
                          </div>
                        </td>

                        {/* Actions Cell */}
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {/* View Button */}
                            <button
                              className="p-2 rounded-lg bg-gray-700/50 hover:bg-blue-600/30 text-gray-300 hover:text-blue-300 transition-all duration-200 group/view"
                              title="View Details"
                              onClick={() =>
                                navigate(`/dashboard/parcel/${parcel._id}`)
                              }
                            >
                              <FaEye className="w-4 h-4" />
                            </button>

                            {/* Edit Button */}
                            <button
                              className="p-2 rounded-lg bg-gray-700/50 hover:bg-yellow-600/30 text-gray-300 hover:text-yellow-300 transition-all duration-200 group/edit"
                              title="Edit Parcel"
                              onClick={() =>
                                navigate(`/dashboard/edit-parcel/${parcel._id}`)
                              }
                            >
                              <FaEdit className="w-4 h-4" />
                            </button>

                            {/* Delete Button */}
                            <button
                              onClick={() => {
                                deleteIdRef.current = parcel._id;
                                modalRef.current.showModal();
                              }}
                              className="p-2 rounded-lg bg-gray-700/50 hover:bg-red-600/30 text-gray-300 hover:text-red-300 transition-all duration-200 group/delete"
                              title="Delete Parcel"
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>

                            {/* Pay Button */}
                            {parcel.paymentStatus !== "paid" && (
                              <button
                                onClick={() =>
                                  navigate(`/dashboard/payments/${parcel._id}`)
                                }
                                className="px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 flex items-center gap-1.5 text-sm whitespace-nowrap"
                                title="Make Payment"
                              >
                                <FaCreditCard className="w-3 h-3" />
                                <span>Pay</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            {sortedParcels.length > 0 && (
              <div className="p-4 border-t border-gray-700/50 text-center text-gray-400 text-sm">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span>Status Legend:</span>
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span>Pending</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>In Transit</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Delivered</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span>Scroll horizontally → to see all columns</span>
                    <div className="hidden md:flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-gray-600 animate-pulse"></div>
                      <span>Live Updates</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {sortedParcels.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <FaBoxOpen className="w-16 h-16 text-gray-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-300 mb-3">
            {searchTerm || statusFilter !== "all"
              ? "No matching parcels"
              : "No parcels yet"}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            {searchTerm || statusFilter !== "all"
              ? "Try adjusting your search or filter to find what you're looking for."
              : "Start shipping by creating your first parcel. It's quick and easy!"}
          </p>
          <button
            onClick={() => navigate("/dashboard/create-parcel")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl"
          >
            Create First Parcel
          </button>
        </motion.div>
      )}

      {/* Delete Confirmation Modal */}
      <dialog
        ref={modalRef}
        className="modal backdrop-blur-sm"
        style={{
          backgroundColor: "transparent",
          border: "none",
          padding: 0,
        }}
      >
        <div className="modal-box bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 shadow-2xl max-w-md">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-900/30 to-pink-900/20 flex items-center justify-center">
              <FaTrash className="w-10 h-10 text-red-400" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              Delete Parcel?
            </h3>
            <p className="text-gray-400 mb-6">
              This action cannot be undone. All tracking information will be
              permanently removed.
            </p>

            <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
              <p className="text-lg font-semibold text-white mb-1">
                {parcels.find((p) => p._id === deleteIdRef.current)
                  ?.parcelName || "Untitled Parcel"}
              </p>
              <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="w-3 h-3" />
                  <span>
                    {
                      parcels.find((p) => p._id === deleteIdRef.current)
                        ?.receiverName
                    }
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <FaCreditCard className="w-3 h-3" />
                  <span>
                    ৳
                    {
                      parcels.find((p) => p._id === deleteIdRef.current)
                        ?.totalPrice
                    }
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => modalRef.current.close()}
                className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-lg transition-all font-medium"
              >
                Delete Parcel
              </button>
            </div>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button onClick={() => modalRef.current.close()}>close</button>
        </form>
      </dialog>

      {/* Custom scrollbar styling */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MyParcels;
