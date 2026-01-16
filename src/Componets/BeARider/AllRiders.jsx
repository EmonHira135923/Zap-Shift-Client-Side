import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  User2,
  AlertTriangle,
  Check,
  X,
} from "lucide-react";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";

const AllRiders = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // State for modal and loading
  const [modalData, setModalData] = useState({
    isOpen: false,
    action: "", // "approve", "reject", "delete"
    rider: null,
    loading: false,
  });

  const {
    data: riders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riders", "status"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data.result;
    },
  });

  // Open modal for action
  const openModal = (action, rider) => {
    setModalData({
      isOpen: true,
      action,
      rider,
      loading: false,
    });
  };

  // Close modal
  const closeModal = () => {
    setModalData({
      isOpen: false,
      action: "",
      rider: null,
      loading: false,
    });
  };

  // Handle action confirmation
  const handleConfirm = async () => {
    if (!modalData.rider || !modalData.action) return;

    setModalData((prev) => ({ ...prev, loading: true }));

    try {
      let endpoint = "";
      let updateData = {};
      let successMessage = "";

      switch (modalData.action) {
        case "approve":
          endpoint = `/update-rider/${modalData.rider._id}/role`;
          updateData = { status: "approved" };
          successMessage = "Rider approved successfully.";
          break;
        case "reject":
          endpoint = `/update-rider/${modalData.rider._id}/role`;
          updateData = { status: "rejected" };
          successMessage = "Rider rejected successfully.";
          break;
        case "delete":
          endpoint = `/delete-rider/${modalData.rider._id}`;
          successMessage = "Rider deleted successfully.";
          break;
        default:
          return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user?.accessToken}`,
        },
      };

      let res;
      if (modalData.action === "delete") {
        res = await axiosSecure.delete(endpoint, config);
      } else {
        res = await axiosSecure.patch(endpoint, updateData, config);
      }

      const resultKey =
        modalData.action === "delete" ? "deletedCount" : "modifiedCount";
      const successKey =
        modalData.action === "delete" ? "deletedCount" : "modifiedCount";

      if (res.data.result[successKey] > 0) {
        toast.success(successMessage);
        refetch();
        closeModal();
      }
    } catch (err) {
      toast.error(`Failed to ${modalData.action} rider. Please try again.`);
    } finally {
      setModalData((prev) => ({ ...prev, loading: false }));
    }
  };

  // Get modal configuration
  const getModalConfig = (action) => {
    switch (action) {
      case "approve":
        return {
          title: "Approve Rider",
          icon: CheckCircle,
          iconColor: "text-green-500",
          bgColor: "bg-green-900/20",
          buttonColor: "bg-green-600 hover:bg-green-700",
          description: "Are you sure you want to approve this rider?",
          confirmText: "Yes, Approve",
        };
      case "reject":
        return {
          title: "Reject Rider",
          icon: XCircle,
          iconColor: "text-red-500",
          bgColor: "bg-red-900/20",
          buttonColor: "bg-red-600 hover:bg-red-700",
          description: "Are you sure you want to reject this rider?",
          confirmText: "Yes, Reject",
        };
      case "delete":
        return {
          title: "Delete Rider",
          icon: AlertTriangle,
          iconColor: "text-yellow-500",
          bgColor: "bg-yellow-900/20",
          buttonColor: "bg-red-600 hover:bg-red-700",
          description:
            "This action cannot be undone. Are you sure you want to delete this rider?",
          confirmText: "Yes, Delete",
        };
      default:
        return {};
    }
  };

  // Get status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-900/30 text-green-400 border-green-700";
      case "rejected":
        return "bg-red-900/30 text-red-400 border-red-700";
      default:
        return "bg-yellow-900/30 text-yellow-400 border-yellow-700";
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lime-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading riders data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">All Riders</h1>
            <div className="flex items-center gap-4">
              <p className="text-gray-400">
                Total Riders:{" "}
                <span className="text-lime-400 font-bold">{riders.length}</span>
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <span className="text-gray-400">Pending</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-gray-400">Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-gray-400">Rejected</span>
                </div>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-4 px-6 text-left">
                      <div className="flex items-center gap-2 text-gray-300">
                        <User size={16} />
                        <span>Rider Info</span>
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left text-gray-300">
                      Contact
                    </th>
                    <th className="py-4 px-6 text-left text-gray-300">
                      Location
                    </th>
                    <th className="py-4 px-6 text-left text-gray-300">
                      Warehouse
                    </th>
                    <th className="py-4 px-6 text-left text-gray-300">
                      Status
                    </th>
                    <th className="py-4 px-6 text-left text-gray-300">
                      Joined
                    </th>
                    <th className="py-4 px-6 text-left text-gray-300">Role</th>
                    <th className="py-4 px-6 text-left text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider) => (
                    <tr
                      key={rider._id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    >
                      {/* Rider Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-lime-900/50 to-green-900/50 rounded-full flex items-center justify-center">
                            <User className="text-lime-400" size={20} />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">
                              {rider.name}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-gray-400">
                                Age:
                              </span>
                              <span className="text-sm text-white">
                                {rider.age}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-4 px-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Mail size={14} className="text-gray-500" />
                            <span className="text-sm text-gray-300 truncate max-w-[180px]">
                              {rider.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={14} className="text-gray-500" />
                            <span className="text-sm text-gray-300">
                              {rider.contact}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-4 px-6">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-gray-500" />
                            <span className="text-sm text-white">
                              {rider.division}
                            </span>
                          </div>
                          <div className="pl-6">
                            <span className="text-xs text-gray-400">
                              {rider.district}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Warehouse */}
                      <td className="py-4 px-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-900/50 border border-gray-700">
                          <span className="text-sm text-gray-300">
                            {rider.warehouse}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full border ${getStatusColor(rider.status)}`}
                        >
                          <span className="text-xs font-medium capitalize">
                            {rider.status}
                          </span>
                        </div>
                      </td>

                      {/* Joined Date */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar size={14} />
                          <span className="text-sm">
                            {formatDate(rider.createdAt)}
                          </span>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <User2 size={14} className="text-gray-500" />
                          <span className="text-sm text-white">
                            {rider.role || "rider"}
                          </span>
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {/* Approve Button */}
                          <button
                            onClick={() => openModal("approve", rider)}
                            disabled={rider.status === "approved"}
                            className={`p-2 rounded-lg border transition-colors group relative ${
                              rider.status === "approved"
                                ? "bg-green-900/20 text-green-400 border-green-800/30 cursor-not-allowed"
                                : "bg-green-900/30 text-green-400 hover:bg-green-900/50 border-green-800/50"
                            }`}
                          >
                            <CheckCircle size={18} />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {rider.status === "approved"
                                ? "Already Approved"
                                : "Approve"}
                            </span>
                          </button>

                          {/* Reject Button */}
                          <button
                            onClick={() => openModal("reject", rider)}
                            disabled={rider.status === "rejected"}
                            className={`p-2 rounded-lg border transition-colors group relative ${
                              rider.status === "rejected"
                                ? "bg-red-900/20 text-red-400 border-red-800/30 cursor-not-allowed"
                                : "bg-red-900/30 text-red-400 hover:bg-red-900/50 border-red-800/50"
                            }`}
                          >
                            <XCircle size={18} />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {rider.status === "rejected"
                                ? "Already Rejected"
                                : "Reject"}
                            </span>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => openModal("delete", rider)}
                            className="p-2 rounded-lg bg-gray-900/50 text-gray-400 hover:bg-red-900/30 hover:text-red-400 border border-gray-700 hover:border-red-800/50 transition-colors group relative"
                          >
                            <Trash2 size={18} />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Delete
                            </span>
                          </button>

                          {/* Details Button */}
                          <button className="p-2 rounded-lg bg-gray-900/50 text-gray-400 hover:bg-blue-900/30 hover:text-blue-400 border border-gray-700 hover:border-blue-800/50 transition-colors group relative">
                            <Eye size={18} />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Details
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {riders.length === 0 && (
              <div className="py-16 text-center">
                <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-900/50 flex items-center justify-center">
                  <User className="text-gray-600" size={40} />
                </div>
                <h3 className="text-xl text-gray-400 mb-2">No Riders Found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  No rider applications have been submitted yet. They will
                  appear here once submitted.
                </p>
              </div>
            )}

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-gray-700 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="text-white font-medium">{riders.length}</span>{" "}
                rider{riders.length !== 1 ? "s" : ""}
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 text-sm rounded-lg bg-gray-900/50 text-gray-400 hover:text-white border border-gray-700 transition-colors">
                  Previous
                </button>
                <button className="px-4 py-2 text-sm rounded-lg bg-gray-900/50 text-gray-400 hover:text-white border border-gray-700 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending Approval</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {riders.filter((r) => r.status === "pending").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-yellow-900/30 flex items-center justify-center">
                  <Calendar className="text-yellow-500" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Riders</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {riders.filter((r) => r.status === "approved").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="text-green-500" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Rejected</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {riders.filter((r) => r.status === "rejected").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-900/30 flex items-center justify-center">
                  <XCircle className="text-red-500" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Modal */}
      {modalData.isOpen && modalData.rider && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 max-w-md w-full p-6 shadow-2xl">
            {(() => {
              const config = getModalConfig(modalData.action);
              const Icon = config.icon || AlertTriangle;

              return (
                <>
                  {/* Modal Header */}
                  <div className="text-center mb-6">
                    <div
                      className={`w-16 h-16 ${config.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <Icon size={28} className={config.iconColor} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {config.title}
                    </h3>
                    <p className="text-gray-400">{config.description}</p>
                  </div>

                  {/* Rider Info Preview */}
                  <div className="bg-gray-900/50 rounded-xl p-4 mb-6 border border-gray-700">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-lime-900/50 to-green-900/50 rounded-full flex items-center justify-center">
                        <User className="text-lime-400" size={18} />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">
                          {modalData.rider.name}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {modalData.rider.email}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-500">Location:</span>
                        <p className="text-gray-300">
                          {modalData.rider.division}, {modalData.rider.district}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span>
                        <p
                          className={`inline-flex px-2 py-0.5 rounded-full text-xs ${getStatusColor(modalData.rider.status)}`}
                        >
                          {modalData.rider.status}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Modal Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={closeModal}
                      disabled={modalData.loading}
                      className="flex-1 py-3 px-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirm}
                      disabled={modalData.loading}
                      className={`flex-1 py-3 px-4 rounded-xl ${config.buttonColor} text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
                    >
                      {modalData.loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Processing...
                        </>
                      ) : (
                        config.confirmText
                      )}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
};

export default AllRiders;
