import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  Upload,
  X,
  Camera,
  Github,
  ArrowLeft,
  Shield,
  Building,
  Globe,
  Award,
  Sparkles,
  Truck,
  Package,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate, useLocation } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const { user, loading, reg, googleUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // React Hook Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const password = watch("password");

  // Dark mode global effect
  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  // Handle profile image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPG, PNG or GIF files are allowed");
      return;
    }

    setProfileImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
  };

  // Form submission
  const handleRegForm = async (data) => {
    try {
      await reg(data.email, data.password);
      toast.success(`Registration Successful! Welcome ${data.name}`);
      reset();
      navigate("/auth/login");
    } catch (err) {
      toast.error(err?.message || "Registration failed");
    }
  };

  // Google registration
  const handleGoogleUser = async () => {
    try {
      const result = await googleUser();
      toast.success(`Google Registration Successful! ${result?.email}`);
      navigate("/");
    } catch (err) {
      toast.error(err?.message || "Google registration failed");
    }
  };

  useEffect(() => {}, [loading, navigate, user]);

  // loading check

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-infinity loading-lg"></div>
      </div>
    );
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };
  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 flex items-center justify-center p-4 md:p-6 relative">
      {/* Animated Background */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-20 right-20 w-64 h-64 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Registration Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl border border-gray-100 dark:border-gray-700"
          >
            <div className="p-6 md:p-8 lg:p-10">
              {/* Header */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <NavLink
                    to="/auth/login"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Login
                  </NavLink>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">
                      <Truck className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                      ZapShift
                    </span>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    Create Your Account
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Join thousands of businesses optimizing their logistics
                  </p>
                </div>
              </motion.div>

              {/* Social Login */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-3 mb-8"
              >
                <button
                  type="button"
                  onClick={handleGoogleUser}
                  className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                  </svg>
                  <span className="font-medium text-gray-700 dark:text-gray-300">
                    Google
                  </span>
                </button>

                <button
                  type="button"
                  className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 dark:bg-gray-950 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-900 transition-colors"
                >
                  <Github className="w-5 h-5 text-white" />
                  <span className="font-medium text-white">GitHub</span>
                </button>
              </motion.div>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or register with email
                  </span>
                </div>
              </div>

              {/* Profile Upload */}
              <motion.div variants={itemVariants} className="mb-8">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                  Profile Picture{" "}
                  <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center overflow-hidden bg-gray-50 dark:bg-gray-900/50 hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                      {imagePreview ? (
                        <>
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <Camera className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg cursor-pointer transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      JPG, PNG or GIF. Max 5MB
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Registration Form */}
              <form
                onSubmit={handleSubmit(handleRegForm)}
                className="space-y-6"
              >
                {/* Name & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="John Doe"
                        {...register("name", {
                          required: "Name is required",
                          minLength: {
                            value: 2,
                            message: "Name must be at least 2 characters",
                          },
                        })}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="+880 1234 567890"
                        {...register("phone", {
                          required: "Phone number is required",
                          pattern: {
                            value: /^[+]?[0-9\s\-()]{10,15}$/,
                            message: "Please enter a valid phone number",
                          },
                        })}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Email */}
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="you@example.com"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </motion.div>

                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Enter Your Password"
                        {...register("password", {
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                            message:
                              "Password must contain uppercase, lowercase, and number",
                          },
                        })}
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
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        placeholder="Confirm Your Password"
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === password || "Passwords do not match",
                        })}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </motion.div>
                </div>

                {/* Terms */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-start space-x-2"
                >
                  <input type="checkbox" id="terms" className="mt-1" required />
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    I agree to the{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      Terms and Conditions
                    </span>
                  </label>
                </motion.div>

                {/* Submit */}
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Registering..." : "Register"}
                  </button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Right Info / Animation Panel */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 hidden lg:flex flex-col justify-center items-center text-center bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-10 space-y-6"
          >
            <motion.div variants={itemVariants}>
              <Sparkles className="w-12 h-12 mx-auto text-blue-500" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
                Fast & Secure
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Our platform ensures your data is safe and your shipments are
                faster than ever.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Package className="w-12 h-12 mx-auto text-green-500" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
                Track Packages
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Easily track all your shipments in one place with live updates.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Check className="w-12 h-12 mx-auto text-purple-500" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
                Reliable Service
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                We provide dependable logistics solutions for businesses of all
                sizes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
