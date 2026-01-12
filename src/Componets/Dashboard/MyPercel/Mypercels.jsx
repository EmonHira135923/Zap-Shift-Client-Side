import React, { useRef } from "react";
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
} from "react-icons/fa";
import { toast } from "react-toastify";
import { MdLocalShipping, MdPendingActions } from "react-icons/md";
import { useNavigate } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const deleteIdRef = useRef(null);
  const navigate = useNavigate();

  const {
    data: percel = [],
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

  // Function to get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "text-yellow-400";
      case "in transit":
        return "text-blue-400";
      case "delivered":
        return "text-green-400";
      case "cancelled":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  // Function to get status icon
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <MdPendingActions className="inline mr-2" />;
      case "in transit":
        return <MdLocalShipping className="inline mr-2" />;
      case "delivered":
        return <FaCalendarAlt className="inline mr-2" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-800 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 p-4 md:p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          My Parcels
        </h1>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 gap-4">
          <p className="text-gray-300">
            Total Parcels:{" "}
            <span className="font-semibold text-white">{percel.length}</span>
          </p>
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-300">Delivered</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <span className="text-gray-300">Pending</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-gray-300">Cancelled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Parcels Table */}
      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700/50 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Head */}
            <thead className="bg-gradient-to-r from-gray-800 to-gray-900">
              <tr>
                <th className="p-4 text-left text-gray-300 font-semibold">
                  Parcel Details
                </th>
                <th className="p-4 text-left text-gray-300 font-semibold">
                  Destination
                </th>
                <th className="p-4 text-left text-gray-300 font-semibold">
                  Status
                </th>
                <th className="p-4 text-left text-gray-300 font-semibold">
                  Payment
                </th>
                <th className="p-4 text-left text-gray-300 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-700/50">
              {percel.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-800/30 transition-all duration-300"
                >
                  {/* Parcel Details */}
                  <td className="p-4">
                    <div className="space-y-2">
                      <p className="font-semibold text-white">
                        {item.parcelName}
                      </p>
                      <div className="flex items-center text-sm text-gray-400">
                        <FaCalendarAlt className="mr-2" />
                        <span>Delivery: {item.deliveryDate || "Not set"}</span>
                      </div>
                    </div>
                  </td>

                  {/* Destination */}
                  <td className="p-4">
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-red-400 mt-1 mr-3" />
                      <div>
                        <p className="text-white font-medium">
                          {item.receiverName}
                        </p>
                        <p className="text-sm text-gray-400 mt-1">
                          {item.deliveryAddress || "Address not provided"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)} bg-gray-900/50`}
                    >
                      {getStatusIcon(item.status)}
                      {item.status || "Pending"}
                    </span>
                  </td>

                  {/* Payment Status */}
                  <td className="p-4">
                    <div className="flex items-center">
                      <span className="font-bold text-lg text-white mr-2">
                        ৳{item.totalPrice}
                      </span>
                      {item.paymentStatus === "paid" ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900/30 text-green-400">
                          <FaCreditCard className="mr-2" />
                          Paid
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-900/30 text-red-400">
                          <FaCreditCard className="mr-2" />
                          Unpaid
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Action Buttons */}
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      {/* Details */}
                      <button
                        className="p-2 rounded-lg bg-blue-900/20 text-blue-400 hover:bg-blue-900/40 hover:text-blue-300 transition-colors duration-300"
                        title="View Details"
                      >
                        <FaEye className="w-5 h-5" />
                      </button>

                      {/* Update */}
                      <button
                        className="p-2 rounded-lg bg-yellow-900/20 text-yellow-400 hover:bg-yellow-900/40 hover:text-yellow-300 transition-colors duration-300"
                        title="Edit Parcel"
                      >
                        <FaEdit className="w-5 h-5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => {
                          deleteIdRef.current = item._id;
                          modalRef.current.showModal();
                        }}
                        className="p-2 rounded-lg bg-red-900/20 text-red-400 hover:bg-red-900/40 hover:text-red-300 transition-colors duration-300"
                        title="Delete Parcel"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>

                      {/* Pay Button */}
                      {item.paymentStatus !== "paid" && (
                        <button
                          onClick={() =>
                            navigate(`/dashboard/payments/${item._id}`)
                          }
                          className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center"
                          title="Make Payment"
                        >
                          <FaCreditCard className="mr-2" />
                          Pay Now
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {percel.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800/50 flex items-center justify-center">
              <MdLocalShipping className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No Parcels Found
            </h3>
            <p className="text-gray-500">
              You haven't created any parcels yet.
            </p>
            <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
              Create Your First Parcel
            </button>
          </div>
        )}
      </div>

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
        <div className="modal-box bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 shadow-2xl">
          {/* Modal Header */}
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/20 flex items-center justify-center">
              <FaTrash className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-white text-center mb-2">
              Confirm Deletion
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          {/* Modal Content */}
          <div className="space-y-6">
            {/* Warning Message */}
            <div className="p-4 bg-red-900/10 border border-red-700/30 rounded-lg">
              <p className="text-red-400 text-center font-medium">
                ⚠️ This action cannot be undone
              </p>
            </div>

            {/* Parcel Details */}
            <div className="space-y-4">
              <p className="text-gray-300 text-center">
                Are you sure you want to delete the parcel
              </p>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700/50">
                <p className="text-xl font-bold text-white text-center">
                  "
                  {percel.find((p) => p._id === deleteIdRef.current)
                    ?.parcelName || "This parcel"}
                  "
                </p>
                <div className="flex justify-center items-center mt-3 text-sm text-gray-400">
                  <FaCalendarAlt className="mr-2" />
                  <span>
                    Delivery to:{" "}
                    {
                      percel.find((p) => p._id === deleteIdRef.current)
                        ?.receiverName
                    }
                  </span>
                </div>
              </div>
              <p className="text-gray-400 text-center text-sm">
                All tracking information and history will be permanently
                removed.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="modal-action flex gap-4 justify-center">
              <button
                onClick={() => modalRef.current.close()}
                className="px-8 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all duration-300 font-medium border border-gray-600 hover:border-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white transition-all duration-300 font-medium shadow-lg hover:shadow-red-500/20"
              >
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>

        {/* Modal Backdrop Close */}
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => modalRef.current.close()}>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default MyParcels;
