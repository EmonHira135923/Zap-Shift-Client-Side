import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Package,
  CreditCard,
  Building,
  Users,
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  Shield,
  Truck,
  Zap,
  TrendingUp,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const HowItWorks = () => {
  const containerRef = useRef(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 100,
    });
  }, []);

  // Intersection observer for animations
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const features = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      description:
        "Schedule your delivery in seconds. Our platform provides real-time booking with instant confirmation and automated scheduling.",
      icon: <Package className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      gradient: "bg-gradient-to-br from-blue-900/20 to-cyan-900/20",
      border: "border-blue-500/30",
      details: [
        "Real-time scheduling",
        "Instant confirmation",
        "Flexible time slots",
        "Automated reminders",
      ],
      stats: "2 min",
      statsLabel: "Average Booking Time",
    },
    {
      id: 2,
      title: "Cash On Delivery",
      description:
        "Secure cash collection with digital receipts and instant settlement. 100% secure payment processing with advanced tracking.",
      icon: <CreditCard className="w-8 h-8" />,
      color: "from-emerald-500 to-green-500",
      gradient: "bg-gradient-to-br from-emerald-900/20 to-green-900/20",
      border: "border-emerald-500/30",
      details: [
        "Secure cash handling",
        "Digital receipts",
        "Instant settlement",
        "Fraud protection",
      ],
      stats: "99.9%",
      statsLabel: "Secure Transactions",
    },
    {
      id: 3,
      title: "Delivery Hub",
      description:
        "Smart routing and optimized delivery paths. Our AI-powered system ensures maximum efficiency and minimal delivery time.",
      icon: <Building className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      gradient: "bg-gradient-to-br from-purple-900/20 to-pink-900/20",
      border: "border-purple-500/30",
      details: [
        "AI-powered routing",
        "Real-time tracking",
        "Automated sorting",
        "Smart notifications",
      ],
      stats: "40-72 hrs",
      statsLabel: "Delivery Time",
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      description:
        "Enterprise-grade solutions with dedicated support. Custom logistics solutions tailored for businesses of all sizes.",
      icon: <Users className="w-8 h-8" />,
      color: "from-orange-500 to-amber-500",
      gradient: "bg-gradient-to-br from-orange-900/20 to-amber-900/20",
      border: "border-orange-500/30",
      details: [
        "Dedicated account manager",
        "Bulk processing",
        "API integration",
        "Custom reporting",
      ],
      stats: "5000+",
      statsLabel: "Business Clients",
    },
  ];

  const processSteps = [
    {
      step: 1,
      title: "Schedule",
      description: "Book your delivery online or via app",
      icon: Clock,
    },
    {
      step: 2,
      title: "Pickup",
      description: "We collect from your location",
      icon: MapPin,
    },
    {
      step: 3,
      title: "Process",
      description: "Smart sorting and routing",
      icon: Shield,
    },
    {
      step: 4,
      title: "Deliver",
      description: "Fast delivery to destination",
      icon: Truck,
    },
    {
      step: 5,
      title: "Complete",
      description: "Secure handover & payment",
      icon: CheckCircle,
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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

  const stepVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] dark:opacity-10 opacity-5"></div>

        {/* Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200 dark:border-blue-800 mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Simple & Efficient Process
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6">
            How It{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 bg-clip-text text-transparent">
              Works
            </span>
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Experience seamless delivery with our streamlined process designed
            for speed, reliability, and convenience.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="mb-20" data-aos="fade-up">
          <div className="relative">
            {/* Process Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 dark:from-blue-500/30 dark:via-purple-500/30 dark:to-emerald-500/30 transform -translate-y-1/2"></div>

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className="relative"
                  variants={stepVariants}
                  initial="hidden"
                  animate={sectionInView ? "visible" : "hidden"}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Step Card */}
                  <div className="relative group">
                    {/* Step Number */}
                    <motion.div
                      className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center font-bold text-lg shadow-lg z-20"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.step}
                    </motion.div>

                    {/* Step Content */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 group-hover:border-blue-300 dark:group-hover:border-blue-500">
                      {/* Icon Container */}
                      <div className="mb-4">
                        <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-600 dark:text-blue-400 shadow-sm">
                          <step.icon className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>

                    {/* Connector Arrow (Desktop) */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                        <ChevronRight className="w-6 h-6 text-gray-400 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300" />
                      </div>
                    )}
                  </div>

                  {/* Mobile Connector (Vertical) */}
                  {index % 2 === 0 && index < processSteps.length - 2 && (
                    <div className="lg:hidden block absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6">
                      <div className="w-0.5 h-6 bg-gradient-to-b from-blue-400/20 to-transparent"></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          data-aos="fade-up"
          data-aos-delay="200"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { type: "spring", stiffness: 300 },
              }}
              className="relative group"
            >
              {/* Glow Effect */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
              ></div>

              {/* Feature Card */}
              <div
                className={`relative rounded-2xl p-6 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 border ${feature.border} bg-white dark:bg-gray-800/50 h-full`}
              >
                {/* Animated Background */}
                <div
                  className={`absolute inset-0 rounded-2xl ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    {/* Icon */}
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>

                    {/* Stats */}
                    <div className="text-right">
                      <div className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                        {feature.stats}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {feature.statsLabel}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {feature.details.map((detail, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-2 text-sm"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">
                          {detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <motion.button
                    className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-300 group/btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span
                      className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent group-hover/btn:from-blue-600 group-hover/btn:to-cyan-500 transition-all duration-300`}
                    >
                      Learn More
                    </span>
                    <ArrowRight
                      className={`w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300`}
                      style={{
                        color: feature.color.includes("blue")
                          ? "#3b82f6"
                          : feature.color.includes("emerald")
                            ? "#10b981"
                            : feature.color.includes("purple")
                              ? "#8b5cf6"
                              : "#f97316",
                      }}
                    />
                  </motion.button>
                </div>

                {/* Animated Border Effect */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 ${feature.border} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "250K+", label: "Monthly Deliveries", icon: TrendingUp },
              { value: "98%", label: "On-time Rate", icon: Clock },
              { value: "4.9", label: "Customer Rating", icon: Sparkles },
              { value: "24/7", label: "Support Available", icon: Shield },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 mb-4">
                  <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            className="relative overflow-hidden group bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-4 px-8 rounded-xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Get Started Now</span>

            {/* Button Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />

            {/* Sparkle Effects */}
            <div className="absolute -top-1 -left-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.button>

          <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">
            Join{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              50,000+
            </span>{" "}
            satisfied customers worldwide
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            {[
              { text: "SSL Secured", color: "text-green-500" },
              { text: "PCI Compliant", color: "text-blue-500" },
              { text: "ISO Certified", color: "text-purple-500" },
              { text: "24/7 Support", color: "text-amber-500" },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <div
                  className={`w-2 h-2 rounded-full ${badge.color} bg-current`}
                ></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {badge.text}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        /* Custom scrollbar for dark theme */
        .dark ::-webkit-scrollbar {
          width: 8px;
        }

        .dark ::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
        }

        .dark ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #06b6d4);
          border-radius: 4px;
        }

        .dark ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #0891b2);
        }

        /* Smooth transitions */
        * {
          transition:
            background-color 0.3s ease,
            border-color 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
