import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const About = () => {
  const [activeTab, setActiveTab] = useState("story");

  const tabs = [
    { id: "story", label: "Story" },
    { id: "mission", label: "Mission" },
    { id: "success", label: "Success" },
    { id: "team", label: "Team & Others" },
  ];

  const content = {
    story:
      "We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.",
    mission:
      "Our mission is to revolutionize the delivery industry by combining cutting-edge technology with human touch. We believe in creating seamless experiences that connect people and businesses across distances, making the world a smaller and more accessible place.",
    success:
      "With over 1 million successful deliveries, partnerships with 500+ businesses, and a 99.8% customer satisfaction rate, we've proven that dedication to excellence makes a difference. Our success is measured not just in numbers, but in the smiles we deliver.",
    team: "Our team of 200+ dedicated professionals works around the clock to ensure your packages reach safely. From our customer service heroes to our logistics experts and delivery partners, every person plays a crucial role in our mission to deliver excellence.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-6xl sm:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            About Us
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg text-slate-400 max-w-3xl leading-relaxed"
          >
            Enjoy fast, reliable parcel delivery with real-time tracking and
            zero hassle. From personal packages to business shipments — we
            deliver on time, every time.
          </motion.p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-wrap gap-4 mb-12 border-b border-slate-800"
        >
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-4 text-lg font-semibold transition-colors duration-300 ${
                activeTab === tab.id
                  ? "text-blue-400"
                  : "text-slate-500 hover:text-slate-300"
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-sm border border-slate-800/50 rounded-2xl p-8 sm:p-12 shadow-2xl"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg prose-invert max-w-none"
            >
              <p className="text-slate-300 leading-relaxed text-lg">
                {content[activeTab]}
              </p>

              {/* Additional visual elements based on active tab */}
              {activeTab === "story" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 grid grid-cols-3 gap-6"
                >
                  {[
                    { number: "10+", label: "Years Experience" },
                    { number: "1M+", label: "Deliveries" },
                    { number: "99.8%", label: "Success Rate" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-slate-800/50 rounded-xl p-6 border border-slate-700/50 text-center"
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-sm text-slate-400 mt-2">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === "mission" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 flex items-center gap-4 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6"
                >
                  <div className="text-4xl">🚀</div>
                  <p className="text-slate-300 italic">
                    "Connecting the world, one delivery at a time."
                  </p>
                </motion.div>
              )}

              {activeTab === "success" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 grid grid-cols-2 gap-4"
                >
                  {[
                    { icon: "📦", text: "1M+ Packages Delivered" },
                    { icon: "🤝", text: "500+ Business Partners" },
                    { icon: "⭐", text: "99.8% Satisfaction" },
                    { icon: "🌍", text: "50+ Countries Served" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.05, x: 10 }}
                      className="flex items-center gap-3 bg-slate-800/30 rounded-lg p-4 border border-slate-700/30"
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-slate-300">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {activeTab === "team" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-8 flex flex-wrap gap-3"
                >
                  {[
                    "Customer Service",
                    "Logistics",
                    "Tech",
                    "Operations",
                    "Partners",
                  ].map((dept, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-slate-300 text-sm font-medium"
                    >
                      {dept}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Floating action button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="fixed bottom-8 right-8"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold shadow-2xl hover:shadow-blue-500/50 transition-shadow duration-300"
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
