import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Map,
  Info,
  DollarSign,
  Bike,
  LogIn,
  UserPlus,
  Zap,
  Moon,
  Sun,
} from "lucide-react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Navvar = () => {
  const [toggle, setToggle] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Listen for scroll to add shadow
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const activeClass =
    "bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-lg font-semibold";
  const inactiveClass =
    "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors";

  // All Nav Items
  const navItems = [
    { name: "Home", path: "/", icon: <Home size={16} /> },
    { name: "Services", path: "/services", icon: <Zap size={16} /> },
    { name: "Coverage", path: "/coverage", icon: <Map size={16} /> },
    { name: "About Us", path: "/about", icon: <Info size={16} /> },
    { name: "Pricing", path: "/pricing", icon: <DollarSign size={16} /> },
    { name: "Be a Rider", path: "/rider", icon: <Bike size={16} /> },
  ];

  // Auth Items
  const authItems = [
    { name: "Login", path: "/auth/login", icon: <LogIn size={16} /> },
    { name: "Register", path: "/auth/register", icon: <UserPlus size={16} /> },
  ];

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <nav
      className={`sticky top-0 z-50 py-2 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                ZapShift
              </span>
            </motion.div>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? activeClass : `px-3 py-1.5 ${inactiveClass}`
                }
              >
                <motion.span
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-1.5 text-sm font-medium"
                >
                  {item.icon}
                  {item.name}
                </motion.span>
              </NavLink>
            ))}
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-yellow-500" />
              ) : (
                <Moon className="w-4 h-4 text-gray-700" />
              )}
            </motion.button>

            {/* Auth Buttons */}
            <div className="flex items-center gap-2 ml-2">
              {authItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold"
                      : "px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  }
                >
                  <span className="flex items-center gap-1.5">
                    {item.icon}
                    {item.name}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Dark Mode Toggle - Mobile */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-yellow-500" />
              ) : (
                <Moon className="w-4 h-4 text-gray-700" />
              )}
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setToggle(!toggle)}
              className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800"
              aria-label="Toggle menu"
            >
              {toggle ? (
                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {toggle && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="lg:hidden mt-4 py-4 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800"
            >
              <div className="space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setToggle(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 text-blue-600 dark:text-blue-400 font-medium rounded-lg mx-2"
                        : "flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg mx-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    }
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}

                {/* Divider */}
                <div className="my-2 border-t border-gray-100 dark:border-gray-800"></div>

                {/* Auth Links */}
                {authItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setToggle(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg mx-2"
                        : "flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg mx-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    }
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Global dark mode class toggle */}
      <style jsx>{`
        body {
          background-color: ${isDarkMode ? "#111827" : "#ffffff"};
          color: ${isDarkMode ? "#f3f4f6" : "#111827"};
          transition:
            background-color 0.3s ease,
            color 0.3s ease;
        }
      `}</style>
    </nav>
  );
};

export default Navvar;
