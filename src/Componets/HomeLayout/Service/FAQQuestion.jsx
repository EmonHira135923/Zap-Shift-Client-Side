import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaChevronUp,
  FaQuestionCircle,
  FaHeadset,
  FaBook,
  FaStar,
  FaLightbulb,
  FaShieldAlt,
  FaRocket,
  FaUsers,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Fade, Zoom, Slide } from "react-awesome-reveal";
import { TypeAnimation } from "react-type-animation";
import Tilt from "react-parallax-tilt";
import CountUp from "react-countup";

const FAQQuestion = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    { name: "General", icon: <FaRocket />, count: 3 },
    { name: "Security", icon: <FaShieldAlt />, count: 2 },
    { name: "Integration", icon: <FaUsers />, count: 4 },
    { name: "Billing", icon: <FaStar />, count: 3 },
    { name: "Support", icon: <FaHeadset />, count: 2 },
  ];

  const faqData = [
    {
      question: "What is ZapShift and how does it work?",
      answer:
        "ZapShift is an innovative platform that revolutionizes the way businesses manage their workflow. It uses AI-powered automation to streamline processes, increase productivity, and reduce manual tasks.",
      category: "General",
      tags: ["getting-started", "basics"],
      rating: 4.9,
      votes: 128,
    },
    {
      question: "How secure is my data on ZapShift?",
      answer:
        "We use enterprise-grade encryption, regular security audits, and comply with international data protection regulations. Your data is stored on secure servers with multiple layers of protection.",
      category: "Security",
      tags: ["security", "privacy", "encryption"],
      rating: 4.8,
      votes: 95,
    },
    {
      question: "Can I integrate ZapShift with other tools?",
      answer:
        "Yes! ZapShift offers seamless integration with over 100+ popular tools including Slack, Google Workspace, Microsoft Office 365, Salesforce, and many more through our API.",
      category: "Integration",
      tags: ["api", "integration", "connectivity"],
      rating: 4.7,
      votes: 112,
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We offer 24/7 customer support via chat, email, and phone. Plus, we have an extensive knowledge base, video tutorials, and regular webinars to help you get the most out of ZapShift.",
      category: "Support",
      tags: ["support", "help", "resources"],
      rating: 4.9,
      votes: 156,
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, we offer a 14-day free trial with full access to all features. No credit card required to start. You can upgrade to a paid plan at any time during or after your trial.",
      category: "Billing",
      tags: ["pricing", "trial", "subscription"],
      rating: 4.6,
      votes: 87,
    },
    {
      question: "How does pricing work?",
      answer:
        "We offer flexible pricing plans based on the number of users and features needed. All plans include regular updates, security patches, and customer support.",
      category: "Billing",
      tags: ["pricing", "plans", "billing"],
      rating: 4.5,
      votes: 74,
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Absolutely! You can cancel your subscription at any time. We offer prorated refunds for annual plans and no questions asked cancellation for monthly plans.",
      category: "Billing",
      tags: ["cancellation", "refund", "subscription"],
      rating: 4.7,
      votes: 63,
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer:
        "Yes, we provide custom enterprise solutions with dedicated support, custom integrations, and tailored features. Contact our sales team for a personalized demo.",
      category: "General",
      tags: ["enterprise", "custom", "solutions"],
      rating: 4.8,
      votes: 42,
    },
  ];

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const stats = [
    { label: "Happy Customers", value: 15000, suffix: "+", icon: <FaStar /> },
    {
      label: "Questions Answered",
      value: 2500,
      suffix: "+",
      icon: <FaLightbulb />,
    },
    { label: "Support Rating", value: 4.9, suffix: "/5", icon: <FaHeadset /> },
    {
      label: "Integration Partners",
      value: 120,
      suffix: "+",
      icon: <FaUsers />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <Fade triggerOnce>
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10}>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50"></div>
                  <FaQuestionCircle className="relative text-6xl text-white" />
                </div>
              </Tilt>
            </div>

            <TypeAnimation
              sequence={[
                "Frequently Asked Questions",
                1500,
                "Find Answers Instantly",
                1500,
                "Knowledge Base",
                1500,
                "FAQ Center",
                1500,
              ]}
              wrapper="h1"
              speed={40}
              repeat={Infinity}
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4"
            />

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Everything you need to know about ZapShift. Can't find what you're
              looking for? Reach out to our support team.
            </p>

            {/* Stats Section */}
            <Slide triggerOnce direction="up" cascade damping={0.1}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl">
                        {stat.icon}
                      </div>
                      <div className="text-left">
                        <div className="text-3xl font-bold text-white">
                          <CountUp
                            start={0}
                            end={stat.value}
                            duration={2.5}
                            decimals={stat.value % 1 !== 0 ? 1 : 0}
                            suffix={stat.suffix}
                          />
                        </div>
                        <p className="text-gray-400 text-sm">{stat.label}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Slide>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                <input
                  type="text"
                  placeholder="Search questions, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {faqCategories.map((category, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-blue-500/50 hover:bg-gray-800 transition-all duration-300 group"
                >
                  <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
                    {category.icon}
                  </span>
                  <span className="text-white font-medium">
                    {category.name}
                  </span>
                  <span className="text-gray-400 text-sm">
                    ({category.count})
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="grid gap-6 max-w-4xl mx-auto">
            {filteredFaqs.map((item, index) => (
              <Zoom key={index} triggerOnce delay={index * 50}>
                <motion.div
                  className="bg-gray-800/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 pr-6">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/30">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(item.rating)
                                    ? "text-yellow-400"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-gray-400 ml-1">
                              ({item.votes})
                            </span>
                          </div>
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                          {item.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: activeIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 ml-4 p-2 bg-gray-700/50 rounded-lg group-hover:bg-gray-700 transition-colors"
                      >
                        {activeIndex === index ? (
                          <FaChevronUp className="w-5 h-5 text-blue-400" />
                        ) : (
                          <FaChevronDown className="w-5 h-5 text-gray-400 group-hover:text-blue-300 transition-colors" />
                        )}
                      </motion.div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {item.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-gray-900/50 text-gray-300 text-xs rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-gray-700/50">
                          <p className="text-gray-300 leading-relaxed">
                            {item.answer}
                          </p>
                          <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                            <span>Was this helpful?</span>
                            <div className="flex gap-2">
                              <button className="px-3 py-1 bg-gray-700/50 hover:bg-green-500/20 text-green-400 rounded-lg transition-colors">
                                Yes
                              </button>
                              <button className="px-3 py-1 bg-gray-700/50 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                                No
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Zoom>
            ))}
          </div>

          {/* Contact CTA */}
          <Slide triggerOnce direction="up">
            <div className="mt-16">
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 max-w-3xl mx-auto border border-gray-700/50 shadow-2xl">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-6">
                    <FaHeadset className="text-3xl text-white" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Still have questions?
                  </h2>
                  <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                    Our expert support team is available 24/7 to help you get
                    the most out of ZapShift.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-3 group"
                    >
                      <FaHeadset className="group-hover:animate-pulse" />
                      Contact Support
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gray-800/70 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-gray-800 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 flex items-center gap-3 group"
                    >
                      <FaBook className="group-hover:text-blue-400 transition-colors" />
                      View Documentation
                    </motion.button>
                  </div>
                  <div className="mt-8 text-gray-400 text-sm">
                    <p>
                      Average response time:{" "}
                      <span className="text-green-400">Under 2 minutes</span>
                    </p>
                    <p className="mt-1">
                      Customer satisfaction:{" "}
                      <span className="text-yellow-400">98% positive</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Slide>

          {/* Quick Links */}
          <Fade triggerOnce delay={500}>
            <div className="mt-12 text-center">
              <p className="text-gray-400 mb-4">Quick Links</p>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "API Documentation",
                  "Release Notes",
                  "Community Forum",
                ].map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:underline"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </Fade>
    </div>
  );
};

export default FAQQuestion;
