import React, { useState, useEffect, useRef } from "react";
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
  LogOut,
  User,
  Settings,
  Package,
  Truck,
  ChevronDown,
  Shield,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../hooks/useAuth";

const Navvar = () => {
  const { user, Signout, loading } = useAuth();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Listen for scroll to add shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // handle logout
  const handleLogout = async () => {
    try {
      await Signout();
      navigate("/");
      setToggle(false);
      setShowUserDropdown(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const activeClass =
    "bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-lg font-semibold";
  const inactiveClass =
    "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors";

  // Public Nav Items (always visible)
  const publicNavItems = [
    { name: "Home", path: "/", icon: <Home size={16} /> },
    { name: "Coverage", path: "/coverage", icon: <Map size={16} /> },
    { name: "About Us", path: "/about", icon: <Info size={16} /> },
  ];

  // Protected Nav Items (only visible when logged in)
  const protectedNavItems = [
    { name: "Pricing", path: "/pricing", icon: <DollarSign size={16} /> },
    { name: "Send a Parcel", path: "/services", icon: <Package size={16} /> },
    { name: "Be a Rider", path: "/rider", icon: <Bike size={16} /> },
  ];

  // Dark mode toggle effect
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    document.documentElement.classList.toggle("dark", newMode);
  };

  // User dropdown items
  const userDropdownItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <User size={16} />,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "My Shipments",
      path: "/shipments",
      icon: <Truck size={16} />,
      color: "text-green-600 dark:text-green-400",
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={16} />,
      color: "text-gray-600 dark:text-gray-400",
    },
    {
      name: "Security",
      path: "/security",
      icon: <Shield size={16} />,
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      name: "Logout",
      action: handleLogout,
      icon: <LogOut size={16} />,
      color: "text-red-600 dark:text-red-400",
      isAction: true,
    },
  ];

  // Combine nav items based on auth state
  const navItems = [
    ...publicNavItems,
    ...(user ? protectedNavItems : []), // Only show protected items when logged in
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

  // User dropdown animation
  const userDropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Default user images
  const defaultMaleImg = "https://api.dicebear.com/7.x/avataaars/svg?seed=Male";
  const defaultFemaleImg =
    "https://api.dicebear.com/7.x/avataaars/svg?seed=Female";

  // Use user's photoURL if available, else use default based on email or gender
  const getUserImage = () => {
    if (user?.photoURL) return user.photoURL;

    // You can add logic to determine gender or use email hash
    const emailHash = user?.email
      ?.split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return emailHash % 2 === 0 ? defaultMaleImg : defaultFemaleImg;
  };

  const getUserInitial = () => {
    if (user?.displayName) return user.displayName.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 border-r-cyan-500 dark:border-r-cyan-300 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
          <div className="mt-6 text-center">
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
              Loading
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Please wait...
            </p>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="hidden lg:flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-yellow-500" />
              ) : (
                <Moon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              )}
            </motion.button>

            {/* Auth Buttons / User Profile */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors group"
                >
                  <div className="relative">
                    <img
                      src={getUserImage()}
                      alt={user?.email || "User"}
                      className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextElementSibling.style.display = "flex";
                      }}
                    />
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center border-2 border-white dark:border-gray-700 shadow-sm">
                      <span className="text-sm font-bold text-white">
                        {getUserInitial()}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform ${
                      showUserDropdown ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>

                {/* User Dropdown */}
                <AnimatePresence>
                  {showUserDropdown && (
                    <motion.div
                      variants={userDropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50"
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {user.displayName ||
                            user.email?.split("@")[0] ||
                            "User"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-1">
                          {user.email}
                        </p>
                      </div>

                      {/* Dropdown Items */}
                      <div className="py-2">
                        {userDropdownItems.map((item, index) => (
                          <React.Fragment key={item.name}>
                            {item.isAction ? (
                              <button
                                onClick={() => {
                                  item.action();
                                  setShowUserDropdown(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                              >
                                <div className={`${item.color}`}>
                                  {item.icon}
                                </div>
                                <span
                                  className={`text-sm font-medium ${item.color}`}
                                >
                                  {item.name}
                                </span>
                              </button>
                            ) : (
                              <NavLink
                                to={item.path}
                                onClick={() => setShowUserDropdown(false)}
                                className={({ isActive }) =>
                                  `w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                                    isActive
                                      ? "bg-blue-50 dark:bg-blue-900/20"
                                      : ""
                                  }`
                                }
                              >
                                <div className={item.color}>{item.icon}</div>
                                <span
                                  className={`text-sm font-medium ${item.color}`}
                                >
                                  {item.name}
                                </span>
                              </NavLink>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/auth/login"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg text-sm font-semibold"
                      : "flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  }
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </NavLink>
                <NavLink
                  to="/auth/register"
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg text-sm font-semibold"
                      : "flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                  }
                >
                  <UserPlus className="w-4 h-4" />
                  Register
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Dark Mode Toggle - Mobile */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleDarkMode}
              className="p-1.5 rounded-lg bg-gray-100 dark:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-yellow-500" />
              ) : (
                <Moon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
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
              {/* User info if logged in - Mobile */}
              {user && (
                <div className="px-4 py-3 mb-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg mx-2">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={getUserImage()}
                        alt={user?.email || "User"}
                        className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-700 shadow-sm"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center border-2 border-white dark:border-gray-700 shadow-sm">
                        <span className="text-sm font-bold text-white">
                          {getUserInitial()}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        Welcome
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}

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

                {/* Auth Links for Mobile */}
                {user ? (
                  <>
                    {userDropdownItems.map((item) =>
                      item.isAction ? (
                        <button
                          key={item.name}
                          onClick={() => {
                            item.action();
                            setToggle(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 rounded-lg mx-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                        >
                          {item.icon}
                          {item.name}
                        </button>
                      ) : (
                        <NavLink
                          key={item.name}
                          to={item.path}
                          onClick={() => setToggle(false)}
                          className={({ isActive }) =>
                            isActive
                              ? `flex items-center gap-3 px-4 py-3 ${item.color} font-semibold rounded-lg mx-2 bg-gray-50 dark:bg-gray-800`
                              : `flex items-center gap-3 px-4 py-3 ${item.color} rounded-lg mx-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`
                          }
                        >
                          {item.icon}
                          {item.name}
                        </NavLink>
                      )
                    )}
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/auth/login"
                      onClick={() => setToggle(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg mx-2"
                          : "flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg mx-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      }
                    >
                      <LogIn className="w-4 h-4" />
                      Login
                    </NavLink>
                    <NavLink
                      to="/auth/register"
                      onClick={() => setToggle(false)}
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg mx-2"
                          : "flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 rounded-lg mx-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      }
                    >
                      <UserPlus className="w-4 h-4" />
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navvar;
