import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Truck,
  Clock,
  Globe,
  Shield,
  DollarSign,
  Building,
  RefreshCw,
  Zap,
  Package,
  MapPin,
  Users,
  Award,
  TrendingUp,
  Rocket,
  Sparkles,
  Target,
  BarChart3,
  Cloud,
  Cpu,
  ShieldCheck,
  Zap as ZapIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const OurService = () => {
  const sectionRef = useRef(null);

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: "ease-out-cubic",
    });
  }, []);

  // Intersection observer for animations
  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: servicesRef, inView: servicesInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const services = [
    {
      id: 1,
      title: "Express & Standard Delivery",
      description:
        "Door to door product delivery within 40-72 hours in major cities. Express delivery available in Dhaka within 4-6 hours from pickup to delivery.",
      icon: <Clock className="w-8 h-8" />,
      stats: 24,
      unit: "Hours",
      gradient: "from-cyan-500 to-blue-600",
      color: "text-cyan-400",
      bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-cyan-900/20",
      border: "border-cyan-500/30",
      features: ["Real-time Tracking", "Instant Updates", "Secure Handling"],
      delay: 100,
    },
    {
      id: 2,
      title: "Nationwide Delivery",
      description:
        "Door to door product nationwide with home delivery. We deliver your product to customers within 40-72 hours across the country.",
      icon: <Globe className="w-8 h-8" />,
      stats: 64,
      unit: "Districts",
      gradient: "from-emerald-500 to-green-600",
      color: "text-emerald-400",
      bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900/20",
      border: "border-emerald-500/30",
      features: ["Pan-Bangladesh", "Remote Areas", "Custom Routes"],
      delay: 200,
    },
    {
      id: 3,
      title: "Fulfillment Solution",
      description:
        "Customized services with inventory management support, online order processing, packaging, and 24/7 client support.",
      icon: <Shield className="w-8 h-8" />,
      stats: 99.9,
      unit: "% Uptime",
      gradient: "from-purple-500 to-violet-600",
      color: "text-purple-400",
      bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20",
      border: "border-purple-500/30",
      features: ["24/7 Support", "API Integration", "Advanced Analytics"],
      delay: 300,
    },
    {
      id: 4,
      title: "Cash on Delivery",
      description:
        "100% cash on delivery operations in Bangladesh with guaranteed safety of your product and secure payment collection.",
      icon: <DollarSign className="w-8 h-8" />,
      stats: 100,
      unit: "% Secure",
      gradient: "from-yellow-500 to-amber-600",
      color: "text-yellow-400",
      bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-yellow-900/20",
      border: "border-yellow-500/30",
      features: ["Secure Collection", "Instant Settlement", "Digital Receipts"],
      delay: 400,
    },
    {
      id: 5,
      title: "Corporate Logistics",
      description:
        "Customized corporate services including warehousing and inventory management support for businesses of all sizes.",
      icon: <Building className="w-8 h-8" />,
      stats: 5000,
      unit: "Clients",
      gradient: "from-indigo-500 to-blue-700",
      color: "text-indigo-400",
      bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900/20",
      border: "border-indigo-500/30",
      features: ["Enterprise Grade", "Dedicated Support", "Bulk Discounts"],
      delay: 500,
    },
    {
      id: 6,
      title: "Parcel Return",
      description:
        "Nationwide facility allowing customers to return or exchange products with our advanced online business mechanism.",
      icon: <RefreshCw className="w-8 h-8" />,
      stats: 30,
      unit: "Min Pickup",
      gradient: "from-rose-500 to-pink-600",
      color: "text-rose-400",
      bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-rose-900/20",
      border: "border-rose-500/30",
      features: ["Quick Processing", "No Hidden Fees", "Instant Refunds"],
      delay: 600,
    },
  ];

  const stats = [
    {
      label: "Deliveries Made",
      value: 2500000,
      icon: Package,
      prefix: "+",
      delay: 100,
    },
    {
      label: "Cities Covered",
      value: 64,
      icon: MapPin,
      suffix: "+",
      delay: 200,
    },
    {
      label: "Happy Clients",
      value: 50000,
      icon: Users,
      prefix: "+",
      delay: 300,
    },
    {
      label: "Years Experience",
      value: 10,
      icon: Award,
      suffix: "+",
      delay: 400,
    },
  ];

  const features = [
    { icon: <Target className="w-6 h-6" />, text: "Precision Tracking" },
    { icon: <BarChart3 className="w-6 h-6" />, text: "Advanced Analytics" },
    { icon: <Cloud className="w-6 h-6" />, text: "Cloud Integration" },
    { icon: <Cpu className="w-6 h-6" />, text: "AI Optimization" },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      text: "Military-grade Security",
    },
    { icon: <ZapIcon className="w-6 h-6" />, text: "Lightning Fast" },
  ];

  // Animation variants for Framer Motion
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
    <section
      ref={sectionRef}
      className="relative py-20 bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-100 overflow-hidden"
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>

        {/* Animated Grid */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"
          style={{
            animation: "gridMove 20s linear infinite",
          }}
        ></div>

        {/* Floating Particles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-400/30 rounded-full blur-sm"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 right-1/3 w-3 h-3 bg-purple-400/30 rounded-full blur-sm"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-emerald-400/30 rounded-full blur-sm"
          animate={{
            y: [0, -15, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Type Animation */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-aos="fade-up"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 backdrop-blur-sm border border-gray-700 mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">
              <TypeAnimation
                sequence={[
                  "Our Premium Services",
                  2000,
                  "Next-Gen Logistics",
                  2000,
                  "Smart Delivery Solutions",
                  2000,
                ]}
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Deliver
            </span>{" "}
            <TypeAnimation
              sequence={[
                "Excellence",
                2000,
                "Speed",
                2000,
                "Reliability",
                2000,
                "Innovation",
                2000,
              ]}
              speed={50}
              repeat={Infinity}
              cursor={true}
              className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent"
            />
          </h2>

          <p
            className="text-lg text-gray-400 max-w-3xl mx-auto mb-12"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            From express deliveries to comprehensive logistics solutions —
            experience the future of parcel delivery with cutting-edge
            technology and unparalleled reliability.
          </p>
        </motion.div>

        {/* Animated Stats Counter */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-4xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100"></div>
              <div className="relative text-center p-6 rounded-2xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 group-hover:border-cyan-500/50 transition-all duration-300">
                <motion.div
                  className="flex justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 group-hover:from-cyan-900/30 group-hover:to-blue-900/30 group-hover:border-cyan-500/50 transition-all duration-300">
                    <stat.icon className="w-6 h-6 text-cyan-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {statsInView ? (
                    <CountUp
                      start={0}
                      end={stat.value}
                      duration={2.5}
                      separator=","
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix || ""}
                      decimals={0}
                      delay={stat.delay / 1000}
                    />
                  ) : (
                    "0" + (stat.suffix || "")
                  )}
                </div>
                <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Services Grid with Staggered Animations */}
        <div ref={servicesRef}>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20"
            variants={containerVariants}
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                data-aos="fade-up"
                data-aos-delay={service.delay}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 },
                }}
                className="relative group"
              >
                {/* Animated Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>

                {/* Service Card */}
                <div
                  className="relative rounded-2xl p-6 backdrop-blur-sm shadow-xl overflow-hidden h-full border border-gray-700/50 group-hover:border-cyan-500/50 transition-all duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(17,24,39,0.7) 100%)",
                  }}
                >
                  {/* Floating Icon Animation */}
                  <motion.div
                    className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      backgroundColor: service.color
                        .replace("text-", "")
                        .split("-")[0],
                    }}
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Service Header */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        className="p-3 rounded-xl shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${service.gradient.split(" ")[1]}, ${service.gradient.split(" ")[3]})`,
                        }}
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {service.icon}
                      </motion.div>

                      {/* Animated Counter */}
                      <div className="text-right">
                        <div className={`text-3xl font-bold ${service.color}`}>
                          {servicesInView ? (
                            <CountUp
                              start={0}
                              end={service.stats}
                              duration={2}
                              suffix={service.unit?.startsWith("%") ? "%" : ""}
                              prefix={service.unit?.includes("Min") ? "" : ""}
                              decimals={service.unit?.startsWith("%") ? 1 : 0}
                            />
                          ) : (
                            "0" + (service.unit?.startsWith("%") ? "%" : "")
                          )}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {service.unit}
                        </div>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-100 mb-4 group-hover:text-white transition-colors duration-300">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="mb-6">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2 mb-2 text-sm text-gray-300 group-hover:text-gray-100 transition-colors duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                        >
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                          {feature}
                        </motion.div>
                      ))}
                    </div>

                    {/* Interactive Button */}
                    <motion.button
                      className="relative overflow-hidden group inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-semibold transition-all duration-300 w-full justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${service.gradient.split(" ")[1]}, ${service.gradient.split(" ")[3]})`,
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10">Learn More</span>
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <TrendingUp className="w-4 h-4 relative z-10" />
                      </motion.div>

                      {/* Button Glow Effect */}
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mb-16" data-aos="fade-up" data-aos-delay="400">
          <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Why Choose Us
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                className="text-center p-4 rounded-xl bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="inline-block p-3 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 mb-3 group-hover:from-cyan-900/30 group-hover:to-blue-900/30 transition-all duration-300">
                  {feature.icon}
                </div>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action with Advanced Animation */}
        <motion.div
          className="relative rounded-3xl overflow-hidden border border-gray-700 shadow-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(17,24,39,0.95) 0%, rgba(31,41,55,0.95) 100%)",
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          data-aos="fade-up"
          data-aos-delay="500"
        >
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-3xl p-[2px]">
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background:
                  "linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)",
                backgroundSize: "400% 400%",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>

          <div className="relative z-10 p-8 md:p-12 bg-gray-900/90 backdrop-blur-sm rounded-3xl m-[2px]">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Ready to Transform Your{" "}
                    <TypeAnimation
                      sequence={[
                        "Delivery Experience",
                        2000,
                        "Business Logistics",
                        2000,
                        "Supply Chain",
                        2000,
                      ]}
                      speed={50}
                      repeat={Infinity}
                      cursor={true}
                    />
                    ?
                  </span>
                </h3>

                <p className="text-gray-400 text-lg mb-6">
                  Join 50,000+ businesses already shipping smarter with our
                  platform
                </p>

                {/* Features List with Animation */}
                <motion.div
                  className="grid grid-cols-2 gap-4 mb-8"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {[
                    "Real-time Tracking",
                    "24/7 Support",
                    "API Integration",
                    "Advanced Analytics",
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-3"
                      variants={itemVariants}
                    >
                      <motion.div
                        className="w-2 h-2 bg-cyan-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.2,
                        }}
                      />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="relative overflow-hidden group px-8 py-4 text-white font-semibold rounded-xl text-lg shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Start Free Trial</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>

                <motion.button
                  className="px-8 py-4 border border-gray-700 text-gray-300 font-semibold rounded-xl text-lg"
                  style={{
                    background: "rgba(31, 41, 55, 0.5)",
                    backdropFilter: "blur(8px)",
                  }}
                  whileHover={{
                    borderColor: "#06b6d4",
                    color: "#fff",
                    scale: 1.05,
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  Schedule Demo
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(40px) translateX(40px);
          }
        }

        /* Custom scrollbar for dark theme */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #3b82f6);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0891b2, #2563eb);
        }

        /* Selection color */
        ::selection {
          background: rgba(6, 182, 212, 0.3);
          color: #ffffff;
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

export default OurService;
