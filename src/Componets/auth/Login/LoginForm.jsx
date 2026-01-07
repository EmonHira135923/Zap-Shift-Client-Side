import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Github,
  Zap,
  Shield,
  Package,
  Truck,
  Smartphone,
  CheckCircle,
  Sparkles,
  Key,
} from "lucide-react";
import { motion } from "framer-motion";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              ZapShift
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Delivering Excellence, Digitally
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Login Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-100 dark:border-gray-700"
          >
            <motion.div variants={itemVariants} className="mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Sign in to access your dashboard and manage deliveries
              </p>
            </motion.div>

            {/* Social Login Buttons */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <button className="group relative flex items-center justify-center gap-3 px-6 py-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                </svg>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Google
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 rounded-xl transition-all duration-300"></div>
              </button>

              <button className="group relative flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 dark:bg-gray-950 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-900 transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl">
                <Github className="w-5 h-5 text-white" />
                <span className="font-medium text-white">GitHub</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800/0 to-gray-900/0 group-hover:from-gray-800/10 group-hover:to-gray-900/10 rounded-xl transition-all duration-300"></div>
              </button>
            </motion.div>

            <div className="relative my-10">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Login Form */}
            <form className="space-y-6">
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 group-hover:border-blue-400"
                    placeholder="you@example.com"
                  />
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400/20 pointer-events-none transition-all duration-300"></div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <span className="flex items-center gap-2">
                      <Key className="w-4 h-4" />
                      Password
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 group-hover:border-blue-400"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                    )}
                  </button>
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-400/20 pointer-events-none transition-all duration-300"></div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-center">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="remember"
                    className="peer sr-only"
                  />
                  <div className="w-5 h-5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 peer-checked:bg-blue-500 peer-checked:border-blue-500 flex items-center justify-center transition-all duration-200">
                    <CheckCircle className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                </div>
                <label
                  htmlFor="remember"
                  className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                >
                  Remember me for 30 days
                </label>
              </motion.div>

              <motion.div variants={itemVariants}>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full group relative bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Sign In
                        <Zap className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-cyan-500/0 to-blue-600/0 group-hover:from-blue-600/20 group-hover:via-cyan-500/20 group-hover:to-blue-600/20 rounded-xl transition-all duration-500"></div>
                </button>
              </motion.div>
            </form>

            <motion.div variants={itemVariants} className="mt-8 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <a
                  href="/register"
                  className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1"
                >
                  Create account
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </p>
            </motion.div>
          </motion.div>

          {/* Right Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-8 md:p-12 shadow-2xl">
              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Why Choose ZapShift?
                  </h3>
                  <p className="text-blue-100/90">
                    Join thousands of businesses optimizing their logistics
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Package className="w-6 h-6" />,
                      title: "Real-time Tracking",
                      desc: "Track packages live with GPS",
                    },
                    {
                      icon: <Shield className="w-6 h-6" />,
                      title: "Enterprise Security",
                      desc: "Bank-level encryption & protection",
                    },
                    {
                      icon: <Truck className="w-6 h-6" />,
                      title: "Fast Delivery",
                      desc: "40-72 hours nationwide",
                    },
                    {
                      icon: <Smartphone className="w-6 h-6" />,
                      title: "Mobile App",
                      desc: "Manage deliveries on the go",
                    },
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all duration-300">
                        <div className="text-white">{feature.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-blue-100/80 text-sm">
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-8 border-t border-blue-500/30">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-white/20 border-2 border-blue-600 flex items-center justify-center"
                        >
                          <span className="text-xs font-bold text-white">
                            U{i}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        5,000+ Active Users
                      </p>
                      <p className="text-blue-100/80 text-sm">
                        Join our growing community
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "99.9%", label: "Uptime" },
                { value: "5000+", label: "Deliveries" },
                { value: "24/7", label: "Support" },
                { value: "4.9★", label: "Rating" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-white/10 dark:border-gray-700"
                >
                  <div className="text-2xl font-bold text-white dark:text-gray-100 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-blue-100/80 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
