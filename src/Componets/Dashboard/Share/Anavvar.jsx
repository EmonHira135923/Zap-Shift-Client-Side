import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  Zap,
  Home,
  LogOut,
  User,
  Settings,
  Moon,
  Sun,
  Bell,
  ChevronDown,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Anavvar = ({ toggleAside }) => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications] = useState(3); // Example notification count
  const dropdownRef = useRef(null);
  const { user, Signout } = useAuth();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await Signout();
      toast.success("Logout successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed!");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.info(darkMode ? "Switched to Light Mode" : "Switched to Dark Mode");
  };

  return (
    <div className="w-full bg-gray-900/80 backdrop-blur-xl border-b border-gray-800/50 px-6 py-4 flex items-center justify-between shadow-xl">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Menu Button */}
        <button
          onClick={toggleAside}
          className="p-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 group"
        >
          <Menu className="w-5 h-5 text-gray-300 group-hover:text-white" />
        </button>

        {/* Logo/Brand */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              RedUp
            </h1>
            <p className="text-xs text-gray-400">Dashboard</p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 group relative"
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300" />
          ) : (
            <Moon className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button className="p-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 group relative">
            <Bell className="w-5 h-5 text-gray-300 group-hover:text-white" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-gray-900 animate-pulse">
                {notifications}
              </span>
            )}
          </button>
        </div>

        {/* Profile Section */}
        <div className="relative" ref={dropdownRef}>
          {/* Profile Button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 p-1.5 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 group"
          >
            <div className="relative">
              <img
                className="w-10 h-10 rounded-xl border-2 border-gray-700 group-hover:border-blue-500 transition-all duration-300"
                src={
                  user?.photoURL ||
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=RedUp"
                }
                alt="profile"
              />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-semibold text-white">
                {user?.displayName?.split(" ")[0] || "User"}
              </p>
              <p className="text-xs text-gray-400 truncate max-w-[120px]">
                {user?.email?.split("@")[0] || "user"}@...
              </p>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-3 w-64 bg-gray-800/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50 animate-fadeIn">
              {/* User Info */}
              <div className="p-4 border-b border-gray-700/50 bg-gradient-to-r from-gray-800 to-gray-900">
                <div className="flex items-center gap-3">
                  <img
                    className="w-12 h-12 rounded-xl border-2 border-blue-500/50"
                    src={
                      user?.photoURL ||
                      "https://api.dicebear.com/7.x/avataaars/svg?seed=RedUp"
                    }
                    alt="profile"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate">
                      {user?.displayName || "User Name"}
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      {user?.email || "user@example.com"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                        Premium User
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <NavLink
                  to="/"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700/50 transition-all duration-200 group"
                  onClick={() => setOpen(false)}
                >
                  <div className="p-2 bg-gray-700 group-hover:bg-blue-500 rounded-lg transition-all duration-200">
                    <Home className="w-4 h-4 text-gray-300 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-200">Home</p>
                    <p className="text-xs text-gray-500">Return to main page</p>
                  </div>
                </NavLink>

                <NavLink
                  to="/dashboard/profile"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700/50 transition-all duration-200 group"
                  onClick={() => setOpen(false)}
                >
                  <div className="p-2 bg-gray-700 group-hover:bg-purple-500 rounded-lg transition-all duration-200">
                    <User className="w-4 h-4 text-gray-300 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-200">Profile</p>
                    <p className="text-xs text-gray-500">View & edit profile</p>
                  </div>
                </NavLink>

                <NavLink
                  to="/dashboard/settings"
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-700/50 transition-all duration-200 group"
                  onClick={() => setOpen(false)}
                >
                  <div className="p-2 bg-gray-700 group-hover:bg-green-500 rounded-lg transition-all duration-200">
                    <Settings className="w-4 h-4 text-gray-300 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-200">Settings</p>
                    <p className="text-xs text-gray-500">Account preferences</p>
                  </div>
                </NavLink>

                {/* Divider */}
                <div className="border-t border-gray-700/50 my-2"></div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-red-500/20 transition-all duration-200 group w-full"
                >
                  <div className="p-2 bg-red-500/20 group-hover:bg-red-500 rounded-lg transition-all duration-200">
                    <LogOut className="w-4 h-4 text-red-400 group-hover:text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-red-400 group-hover:text-white">
                      Logout
                    </p>
                    <p className="text-xs text-gray-500">
                      Sign out of your account
                    </p>
                  </div>
                </button>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-gray-900/50 border-t border-gray-700/50">
                <p className="text-xs text-gray-500 text-center">
                  © 2024 RedUp Delivery. All rights reserved.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Anavvar;
