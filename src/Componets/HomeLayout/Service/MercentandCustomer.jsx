import React, { useState } from "react";
import { motion } from "framer-motion";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import {
  FaStore,
  FaUsers,
  FaShieldAlt,
  FaRocket,
  FaChartLine,
  FaHeadset,
  FaTruck,
  FaClock,
  FaCheckCircle,
  FaStar,
  FaMedal,
  FaPercentage,
} from "react-icons/fa";
import { FiTrendingUp, FiGlobe, FiAward } from "react-icons/fi";
import CountUp from "react-countup";
import Tilt from "react-parallax-tilt";

const MerchantandCustomer = () => {
  const [activeTab, setActiveTab] = useState("merchant");

  const merchantBenefits = [
    {
      icon: <FaPercentage className="w-5 h-5" />,
      text: "Lowest commission rates in the industry",
      highlight: "1.5% avg.",
    },
    {
      icon: <FaChartLine className="w-5 h-5" />,
      text: "Real-time analytics dashboard",
      highlight: "24/7 access",
    },
    {
      icon: <FaShieldAlt className="w-5 h-5" />,
      text: "Bank-level security & fraud protection",
      highlight: "100% secure",
    },
    {
      icon: <FiGlobe className="w-5 h-5" />,
      text: "Global reach to 50+ countries",
      highlight: "New markets",
    },
  ];

  const customerBenefits = [
    {
      icon: <FaTruck className="w-5 h-5" />,
      text: "Same-day delivery guarantee",
      highlight: "2-hour delivery",
    },
    {
      icon: <FaClock className="w-5 h-5" />,
      text: "Live package tracking system",
      highlight: "Real-time updates",
    },
    {
      icon: <FaCheckCircle className="w-5 h-5" />,
      text: "Hassle-free returns & refunds",
      highlight: "30-day policy",
    },
    {
      icon: <FaStar className="w-5 h-5" />,
      text: "Exclusive member benefits",
      highlight: "VIP rewards",
    },
  ];

  const stats = [
    {
      value: 99.7,
      suffix: "%",
      label: "Customer Satisfaction",
      icon: <FaStar />,
      color: "from-yellow-500 to-orange-500",
    },
    {
      value: 24,
      suffix: "/7",
      label: "Support Availability",
      icon: <FaHeadset />,
      color: "from-blue-500 to-cyan-500",
    },
    {
      value: 5000,
      suffix: "+",
      label: "Active Merchants",
      icon: <FaStore />,
      color: "from-purple-500 to-pink-500",
    },
    {
      value: 98,
      suffix: "%",
      label: "On-time Delivery",
      icon: <FaTruck />,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-pulse delay-500"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float-slow">
        <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-50"></div>
      </div>
      <div className="absolute bottom-40 right-20 animate-float">
        <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-50"></div>
      </div>
      <div className="absolute top-1/2 left-20 animate-float-delayed">
        <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <Fade direction="down" duration={800} triggerOnce>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-gray-800 mb-8">
              <FaMedal className="text-yellow-500" />
              <span className="text-blue-400 font-semibold">
                Trusted by 5000+ Businesses Worldwide
              </span>
            </div>
          </Fade>

          <Slide direction="up" duration={800} triggerOnce>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              We Put{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Your Success
              </span>{" "}
              First
            </h1>
          </Slide>

          <Zoom duration={800} delay={200} triggerOnce>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              At ZapShift, we believe in creating win-win partnerships. Our
              platform is designed to empower merchants with growth tools while
              delivering exceptional experiences to customers.
            </p>
          </Zoom>
        </div>

        {/* Stats Counter Section */}
        <Fade duration={800} delay={300} triggerOnce>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <Tilt
                key={index}
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                scale={1.03}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 hover:border-gray-700 transition-all duration-500 group"
                >
                  <div
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                    <CountUp
                      start={0}
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={2.5}
                      decimals={stat.value % 1 !== 0 ? 1 : 0}
                    />
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </Fade>

        {/* Toggle Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800">
            {["merchant", "customer"].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab === "merchant" ? <FaStore /> : <FaUsers />}
                {tab === "merchant" ? "For Merchants" : "For Customers"}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Side - Content */}
          <div>
            <Fade direction="left" duration={800} triggerOnce>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  {activeTab === "merchant"
                    ? "Grow Your Business with Our Merchant Solutions"
                    : "Experience Seamless Shopping with ZapShift"}
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  {activeTab === "merchant"
                    ? "Join thousands of successful merchants who trust ZapShift to power their e-commerce growth. Our comprehensive platform provides everything you need to scale your business."
                    : "Enjoy a frictionless shopping experience with fast delivery, secure payments, and exceptional customer support. We prioritize your satisfaction above all else."}
                </p>

                <div className="space-y-4">
                  {(activeTab === "merchant"
                    ? merchantBenefits
                    : customerBenefits
                  ).map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 bg-gray-900/30 rounded-xl hover:bg-gray-900/50 transition-colors duration-300 group"
                    >
                      <div className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <span className="text-blue-400">{benefit.icon}</span>
                      </div>
                      <div className="flex-1">
                        <span className="text-white">{benefit.text}</span>
                      </div>
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                        {benefit.highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-3 group"
                >
                  <span>
                    {activeTab === "merchant"
                      ? "Start Selling Now"
                      : "Start Shopping"}
                  </span>
                  <FaRocket className="group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>
            </Fade>
          </div>

          {/* Right Side - Interactive Card */}
          <div>
            <Fade direction="right" duration={800} triggerOnce>
              <Tilt
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                scale={1.03}
                glareEnable={true}
                glareMaxOpacity={0.2}
              >
                <div className="relative">
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl blur-xl"></div>

                  {/* Main Card */}
                  <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 shadow-2xl overflow-hidden">
                    {/* Card Header */}
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
                          {activeTab === "merchant" ? (
                            <FaStore className="w-8 h-8 text-blue-400" />
                          ) : (
                            <FaUsers className="w-8 h-8 text-purple-400" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            {activeTab === "merchant"
                              ? "Merchant Dashboard"
                              : "Customer Portal"}
                          </h3>
                          <p className="text-gray-400">
                            Real-time insights & analytics
                          </p>
                        </div>
                      </div>
                      <FiTrendingUp className="w-6 h-6 text-green-500" />
                    </div>

                    {/* Card Content */}
                    <div className="space-y-6">
                      {/* Progress Bars */}
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Growth Rate</span>
                            <span className="text-green-400">+42%</span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "72%" }}
                              transition={{ duration: 1.5 }}
                              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm text-gray-400 mb-2">
                            <span>Customer Satisfaction</span>
                            <span className="text-blue-400">99.7%</span>
                          </div>
                          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "99.7%" }}
                              transition={{ duration: 1.5, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-900/50 rounded-xl p-4">
                          <p className="text-gray-400 text-sm">
                            Monthly Revenue
                          </p>
                          <p className="text-2xl font-bold text-white">
                            $45.2K
                          </p>
                        </div>
                        <div className="bg-gray-900/50 rounded-xl p-4">
                          <p className="text-gray-400 text-sm">Active Orders</p>
                          <p className="text-2xl font-bold text-white">1,234</p>
                        </div>
                      </div>

                      {/* Badge */}
                      <div className="flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                        <FiAward className="w-6 h-6 text-yellow-500" />
                        <span className="text-white font-semibold">
                          {activeTab === "merchant"
                            ? "Top Performing Merchant"
                            : "Valued Customer"}
                        </span>
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full -translate-y-16 translate-x-16"></div>
                  </div>
                </div>
              </Tilt>
            </Fade>
          </div>
        </div>

        {/* CTA Section */}
        <Slide direction="up" duration={800} triggerOnce>
          <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full translate-x-16 translate-y-16"></div>
            </div>

            <div className="relative z-10 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Experience?
              </h3>
              <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg">
                Join thousands of successful businesses and satisfied customers
                who trust ZapShift for their e-commerce needs. Start your
                journey today!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                >
                  Get Started Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 bg-gray-900/50 text-white font-bold rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
                >
                  Schedule Demo
                </motion.button>
              </div>

              <div className="mt-8 text-gray-500 text-sm">
                <p>
                  No credit card required • 30-day free trial • 24/7 support
                </p>
              </div>
            </div>
          </div>
        </Slide>

        {/* Floating Trust Badges */}
        <Fade duration={800} delay={500} triggerOnce>
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            {[
              "Award Winning",
              "ISO Certified",
              "GDPR Compliant",
              "SSL Secure",
            ].map((badge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900/30 backdrop-blur-sm rounded-full border border-gray-800 hover:border-blue-500/50 transition-colors duration-300"
              >
                <FaShieldAlt className="w-4 h-4 text-green-500" />
                <span className="text-gray-300 text-sm">{badge}</span>
              </motion.div>
            ))}
          </div>
        </Fade>
      </div>

      {/* Add custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
};

export default MerchantandCustomer;
