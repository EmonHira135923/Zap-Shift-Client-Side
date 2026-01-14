import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import {
  FaHistory,
  FaReceipt,
  FaCalendarAlt,
  FaDollarSign,
  FaIdCard,
  FaBox,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router";

const PaymentsHistory = () => {
  const axiosSecure = useAxiosSecure();
  const { user, Signout, signin } = useAuth();
  const navigate = useNavigate();

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["PaymentHistory", user?.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/allpayments?email=${user?.email}`, {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        });
        return res.data.result;
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          await Signout();
          navigate("/login");
        }
        throw err;
      }
    },
    enabled: !!user?.email,
  });

  // Format currency
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
      case "succeeded":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-900/30 text-green-400 border border-green-700/50 flex items-center gap-1 w-fit">
            <FaCheckCircle className="text-xs" /> Completed
          </span>
        );
      case "failed":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-900/30 text-red-400 border border-red-700/50 flex items-center gap-1 w-fit">
            <FaTimesCircle className="text-xs" /> Failed
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-800 text-gray-400 border border-gray-700">
            {status || "Pending"}
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-800 rounded mb-6"></div>
            <div className="h-12 bg-gray-800 rounded-lg mb-4"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-800 rounded-lg mb-3"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-8 text-center">
            <FaTimesCircle className="text-5xl text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Error Loading Payments
            </h2>
            <p className="text-gray-400">
              Failed to load payment history. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl">
              <FaHistory className="text-3xl text-purple-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Payment History</h1>
              <p className="text-gray-400">
                Track all your transactions in one place
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Payments</p>
                  <p className="text-2xl font-bold text-white">
                    {payments.length}
                  </p>
                </div>
                <FaReceipt className="text-2xl text-purple-500" />
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Amount</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    {formatCurrency(
                      payments.reduce(
                        (sum, payment) => sum + (payment.totalCost || 0),
                        0
                      ),
                      payments[0]?.currency
                    )}
                  </p>
                </div>
                <FaDollarSign className="text-2xl text-emerald-500" />
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Last Payment</p>
                  <p className="text-lg font-semibold text-white">
                    {payments.length > 0
                      ? new Date(payments[0].paidAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
                <FaCalendarAlt className="text-2xl text-blue-500" />
              </div>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Average Payment</p>
                  <p className="text-2xl font-bold text-amber-400">
                    {payments.length > 0
                      ? formatCurrency(
                          payments.reduce((sum, p) => sum + p.totalCost, 0) /
                            payments.length,
                          payments[0]?.currency
                        )
                      : "$0.00"}
                  </p>
                </div>
                <FaBox className="text-2xl text-amber-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  All Transactions
                </h2>
                <p className="text-gray-400 text-sm">
                  Sorted by latest payment
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <FaClock className="text-amber-500" />
                <span>Updated in real-time</span>
              </div>
            </div>
          </div>

          {/* Table Content */}
          {payments.length === 0 ? (
            <div className="text-center py-16">
              <div className="mx-auto w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mb-4">
                <FaReceipt className="text-4xl text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">
                No Payment History
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                You haven't made any payments yet. Your transactions will appear
                here once you make your first payment.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/60 border-b border-gray-800">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <FaBox /> Parcel Details
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <FaDollarSign /> Amount
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt /> Date & Time
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      <div className="flex items-center gap-2">
                        <FaIdCard /> Transaction ID
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {payments.map((pay) => (
                    <tr
                      key={pay._id}
                      className="hover:bg-gray-800/30 transition-all duration-200 group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-lg flex items-center justify-center mr-3">
                            <FaBox className="text-lg text-purple-400" />
                          </div>
                          <div>
                            <div className="text-white font-medium group-hover:text-purple-300 transition-colors">
                              {pay.parcelName || "Unnamed Parcel"}
                            </div>
                            <div className="text-xs text-gray-500">
                              ID: {pay.parcelId?.slice(0, 8) || "N/A"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-lg font-bold text-emerald-400">
                          {formatCurrency(pay.totalCost, pay.currency)}
                        </div>
                        <div className="text-xs text-gray-500 uppercase">
                          {pay.currency}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(pay.status)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white">
                          {new Date(pay.paidAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(pay.paidAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-mono text-sm bg-gray-900/50 px-3 py-2 rounded border border-gray-800 text-gray-300 group-hover:text-white transition-colors">
                          {pay.transaction_id || "N/A"}
                        </div>
                        <button
                          className="mt-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                          onClick={() => {
                            navigator.clipboard.writeText(pay.transaction_id);
                            // Add toast notification here
                          }}
                        >
                          Copy ID
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer */}
          {payments.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-800 bg-gradient-to-r from-gray-900 to-gray-800/50">
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div>
                  Showing{" "}
                  <span className="font-semibold text-white">
                    {payments.length}
                  </span>{" "}
                  transactions
                </div>
                <div className="flex items-center gap-4">
                  <button className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                    Export CSV
                  </button>
                  <button className="px-4 py-2 text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 rounded-lg transition-all">
                    Download Receipts
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        {payments.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Failed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-500"></div>
              <span>Pending</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentsHistory;
