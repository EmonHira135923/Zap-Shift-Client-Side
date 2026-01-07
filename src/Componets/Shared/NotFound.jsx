import React from "react";
import { Link, useNavigate } from "react-router";
import { Truck, Package, Home, Search } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-12 pt-6">
          <div className="flex items-center gap-2">
            <Truck className="w-8 h-8 text-emerald-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              ZapShift Delivery
            </span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </button>
        </header>

        <main className="grid md:grid-cols-2 gap-12 items-center mt-12">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800 mb-6">
                <Package className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium">Error 404</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Package
                <span className="block text-emerald-400">Not Found</span>
              </h1>

              <p className="text-gray-400 text-lg mb-8 max-w-lg">
                Looks like this delivery route doesn't exist. The page you're
                looking for might have been moved, delivered elsewhere, or is
                temporarily unavailable.
              </p>
            </motion.div>

            {/* Search Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <p className="text-gray-300 font-medium">
                Try searching instead:
              </p>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for delivery services, tracking, or support..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-800 border border-gray-700 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
                  Search
                </button>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-6"
            >
              <p className="text-gray-300 font-medium mb-4">Quick Links:</p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Track Package", path: "/track", icon: Package },
                  { label: "Services", path: "/services", icon: Truck },
                  { label: "Support", path: "/support", icon: "🛟" },
                  { label: "Contact", path: "/contact", icon: "📞" },
                ].map((link, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(link.path)}
                    className="flex items-center gap-3 p-4 rounded-xl bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-emerald-500/30 transition-all group"
                  >
                    <span className="text-xl">
                      {typeof link.icon === "string" ? (
                        link.icon
                      ) : (
                        <link.icon className="w-5 h-5" />
                      )}
                    </span>
                    <span className="font-medium group-hover:text-emerald-400 transition-colors">
                      {link.label}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Animated Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative aspect-square">
              {/* Main illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-700 flex items-center justify-center">
                  <div className="relative">
                    {/* Lost package animation */}
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="w-32 h-32 bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 rounded-2xl border border-emerald-500/30 flex items-center justify-center"
                    >
                      <Package className="w-16 h-16 text-emerald-400" />
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">?</span>
                      </div>
                    </motion.div>

                    {/* Floating elements */}
                    <motion.div
                      animate={{
                        x: [0, 100, 0],
                        y: [0, 50, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute top-0 left-0 w-8 h-8 bg-gray-700 rounded-full border border-gray-600"
                    />

                    <motion.div
                      animate={{
                        x: [0, -80, 0],
                        y: [0, -40, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: 1,
                      }}
                      className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500/20 rounded-full border border-emerald-500/30"
                    />
                  </div>
                </div>
              </div>

              {/* Background glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 blur-3xl rounded-full" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12">
              {[
                { value: "99.8%", label: "Successful Deliveries" },
                { value: "24/7", label: "Tracking Available" },
                { value: "< 2h", label: "Avg. Response Time" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-gray-800/50 border border-gray-700"
                >
                  <div className="text-2xl font-bold text-emerald-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 ZapShift Delivery. All rights reserved.
            </div>
            <div className="flex gap-6">
              <button
                onClick={() => navigate("/privacy")}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => navigate("/terms")}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => navigate("/support")}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Support Center
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NotFound;
