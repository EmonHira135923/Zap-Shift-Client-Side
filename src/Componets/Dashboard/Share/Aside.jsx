import React from "react";
import { Home, Package } from "lucide-react";
import { NavLink, useLocation } from "react-router";
import { motion } from "framer-motion";
import { MdPayments } from "react-icons/md";

const Aside = ({ openAside }) => {
  const location = useLocation();

  const navItems = [
    {
      path: "/dashboard",
      icon: Home,
      label: "Dashboard",
      description: "Overview",
    },
    {
      path: "/dashboard/mypercels",
      icon: Package,
      label: "My Parcels",
    },
    {
      path: "/dashboard/payments/:id",
      icon: MdPayments,
      label: "Payment Status",
    },
  ];

  return (
    <div className="h-full bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 border-r border-gray-800/50 shadow-2xl shadow-black/30 flex flex-col">
      {/* Logo/Brand Section */}
      <div className="p-6 border-b border-gray-800/50">
        {openAside ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20">
              <Package className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                RedUp
              </h1>
              <p className="text-xs text-gray-400">Delivery Hub</p>
            </div>
          </motion.div>
        ) : (
          <div className="flex justify-center">
            <div className="p-3 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl shadow-lg shadow-blue-500/20">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive: navIsActive }) => `
                group relative flex items-center transition-all duration-300
                ${openAside ? "rounded-xl p-4 justify-start" : "rounded-lg p-4 justify-center"}
                ${
                  navIsActive || isActive
                    ? "bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 border border-blue-500/30 shadow-lg shadow-blue-500/10"
                    : "hover:bg-gray-800/50 border border-transparent hover:border-gray-700/50"
                }
              `}
            >
              {/* Active Indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-gradient-to-b from-blue-400 to-purple-400 rounded-r-full" />
              )}

              {/* Icon Container */}
              <div
                className={`
                relative flex items-center justify-center transition-all duration-300
                ${openAside ? "w-12 h-12" : "w-14 h-14"}
                ${
                  isActive
                    ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-gray-800 text-gray-400 group-hover:bg-gray-700 group-hover:text-white"
                }
                rounded-xl
              `}
              >
                <Icon className={openAside ? "w-4 h-4" : "w-6 h-6"} />

                {/* Badge Notification */}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-gray-900">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Text Content (Only when openAside is true) */}
              {openAside && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-4 flex-1 min-w-0"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`
                      font-semibold truncate
                      ${isActive ? "text-white" : "text-gray-300 group-hover:text-white"}
                    `}
                    >
                      {item.label}
                    </span>
                    {item.component && (
                      <span className="ml-2">{item.component}</span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {item.description}
                    </p>
                  )}
                </motion.div>
              )}

              {/* Tooltip for collapsed state */}
              {!openAside && (
                <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 border border-gray-700 shadow-xl">
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.label}</span>
                    {item.description && (
                      <span className="text-xs text-gray-400">
                        {item.description}
                      </span>
                    )}
                    {item.badge && (
                      <span className="text-xs text-red-400 mt-1">
                        {item.badge} new notifications
                      </span>
                    )}
                  </div>
                  {/* Tooltip arrow */}
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-8 border-transparent border-r-gray-900" />
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Aside;
