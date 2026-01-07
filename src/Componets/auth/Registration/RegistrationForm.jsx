import React, { useState } from "react";
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
  CheckCircle,
  Shield,
  Building,
  Briefcase,
  Globe,
  Award,
  Sparkles,
  Truck,
  Package,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setImagePreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 flex items-center justify-center p-4 md:p-6">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
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
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Side - Registration Form (3 columns) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl dark:shadow-black/30 border border-gray-100 dark:border-gray-700"
          >
            <div className="p-6 md:p-8 lg:p-10">
              {/* Header */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <a
                    href="/login"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Login
                  </a>
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

              {/* Social Login Buttons */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-3 mb-8"
              >
                <button className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-sm">
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

                <button className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-900 dark:bg-gray-950 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-900 transition-colors">
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

              {/* Profile Image Upload */}
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
              <form className="space-y-6">
                {/* Name & Phone Row */}
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
                      />
                    </div>
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
                      />
                    </div>
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
                    />
                  </div>
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
                    </div>
                    <div className="mt-3 space-y-1.5">
                      {[
                        "At least 8 characters",
                        "Uppercase & lowercase",
                        "Include numbers",
                      ].map((req, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-xs"
                        >
                          <Check className="w-3 h-3 text-green-500" />
                          <span className="text-gray-500 dark:text-gray-400">
                            {req}
                          </span>
                        </div>
                      ))}
                    </div>
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
                        placeholder="••••••••"
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
                  </motion.div>
                </div>

                {/* Terms Agreement */}
                <motion.div
                  variants={itemVariants}
                  className="flex items-start space-x-3"
                >
                  <div className="relative flex items-center h-5">
                    <input
                      type="checkbox"
                      id="terms"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <label
                    htmlFor="terms"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    I agree to the{" "}
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="#"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </motion.div>

                {/* Submit Button */}
                <motion.div variants={itemVariants}>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Create Account
                      <Sparkles className="w-4 h-4" />
                    </span>
                  </button>
                </motion.div>
              </form>

              {/* Sign In Link */}
              <motion.div variants={itemVariants} className="mt-8 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                  >
                    Sign in
                  </a>
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Benefits (2 columns) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Benefits Card */}
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Why Join ZapShift?
                  </h3>
                  <p className="text-blue-100/90 text-sm">
                    Unlock exclusive features for your business
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Package className="w-5 h-5" />,
                      title: "Real-time Tracking",
                      desc: "Live GPS tracking for all deliveries",
                    },
                    {
                      icon: <Shield className="w-5 h-5" />,
                      title: "Secure Delivery",
                      desc: "Bank-level security for all transactions",
                    },
                    {
                      icon: <Building className="w-5 h-5" />,
                      title: "Business Tools",
                      desc: "Dashboard for managing multiple deliveries",
                    },
                    {
                      icon: <Globe className="w-5 h-5" />,
                      title: "Wide Coverage",
                      desc: "Service across 64+ districts",
                    },
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <div className="text-white">{benefit.icon}</div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm mb-1">
                          {benefit.title}
                        </h4>
                        <p className="text-blue-100/80 text-xs">
                          {benefit.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="pt-6 border-t border-blue-500/30">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { value: "99.9%", label: "Success Rate" },
                      { value: "5000+", label: "Deliveries" },
                    ].map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl font-bold text-white mb-1">
                          {stat.value}
                        </div>
                        <div className="text-xs text-blue-200/80">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Trusted by Businesses
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      500+ companies nationwide
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute -top-3 -left-3 text-3xl text-gray-300 dark:text-gray-700">
                    "
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm italic pl-3">
                    ZapShift transformed our logistics. 40% faster deliveries
                    and 99% customer satisfaction!
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">RJ</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Rajib Hasan
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      CEO, TechLogistics BD
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Features */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Quick Setup
              </h4>
              <div className="space-y-3">
                {[
                  { text: "Verify your email", completed: true },
                  { text: "Add business details", completed: true },
                  { text: "Set up payment method", completed: false },
                  { text: "Start your first delivery", completed: false },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step.completed
                          ? "bg-emerald-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-400"
                      }`}
                    >
                      {step.completed ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <span className="text-xs">{idx + 1}</span>
                      )}
                    </div>
                    <span
                      className={`text-sm ${
                        step.completed
                          ? "text-gray-600 dark:text-gray-300"
                          : "text-gray-400 dark:text-gray-500"
                      }`}
                    >
                      {step.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
