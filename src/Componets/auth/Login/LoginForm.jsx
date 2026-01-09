import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Github,
  Zap,
  Shield,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  BarChart3,
  Cloud,
  Cpu,
  MapPin,
  Clock,
  Users,
  Package,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router"; // Fixed import
import { Link } from "react-router"; // Added for navigation
import useAuth from "../../hooks/useAuth";

const LoginForm = () => {
  const { signin, googleUser, loading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  // AuthContexts value

  // Handle Form
  const handleLoginForm = async (data) => {
    setIsLoading(true);
    try {
      const res = await signin(data.email, data.password);
      toast.success(`Login successful! Welcome ${res?.user?.email || ""}`);
      reset();
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      let errorMessage = "Login failed. Please try again.";

      if (err.code) {
        switch (err.code) {
          case "auth/wrong-password":
            errorMessage = "Incorrect password. Please try again.";
            break;
          case "auth/user-not-found":
            errorMessage = "No account found with this email.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email format.";
            break;
          case "auth/user-disabled":
            errorMessage = "This account has been disabled.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many failed attempts. Please try again later.";
            break;
          case "auth/network-request-failed":
            errorMessage = "Network error. Please check your connection.";
            break;
          default:
            errorMessage = err.message || "Login failed";
        }
      } else {
        errorMessage = err.message || "Login failed";
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const res = await googleUser();
      toast.success(`Login successful! Welcome ${res?.user?.email || ""}`);
      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      let errorMessage = "Google login failed. Please try again.";

      if (err.code) {
        switch (err.code) {
          case "auth/popup-closed-by-user":
            errorMessage = "Sign-in popup was closed. Please try again.";
            break;
          case "auth/popup-blocked":
            errorMessage = "Popup blocked. Please allow popups for this site.";
            break;
          case "auth/cancelled-popup-request":
            errorMessage = "Sign-in cancelled.";
            break;
          case "auth/account-exists-with-different-credential":
            errorMessage =
              "An account already exists with a different sign-in method.";
            break;
          default:
            errorMessage = err.message || "Google login failed";
        }
      }

      toast.error(errorMessage);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  // Show auth loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-infinity loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"
        ></motion.div>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl"
        ></motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/20 dark:bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-4 mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent">
                QuantumShift
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                AI-Powered Logistics Platform
              </p>
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Login Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-blue-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700/50"></div>

            <div className="relative z-10 p-8 md:p-12">
              <motion.div variants={itemVariants} className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                  Welcome Back
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Sign in to access your AI-powered logistics dashboard
                </p>
              </motion.div>

              {/* Social Login Buttons */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                <motion.button
                  onClick={handleGoogleSignIn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isGoogleLoading || isLoading}
                  className="group relative flex items-center justify-center gap-3 px-6 py-3.5 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGoogleLoading ? (
                    <div className="w-5 h-5 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                    </svg>
                  )}
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    {isGoogleLoading ? "Signing in..." : "Google"}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 rounded-xl transition-all duration-300"></div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isGoogleLoading || isLoading}
                  className="group relative flex items-center justify-center gap-3 px-6 py-3.5 bg-gray-900 dark:bg-gray-950 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <Github className="w-5 h-5 text-white" />
                  <span className="font-medium text-white">GitHub</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-800/0 to-gray-900/0 group-hover:from-gray-800/10 group-hover:to-gray-900/10 rounded-xl transition-all duration-300"></div>
                </motion.button>
              </motion.div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-gray-500 dark:text-gray-400">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Login Form */}
              <form
                onSubmit={handleSubmit(handleLoginForm)}
                className="space-y-6"
              >
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
                      disabled={isLoading || isGoogleLoading}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 group-hover:border-blue-400 backdrop-blur-sm disabled:opacity-70 disabled:cursor-not-allowed"
                      placeholder="you@company.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-2 flex items-center gap-1"
                      >
                        <Shield className="w-3 h-3" />
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                      <span className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Password
                      </span>
                    </label>
                    <button
                      type="button"
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors disabled:opacity-70"
                      disabled={isLoading || isGoogleLoading}
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
                      disabled={isLoading || isGoogleLoading}
                      className="w-full pl-12 pr-12 py-3.5 bg-white/50 dark:bg-gray-900/30 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 group-hover:border-blue-400 backdrop-blur-sm disabled:opacity-70 disabled:cursor-not-allowed"
                      placeholder="••••••••"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-70"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      disabled={isLoading || isGoogleLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                      )}
                    </button>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-500 mt-2 flex items-center gap-1"
                      >
                        <Shield className="w-3 h-3" />
                        {errors.password.message}
                      </motion.p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <input
                        type="checkbox"
                        id="remember"
                        className="peer sr-only"
                        disabled={isLoading || isGoogleLoading}
                        {...register("remember")}
                      />
                      <div className="w-5 h-5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-cyan-500 peer-checked:border-transparent flex items-center justify-center transition-all duration-200">
                        <CheckCircle className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <label
                      htmlFor="remember"
                      className="ml-3 text-sm text-gray-700 dark:text-gray-300"
                    >
                      Remember me for 30 days
                    </label>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading || isGoogleLoading}
                    className="w-full group relative bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-cyan-500/0 to-blue-600/0 group-hover:from-blue-600/20 group-hover:via-cyan-500/20 group-hover:to-blue-600/20 rounded-xl transition-all duration-500"></div>
                  </motion.button>
                </motion.div>
              </form>

              <motion.div variants={itemVariants} className="mt-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link
                    to="/auth/register"
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1 group"
                  >
                    Sign up now
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
              </motion.div>

              {/* Security Badge */}
              <motion.div
                variants={itemVariants}
                className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>
                    Enterprise-grade security • GDPR compliant • SOC 2 Type II
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
            {/* Main Features Card */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 rounded-3xl p-8 md:p-12 shadow-2xl border border-blue-700/30">
              <div className="space-y-10">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Why QuantumShift?
                  </h3>
                  <p className="text-blue-100/80">
                    Join thousands of enterprises transforming their logistics
                    with AI
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Cpu className="w-6 h-6" />,
                      title: "AI-Powered Routing",
                      desc: "Machine learning optimizes delivery routes in real-time",
                      color: "from-blue-500 to-cyan-500",
                    },
                    {
                      icon: <BarChart3 className="w-6 h-6" />,
                      title: "Real-time Analytics",
                      desc: "Live insights and predictive analytics dashboard",
                      color: "from-purple-500 to-pink-500",
                    },
                    {
                      icon: <Cloud className="w-6 h-6" />,
                      title: "Cloud Native",
                      desc: "Scalable infrastructure with 99.9% uptime SLA",
                      color: "from-green-500 to-emerald-500",
                    },
                    {
                      icon: <MapPin className="w-6 h-6" />,
                      title: "Global Tracking",
                      desc: "Real-time GPS tracking across 150+ countries",
                      color: "from-orange-500 to-red-500",
                    },
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 group cursor-pointer"
                    >
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <div className="text-white">{feature.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-blue-100/70 text-sm">
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats Section */}
                <div className="pt-8 border-t border-blue-700/30">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-white font-semibold text-lg">
                        Trusted by Industry Leaders
                      </p>
                      <p className="text-blue-100/70 text-sm">
                        Join our growing community
                      </p>
                    </div>
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <motion.div
                          key={i}
                          whileHover={{ scale: 1.2 }}
                          className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-2 border-blue-900 flex items-center justify-center"
                        >
                          <span className="text-xs font-bold text-white">
                            C{i}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        value: "99.9%",
                        label: "Uptime",
                        icon: <Clock className="w-4 h-4" />,
                      },
                      {
                        value: "10K+",
                        label: "Active Users",
                        icon: <Users className="w-4 h-4" />,
                      },
                      {
                        value: "1M+",
                        label: "Deliveries",
                        icon: <Package className="w-4 h-4" />,
                      },
                      {
                        value: "4.9★",
                        label: "Rating",
                        icon: <Award className="w-4 h-4" />,
                      },
                    ].map((stat, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        className="bg-blue-800/30 backdrop-blur-sm rounded-xl p-4 border border-blue-700/30"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-blue-300">{stat.icon}</div>
                          <div>
                            <div className="text-2xl font-bold text-white">
                              {stat.value}
                            </div>
                            <div className="text-sm text-blue-200/70">
                              {stat.label}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-gray-800 shadow-xl">
              <h4 className="text-lg font-semibold text-white mb-6">
                Performance Metrics
              </h4>
              <div className="space-y-4">
                {[
                  {
                    label: "Delivery Time Reduction",
                    value: "42%",
                    color: "bg-gradient-to-r from-green-500 to-emerald-500",
                    width: "42%",
                  },
                  {
                    label: "Cost Savings",
                    value: "35%",
                    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
                    width: "35%",
                  },
                  {
                    label: "Carbon Footprint",
                    value: "28%",
                    color: "bg-gradient-to-r from-purple-500 to-pink-500",
                    width: "28%",
                  },
                ].map((metric, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{metric.label}</span>
                      <span className="font-medium text-white">
                        {metric.value}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: metric.width }}
                        transition={{ duration: 1.5, delay: idx * 0.2 }}
                        className={`h-full rounded-full ${metric.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-gray-500 dark:text-gray-400 text-sm"
        >
          <p>© 2026 QuantumShift. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginForm;
