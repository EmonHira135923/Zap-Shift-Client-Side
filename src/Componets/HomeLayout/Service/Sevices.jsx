import React from "react";
import { motion } from "framer-motion";
import {
  Truck,
  ShieldCheck,
  Headphones,
  MapPin,
  Clock,
  Package,
} from "lucide-react";

const Services = () => {
  const services = [
    {
      id: 1,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking location. From pick-up to delivery, monitor your shipment progress and get real-time status updates for complete peace of mind.",
      icon: <Truck className="w-8 h-8" />,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      features: [
        "Real-time GPS Tracking",
        "Route Optimization",
        "Delivery ETA",
        "Instant Notifications",
      ],
    },
    {
      id: 2,
      title: "100% Safe Delivery",
      description:
        "We ensure your parcels are handled safely with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      features: [
        "Secure Packaging",
        "Insurance Coverage",
        "Signature Confirmation",
        "Damage Protection",
      ],
    },
    {
      id: 3,
      title: "24/7 Call Center Support",
      description:
        "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery issues—anything you need to ensure smooth delivery experience.",
      icon: <Headphones className="w-8 h-8" />,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      features: [
        "Instant Response",
        "Multi-language Support",
        "Escalation Management",
        "Customer Feedback",
      ],
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

  const cardHoverVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const iconVariants = {
    rest: { rotate: 0 },
    hover: {
      rotate: 360,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
            Premium <span className="text-blue-600">Delivery Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience seamless parcel delivery with our comprehensive service
            solutions designed for your convenience.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-20"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="relative"
            >
              <motion.div
                variants={cardHoverVariants}
                className={`relative h-full ${service.bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200 overflow-hidden`}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <div
                    className={`bg-gradient-to-br ${service.color} rounded-full w-full h-full`}
                  ></div>
                </div>

                {/* Icon */}
                <motion.div
                  variants={iconVariants}
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.color} text-white shadow-lg mb-6`}
                >
                  {service.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-8">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}
                      ></div>
                      <span className="text-gray-700 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Learn More Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 px-4 rounded-xl bg-white text-gray-800 font-semibold border border-gray-300 hover:border-transparent transition-all duration-300 flex items-center justify-center gap-2 group`}
                >
                  <span>Learn More</span>
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    →
                  </motion.span>
                </motion.button>

                {/* Decorative Line */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${service.color} rounded-b-3xl`}
                ></div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 lg:p-12 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-blue-100 text-blue-600 mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Wide Coverage
              </h4>
              <p className="text-gray-600">
                Delivery across 500+ cities nationwide
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-green-100 text-green-600 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Fast Delivery
              </h4>
              <p className="text-gray-600">
                Same-day & next-day delivery options
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="inline-flex p-4 rounded-2xl bg-purple-100 text-purple-600 mb-4">
                <Package className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">
                Secure Handling
              </h4>
              <p className="text-gray-600">
                Professional packaging and handling
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-12 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            Start Your Delivery Today
          </motion.button>
          <p className="text-gray-500 mt-4">Join 50,000+ satisfied customers</p>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
