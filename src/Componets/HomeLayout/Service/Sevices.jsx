import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  ShieldCheck,
  Headphones,
  MapPin,
  Clock,
  Package,
  Zap,
  Globe,
  Shield,
  Users,
  ArrowRight,
  CheckCircle,
  Sparkles,
  BarChart3,
  Wifi,
  Lock,
  MessageSquare,
} from "lucide-react";
import { FaStar, FaRocket } from "react-icons/fa";
import { FiRadio } from "react-icons/fi";
import Tilt from "react-parallax-tilt";

const Services = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [activeService, setActiveService] = useState(1);

  const services = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      description:
        "Monitor your shipments in real-time with our advanced GPS tracking system. Get instant updates, route visualization, and predictive ETA for complete transparency.",
      icon: <Wifi className="w-8 h-8" />,
      color: "from-cyan-500 to-blue-500",
      gradient:
        "bg-gradient-to-br from-cyan-500/20 via-blue-500/10 to-indigo-500/5",
      borderColor: "border-cyan-500/30",
      features: [
        "Real-time GPS Tracking",
        "Route Optimization",
        "Predictive ETA",
        "Instant Notifications",
        "Multi-stop Tracking",
        "Geofencing Alerts",
      ],
      stats: { value: 99.8, unit: "%", label: "Tracking Accuracy" },
      animation: "pulse",
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      description:
        "Your parcels are protected with military-grade encryption and secure handling protocols. We ensure damage-free delivery with comprehensive insurance coverage.",
      icon: <Lock className="w-8 h-8" />,
      color: "from-emerald-500 to-green-500",
      gradient:
        "bg-gradient-to-br from-emerald-500/20 via-green-500/10 to-teal-500/5",
      borderColor: "border-emerald-500/30",
      features: [
        "Secure Packaging",
        "Insurance Coverage",
        "Signature Confirmation",
        "Damage Protection",
        "Temperature Control",
        "Chain of Custody",
      ],
      stats: { value: 100, unit: "%", label: "Safety Guarantee" },
      animation: "bounce",
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      description:
        "Round-the-clock dedicated support team with AI-powered assistance. Get instant resolution in multiple languages with escalation management.",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "from-violet-500 to-purple-500",
      gradient:
        "bg-gradient-to-br from-violet-500/20 via-purple-500/10 to-pink-500/5",
      borderColor: "border-violet-500/30",
      features: [
        "Instant Response",
        "Multi-language Support",
        "AI Chat Assistant",
        "Escalation Management",
        "Customer Feedback",
        "Proactive Updates",
      ],
      stats: { value: 2, unit: "min", label: "Avg Response Time" },
      animation: "spin",
    },
    {
      id: 4,
      title: "Advanced Analytics",
      description:
        "Comprehensive analytics dashboard with actionable insights. Monitor delivery performance, optimize routes, and make data-driven decisions.",
      icon: <BarChart3 className="w-8 h-8" />,
      color: "from-orange-500 to-amber-500",
      gradient:
        "bg-gradient-to-br from-orange-500/20 via-amber-500/10 to-yellow-500/5",
      borderColor: "border-orange-500/30",
      features: [
        "Performance Analytics",
        "Route Optimization",
        "Cost Analysis",
        "Delivery Insights",
        "Trend Forecasting",
        "Custom Reports",
      ],
      stats: { value: 40, unit: "%", label: "Cost Reduction" },
      animation: "wave",
    },
  ];

  const additionalFeatures = [
    {
      id: 1,
      title: "Global Coverage",
      description: "1500+ cities across 50+ countries",
      icon: <Globe className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      count: "1500+",
    },
    {
      id: 2,
      title: "Fast Delivery",
      description: "Same-day & next-day delivery options",
      icon: <Zap className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      count: "2-hour",
    },
    {
      id: 3,
      title: "Trusted Network",
      description: "5000+ verified delivery partners",
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      count: "5000+",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
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

  const ServiceCard = ({ service }) => (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      scale={1.02}
      glareEnable={true}
      glareMaxOpacity={0.1}
      glareColor="#ffffff"
      glarePosition="all"
    >
      <motion.div
        initial="rest"
        animate={hoveredCard === service.id ? "hover" : "rest"}
        whileHover="hover"
        onHoverStart={() => setHoveredCard(service.id)}
        onHoverEnd={() => setHoveredCard(null)}
        className="relative h-full"
      >
        <motion.div
          variants={{
            rest: { scale: 1, y: 0 },
            hover: { scale: 1.02, y: -8 },
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative h-full ${service.gradient} rounded-3xl p-8 border-2 ${service.borderColor} backdrop-blur-sm overflow-hidden group`}
        >
          {/* Background Glow Effect */}
          <motion.div
            variants={{
              rest: { opacity: 0 },
              hover: { opacity: 1 },
            }}
            className="absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), ${service.color.replace("from-", "").replace("to-", "").split(" ")[0]}20, transparent 40%)`,
            }}
          />

          {/* Animated Border */}
          <div className="absolute inset-0 rounded-3xl p-[2px]">
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
            />
          </div>

          {/* Service Header */}
          <div className="relative z-10 flex items-start justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                animate={hoveredCard === service.id ? { rotate: 360 } : {}}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className={`p-4 rounded-2xl bg-gradient-to-r ${service.color} text-white shadow-lg`}
              >
                {service.icon}
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {service.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className="w-4 h-4 text-yellow-500 fill-current"
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm">4.9/5 rating</span>
                </div>
              </div>
            </div>
            <motion.div
              animate={hoveredCard === service.id ? { scale: 1.1 } : {}}
              className="text-right"
            >
              <div className="text-3xl font-bold text-white">
                {service.stats.value}
                <span className="text-lg">{service.stats.unit}</span>
              </div>
              <div className="text-gray-400 text-sm">{service.stats.label}</div>
            </motion.div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-8 leading-relaxed relative z-10">
            {service.description}
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8 relative z-10">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-2 p-3 bg-gray-900/50 rounded-lg hover:bg-gray-800/50 transition-colors duration-300"
              >
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full py-3 px-4 rounded-xl bg-gradient-to-r ${service.color} text-white font-semibold backdrop-blur-sm border ${service.borderColor} hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group`}
          >
            <span>Explore Service</span>
            <motion.span
              animate={hoveredCard === service.id ? { x: 5 } : {}}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.span>
          </motion.button>

          {/* Animated Particles */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -100],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
                className="absolute w-[2px] h-[2px] bg-white rounded-full"
                style={{
                  left: `${20 + i * 30}%`,
                  bottom: "0",
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Tilt>
  );

  return (
    <section className="relative min-h-screen py-20 bg-gradient-to-b from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_1px,transparent_1px),linear-gradient(#000_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float-slow">
        <Sparkles className="w-6 h-6 text-cyan-500 opacity-50" />
      </div>
      <div className="absolute bottom-40 right-20 animate-float">
        <Zap className="w-8 h-8 text-blue-500 opacity-50" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-gray-800 mb-8">
              <FaRocket className="text-cyan-500 animate-pulse" />
              <span className="text-cyan-400 font-semibold">
                Premium Delivery Solutions
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
              Enterprise-Grade{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Logistics Services
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transform your delivery experience with our comprehensive suite of
              advanced logistics solutions powered by cutting-edge technology.
            </p>
          </motion.div>
        </div>

        {/* Service Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {services.map((service) => (
            <motion.button
              key={service.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveService(service.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm ${
                activeService === service.id
                  ? `bg-gradient-to-r ${service.color} text-white shadow-lg`
                  : "bg-gray-900/50 text-gray-400 hover:text-white border border-gray-800"
              }`}
            >
              {service.icon}
              {service.title}
            </motion.button>
          ))}
        </div>

        {/* Main Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className="lg:col-span-1"
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-gray-800 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {additionalFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="relative group"
                >
                  <div className="relative bg-gray-900/30 rounded-2xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-500 overflow-hidden">
                    {/* Background Glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    <div className="relative z-10 text-center">
                      <div
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white mb-6`}
                      >
                        {feature.icon}
                      </div>
                      <div className="text-3xl font-bold text-white mb-2">
                        {feature.count}
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {[
            {
              label: "ISO 27001 Certified",
              color: "from-green-500 to-emerald-500",
            },
            { label: "GDPR Compliant", color: "from-blue-500 to-cyan-500" },
            {
              label: "24/7 SOC2 Monitoring",
              color: "from-purple-500 to-pink-500",
            },
            { label: "Enterprise SLA", color: "from-orange-500 to-amber-500" },
          ].map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`px-4 py-2 bg-gradient-to-r ${badge.color} bg-opacity-10 backdrop-blur-sm rounded-xl border border-gray-800`}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span className="text-gray-300 text-sm font-medium">
                  {badge.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="relative inline-block">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold py-4 px-12 rounded-2xl text-lg shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              <Truck className="w-5 h-5" />
              <span>Start Your Premium Delivery</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
          <p className="text-gray-500 mt-6 flex items-center justify-center gap-2">
            <Users className="w-4 h-4" />
            Trusted by 50,000+ enterprise customers worldwide
          </p>
        </motion.div>
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
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Services;
