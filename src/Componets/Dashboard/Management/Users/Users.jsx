import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaEye, FaUserShield, FaUserSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  Pencil,
  Trash2,
  Mail,
  Calendar,
  User,
  Shield,
  Search,
  Filter,
  X,
  Check,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
} from "lucide-react";

const Users = () => {
  const { user: currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Modal states
  const [makeAdminModal, setMakeAdminModal] = useState({
    isOpen: false,
    user: null,
    loading: false,
  });

  const [makeUserModal, setMakeUserModal] = useState({
    isOpen: false,
    user: null,
    loading: false,
  });

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    user: null,
    loading: false,
  });

  const [detailsModal, setDetailsModal] = useState({
    isOpen: false,
    user: null,
  });

  const [searchText, setSearchText] = useState(""); // input text
  const [searchTerm, setSearchTerm] = useState(""); // debounced text
  const [roleFilter, setRoleFilter] = useState("all");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchText);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchText]);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", searchTerm, roleFilter],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?searchTerm=${searchTerm}&roleFilter=${roleFilter}`,
        { headers: { Authorization: `Bearer ${currentUser?.accessToken}` } }
      );
      return res.data.result;
    },
    refetchOnWindowFocus: false,
  });

  // Handle Make Admin
  const handleMakeAdmin = async () => {
    if (!makeAdminModal.user) return;

    setMakeAdminModal((prev) => ({ ...prev, loading: true }));

    try {
      const updateUser = { role: "admin" };
      const res = await axiosSecure.patch(
        `/update-user/${makeAdminModal.user._id}/role`,
        updateUser,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
        }
      );

      if (res.data.result.modifiedCount > 0) {
        toast.success(`${makeAdminModal.user.displayName} is now an Admin`);
        refetch();
        setMakeAdminModal({ isOpen: false, user: null, loading: false });
      }
    } catch (err) {
      toast.error("Failed to make user admin");
      setMakeAdminModal((prev) => ({ ...prev, loading: false }));
    }
  };

  // Handle Make User
  const handleMakeUser = async () => {
    if (!makeUserModal.user) return;

    setMakeUserModal((prev) => ({ ...prev, loading: true }));

    try {
      const updateUser = { role: "user" };
      const res = await axiosSecure.patch(
        `/update-user/${makeUserModal.user._id}/role`,
        updateUser,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
        }
      );

      if (res.data.result.modifiedCount > 0) {
        toast.success(`${makeUserModal.user.displayName} is now a User`);
        refetch();
        setMakeUserModal({ isOpen: false, user: null, loading: false });
      }
    } catch (err) {
      toast.error("Failed to make admin user");
      setMakeUserModal((prev) => ({ ...prev, loading: false }));
    }
  };

  // Handle Delete User
  const handleDeleteUser = async () => {
    if (!deleteModal.user) return;

    setDeleteModal((prev) => ({ ...prev, loading: true }));

    try {
      const res = await axiosSecure.delete(
        `/delete-user/${deleteModal.user._id}`,
        {
          headers: {
            Authorization: `Bearer ${currentUser?.accessToken}`,
          },
        }
      );

      if (res.data.result.deletedCount > 0) {
        toast.success(`${deleteModal.user.displayName} deleted successfully`);
        refetch();
        setDeleteModal({ isOpen: false, user: null, loading: false });
      }
    } catch (err) {
      toast.error("Failed to delete user");
      setDeleteModal((prev) => ({ ...prev, loading: false }));
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-lime-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading users data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">All Users</h1>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <p className="text-gray-400">
                Total Users:{" "}
                <span className="text-lime-400 font-bold">{users.length}</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent w-full sm:w-64"
                  />
                </div>

                {/* Filter */}
                <div className="relative">
                  <Filter
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    size={20}
                  />
                  <select
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent appearance-none w-full sm:w-48"
                  >
                    <option value="all">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-4 px-6 text-left">
                      <div className="flex items-center gap-2 text-gray-300">
                        <User size={16} />
                        <span>User</span>
                      </div>
                    </th>
                    <th className="py-4 px-6 text-left text-gray-300">Email</th>
                    <th className="py-4 px-6 text-left text-gray-300">Role</th>
                    <th className="py-4 px-6 text-left text-gray-300">
                      Joined Date
                    </th>
                    <th className="py-4 px-6 text-left text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* FIXED: Changed filteredUsers to users */}
                  {users.map((user) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                    >
                      {/* User Info */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={user.photoURL}
                              alt={user.displayName}
                              className="w-12 h-12 rounded-full border-2 border-gray-700"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = `https://ui-avatars.com/api/?name=${user.displayName}&background=10b981&color=fff`;
                              }}
                            />
                            <div
                              className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-gray-800 ${
                                user.role === "admin"
                                  ? "bg-green-500"
                                  : "bg-blue-500"
                              }`}
                            ></div>
                          </div>
                          <div>
                            <h3 className="font-medium text-white">
                              {user.displayName}
                            </h3>
                            <p className="text-sm text-gray-400">
                              ID: {user._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Mail size={14} className="text-gray-500" />
                          <span className="text-gray-300">{user.email}</span>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="py-4 px-6">
                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${
                            user.role === "admin"
                              ? "bg-green-900/30 text-green-400 border border-green-700"
                              : "bg-blue-900/30 text-blue-400 border border-blue-700"
                          }`}
                        >
                          <Shield size={12} />
                          <span className="text-sm font-medium capitalize">
                            {user.role}
                          </span>
                        </div>
                      </td>

                      {/* Joined Date */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar size={14} />
                          <span className="text-sm">
                            {formatDate(user.createdAt)}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {/* Make Admin Button */}
                          {user.role !== "admin" && (
                            <button
                              onClick={() =>
                                setMakeAdminModal({
                                  isOpen: true,
                                  user,
                                  loading: false,
                                })
                              }
                              className="p-2 rounded-lg bg-gradient-to-r from-green-900/30 to-emerald-900/30 text-green-400 hover:from-green-900/50 hover:to-emerald-900/50 border border-green-800/50 transition-colors group relative"
                              title="Make Admin"
                            >
                              <FaUserShield size={16} />
                              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Make Admin
                              </span>
                            </button>
                          )}

                          {/* Make User Button */}
                          {user.role === "admin" && (
                            <button
                              onClick={() =>
                                setMakeUserModal({
                                  isOpen: true,
                                  user,
                                  loading: false,
                                })
                              }
                              className="p-2 rounded-lg bg-gradient-to-r from-blue-900/30 to-cyan-900/30 text-blue-400 hover:from-blue-900/50 hover:to-cyan-900/50 border border-blue-800/50 transition-colors group relative"
                              title="Make User"
                            >
                              <FaUserSlash size={16} />
                              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Make User
                              </span>
                            </button>
                          )}

                          {/* Details Button */}
                          <button
                            onClick={() =>
                              setDetailsModal({ isOpen: true, user })
                            }
                            className="p-2 rounded-lg bg-gradient-to-r from-gray-900/50 to-slate-900/50 text-gray-400 hover:from-gray-800 hover:to-slate-800 border border-gray-700 transition-colors group relative"
                            title="Details"
                          >
                            <FaEye size={16} />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Details
                            </span>
                          </button>

                          {/* Update Button */}
                          <button
                            onClick={() =>
                              toast.info("Update feature coming soon")
                            }
                            className="p-2 rounded-lg bg-gradient-to-r from-yellow-900/30 to-amber-900/30 text-yellow-400 hover:from-yellow-900/50 hover:to-amber-900/50 border border-yellow-800/50 transition-colors group relative"
                            title="Update"
                          >
                            <Pencil size={16} />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Update
                            </span>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() =>
                              setDeleteModal({
                                isOpen: true,
                                user,
                                loading: false,
                              })
                            }
                            className="p-2 rounded-lg bg-gradient-to-r from-red-900/30 to-rose-900/30 text-red-400 hover:from-red-900/50 hover:to-rose-900/50 border border-red-800/50 transition-colors group relative"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              Delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Empty State */}
              {/* FIXED: Changed filteredUsers to users */}
              {users.length === 0 && (
                <div className="py-16 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-900/50 flex items-center justify-center">
                    <User className="text-gray-600" size={40} />
                  </div>
                  <h3 className="text-xl text-gray-400 mb-2">No Users Found</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    {searchText || roleFilter !== "all"
                      ? "Try adjusting your search or filter criteria"
                      : "No users have been registered yet."}
                  </p>
                </div>
              )}
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="text-white font-medium">{users.length}</span>{" "}
                users
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-4 py-2 text-sm rounded-lg bg-gray-900/50 text-gray-400 hover:text-white border border-gray-700 transition-colors disabled:opacity-50"
                  disabled
                >
                  Previous
                </button>
                <button
                  className="px-4 py-2 text-sm rounded-lg bg-gray-900/50 text-gray-400 hover:text-white border border-gray-700 transition-colors disabled:opacity-50"
                  disabled
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Users</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {users.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center">
                  <User className="text-blue-500" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Admins</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {users.filter((u) => u.role === "admin").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-900/30 flex items-center justify-center">
                  <ShieldCheck className="text-green-500" size={20} />
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Regular Users</p>
                  <p className="text-3xl font-bold text-white mt-2">
                    {users.filter((u) => u.role === "user").length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-900/30 flex items-center justify-center">
                  <User className="text-purple-500" size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 1: Make Admin */}
      {makeAdminModal.isOpen && makeAdminModal.user && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-green-700/50 max-w-md w-full p-6 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="text-green-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Grant Admin Privileges
              </h3>
              <p className="text-gray-400">
                You are about to grant admin privileges to this user.
              </p>
            </div>

            {/* User Info */}
            <div className="bg-gray-900/50 rounded-xl p-4 mb-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={makeAdminModal.user.photoURL}
                  alt={makeAdminModal.user.displayName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-white">
                    {makeAdminModal.user.displayName}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {makeAdminModal.user.email}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Role:</span>
                  <span className="text-blue-400 capitalize">
                    {makeAdminModal.user.role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">New Role:</span>
                  <span className="text-green-400 font-medium">Admin</span>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-yellow-900/20 border border-yellow-800/50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-yellow-500 mt-0.5" size={16} />
                <div>
                  <p className="text-yellow-300 text-sm font-medium">
                    Admin Privileges
                  </p>
                  <p className="text-yellow-400/80 text-sm mt-1">
                    Admins can manage users, view sensitive data, and perform
                    administrative actions.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() =>
                  setMakeAdminModal({
                    isOpen: false,
                    user: null,
                    loading: false,
                  })
                }
                disabled={makeAdminModal.loading}
                className="flex-1 py-3 px-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleMakeAdmin}
                disabled={makeAdminModal.loading}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {makeAdminModal.loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Granting...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Grant Admin
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Make User */}
      {makeUserModal.isOpen && makeUserModal.user && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-blue-700/50 max-w-md w-full p-6 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldX className="text-blue-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Revoke Admin Privileges
              </h3>
              <p className="text-gray-400">
                You are about to revoke admin privileges from this user.
              </p>
            </div>

            {/* User Info */}
            <div className="bg-gray-900/50 rounded-xl p-4 mb-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={makeUserModal.user.photoURL}
                  alt={makeUserModal.user.displayName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-white">
                    {makeUserModal.user.displayName}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {makeUserModal.user.email}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Role:</span>
                  <span className="text-green-400 capitalize">
                    {makeUserModal.user.role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">New Role:</span>
                  <span className="text-blue-400 font-medium">User</span>
                </div>
              </div>
            </div>

            {/* Warning */}
            <div className="bg-blue-900/20 border border-blue-800/50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-blue-500 mt-0.5" size={16} />
                <div>
                  <p className="text-blue-300 text-sm font-medium">Note</p>
                  <p className="text-blue-400/80 text-sm mt-1">
                    This user will lose admin privileges and won't be able to
                    perform administrative actions.
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() =>
                  setMakeUserModal({
                    isOpen: false,
                    user: null,
                    loading: false,
                  })
                }
                disabled={makeUserModal.loading}
                className="flex-1 py-3 px-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleMakeUser}
                disabled={makeUserModal.loading}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {makeUserModal.loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Revoking...
                  </>
                ) : (
                  <>
                    <X size={18} />
                    Revoke Admin
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 3: Delete User */}
      {deleteModal.isOpen && deleteModal.user && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-red-700/50 max-w-md w-full p-6 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="text-red-500" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Delete User</h3>
              <p className="text-gray-400">
                This action cannot be undone. All user data will be permanently
                removed.
              </p>
            </div>

            {/* User Info */}
            <div className="bg-gray-900/50 rounded-xl p-4 mb-6 border border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={deleteModal.user.photoURL}
                  alt={deleteModal.user.displayName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-white">
                    {deleteModal.user.displayName}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {deleteModal.user.email}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Role:</span>
                  <span
                    className={`${deleteModal.user.role === "admin" ? "text-green-400" : "text-blue-400"} capitalize`}
                  >
                    {deleteModal.user.role}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Joined:</span>
                  <span className="text-gray-300">
                    {formatDate(deleteModal.user.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-500 mt-0.5" size={20} />
                <div>
                  <p className="text-red-300 font-medium">
                    Warning: Irreversible Action
                  </p>
                  <ul className="text-red-400/80 text-sm mt-2 space-y-1">
                    <li>• User account will be permanently deleted</li>
                    <li>• All user data will be removed</li>
                    <li>• This action cannot be undone</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() =>
                  setDeleteModal({ isOpen: false, user: null, loading: false })
                }
                disabled={deleteModal.loading}
                className="flex-1 py-3 px-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={deleteModal.loading}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleteModal.loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 size={18} />
                    Delete Permanently
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 4: Details */}
      {detailsModal.isOpen && detailsModal.user && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 max-w-md w-full p-6 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">User Details</h3>
              <button
                onClick={() => setDetailsModal({ isOpen: false, user: null })}
                className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* User Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img
                  src={detailsModal.user.photoURL}
                  alt={detailsModal.user.displayName}
                  className="w-20 h-20 rounded-full border-2 border-gray-700"
                />
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {detailsModal.user.displayName}
                  </h4>
                  <p className="text-gray-400">{detailsModal.user.email}</p>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mt-2 ${
                      detailsModal.user.role === "admin"
                        ? "bg-green-900/30 text-green-400 border border-green-700"
                        : "bg-blue-900/30 text-blue-400 border border-blue-700"
                    }`}
                  >
                    <Shield size={12} />
                    <span className="text-sm font-medium capitalize">
                      {detailsModal.user.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-400">Joined Date</span>
                  </div>
                  <p className="text-white font-medium">
                    {formatDate(detailsModal.user.createdAt)}
                  </p>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield size={14} className="text-gray-500" />
                    <span className="text-sm text-gray-400">Account Type</span>
                  </div>
                  <p className="text-white font-medium capitalize">
                    {detailsModal.user.role}
                  </p>
                </div>
              </div>

              {/* User ID */}
              <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center gap-2 mb-2">
                  <User size={14} className="text-gray-500" />
                  <span className="text-sm text-gray-400">User ID</span>
                </div>
                <p className="text-gray-300 font-mono text-sm break-all">
                  {detailsModal.user._id}
                </p>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setDetailsModal({ isOpen: false, user: null })}
              className="w-full mt-6 py-3 px-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-white font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
