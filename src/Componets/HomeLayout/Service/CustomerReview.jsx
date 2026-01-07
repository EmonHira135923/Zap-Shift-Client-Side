import React, { useState, useEffect, useRef } from "react";
import {
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaRegCheckCircle,
  FaThumbsUp,
  FaShippingFast,
  FaHeadset,
  FaAward,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";
import Tilt from "react-parallax-tilt";
import { Fade, Zoom, Slide } from "react-awesome-reveal";

const CustomerReview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Royal Aherned",
      position: "CEO",
      rating: 5,
      content:
        "A picture monitor works by providing support and gentle alignment for your business. Look out where management is to provide the proper position throughout this day.",
      avatar: "RA",
      color: "bg-gradient-to-r from-blue-100 to-blue-200",
      textColor: "text-blue-600",
      company: "TechCorp Inc.",
      date: "2 days ago",
      verified: true,
    },
    {
      id: 2,
      name: "Aruba Uddin",
      position: "Senior Product Designer",
      rating: 5,
      content:
        "A picture monitor works by providing support and gentle alignment for your business. Look out where management is to provide the proper position throughout this day.",
      avatar: "AU",
      color: "bg-gradient-to-r from-purple-100 to-purple-200",
      textColor: "text-purple-600",
      company: "DesignHub",
      date: "1 week ago",
      verified: true,
    },
    {
      id: 3,
      name: "Naur Uddin",
      position: "CEO",
      rating: 5,
      content:
        "A point-corrects-warning recording report and gentle alignment for your disabled back, encourage working to take interaction paper products throughout this day.",
      avatar: "NU",
      color: "bg-gradient-to-r from-green-100 to-green-200",
      textColor: "text-green-600",
      company: "StartupXYZ",
      date: "3 days ago",
      verified: true,
    },
    {
      id: 4,
      name: "Sarah Johnson",
      position: "Marketing Director",
      rating: 4,
      content:
        "Excellent service! The delivery was faster than expected and the tracking system kept me updated every step of the way. Highly recommended!",
      avatar: "SJ",
      color: "bg-gradient-to-r from-pink-100 to-pink-200",
      textColor: "text-pink-600",
      company: "MarketPro",
      date: "2 weeks ago",
      verified: true,
    },
    {
      id: 5,
      name: "Michael Chen",
      position: "Operations Manager",
      rating: 5,
      content:
        "Reliable and professional service. Their nationwide delivery network has helped us expand our business reach significantly.",
      avatar: "MC",
      color: "bg-gradient-to-r from-orange-100 to-orange-200",
      textColor: "text-orange-600",
      company: "Logistics Pro",
      date: "1 month ago",
      verified: true,
    },
    {
      id: 6,
      name: "Emma Wilson",
      position: "E-commerce Business Owner",
      rating: 5,
      content:
        "The cash on delivery service has boosted our sales by 40%. Customers trust their payment system and delivery reliability.",
      avatar: "EW",
      color: "bg-gradient-to-r from-indigo-100 to-indigo-200",
      textColor: "text-indigo-600",
      company: "ShopEasy",
      date: "5 days ago",
      verified: true,
    },
  ];

  const testimonials = [
    {
      icon: <FaShippingFast className="w-8 h-8" />,
      title: "Fast Delivery",
      count: "99",
      suffix: "%",
      description: "On-time delivery rate",
    },
    {
      icon: <FaThumbsUp className="w-8 h-8" />,
      title: "Customer Satisfaction",
      count: "1000",
      suffix: "+",
      description: "Happy customers",
    },
    {
      icon: <FaHeadset className="w-8 h-8" />,
      title: "Support",
      count: "24/7",
      suffix: "",
      description: "Customer support",
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: "Rating",
      count: "4.9",
      suffix: "/5",
      description: "Average rating",
    },
  ];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setCurrentIndex(index);
  };

  const filteredReviews =
    activeTab === "all"
      ? reviews
      : reviews.filter((review) => review.rating === 5);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with TypeAnimation */}
        <div className="text-center mb-16">
          <Fade direction="down" duration={800} triggerOnce>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              What our{" "}
              <TypeAnimation
                sequence={[
                  "customers",
                  2000,
                  "clients",
                  2000,
                  "partners",
                  2000,
                ]}
                speed={50}
                repeat={Infinity}
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
              />{" "}
              are saying
            </h1>
          </Fade>

          <Slide direction="up" duration={800} triggerOnce>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Universe positive, monthly, not well-being-effortlessly with
              Private Pro. Achieve proper alignment, refute frustration, and
              strengthen true best with users.
            </p>
          </Slide>
        </div>

        {/* Statistics with CountUp */}
        <div ref={statsRef} className="mb-16">
          <Zoom triggerOnce>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {testimonials.map((stat, index) => (
                <Tilt
                  key={index}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  scale={1.05}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 text-center">
                    <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-100 to-blue-50 text-blue-600 mb-4">
                      {stat.icon}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">
                      {isVisible ? (
                        <CountUp
                          start={0}
                          end={
                            stat.title === "Support"
                              ? 0
                              : parseFloat(stat.count)
                          }
                          suffix={stat.suffix}
                          duration={2.5}
                          decimals={stat.count.includes(".") ? 1 : 0}
                        />
                      ) : (
                        `0${stat.suffix}`
                      )}
                      {stat.title === "Support" && stat.count}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-1">
                      {stat.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{stat.description}</p>
                  </div>
                </Tilt>
              ))}
            </div>
          </Zoom>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          {["all", "5star", "verified"].map((tab) => (
            <motion.button
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {tab === "all" && "All Reviews"}
              {tab === "5star" && "⭐ 5-Star Reviews"}
              {tab === "verified" && "✓ Verified"}
            </motion.button>
          ))}
        </div>

        {/* Review Cards with Tilt Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Fade direction="up" cascade duration={600} triggerOnce>
            {filteredReviews.map((review) => (
              <Tilt
                key={review.id}
                tiltMaxAngleX={8}
                tiltMaxAngleY={8}
                scale={1.03}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="#ffffff"
                glarePosition="all"
                transitionSpeed={1000}
              >
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full"
                >
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <FaQuoteLeft className="text-4xl text-blue-100" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-5 h-5 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-600">
                      {review.rating}.0
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 mb-6 italic leading-relaxed">
                    "{review.content}"
                  </p>

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                    <div
                      className={`${review.color} w-14 h-14 rounded-2xl flex items-center justify-center`}
                    >
                      <span className={`text-xl font-bold ${review.textColor}`}>
                        {review.avatar}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-800">
                          {review.name}
                        </h4>
                        {review.verified && (
                          <FaRegCheckCircle className="text-green-500" />
                        )}
                      </div>
                      <p className="text-gray-600 text-sm">{review.position}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        {review.company} • {review.date}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </Fade>
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden mb-12">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.02}>
                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                    <FaQuoteLeft className="text-3xl text-blue-100 mb-4" />
                    <p className="text-gray-600 mb-6 italic">
                      "{reviews[currentIndex].content}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className={`${reviews[currentIndex].color} w-12 h-12 rounded-xl flex items-center justify-center`}
                      >
                        <span
                          className={`font-bold ${reviews[currentIndex].textColor}`}
                        >
                          {reviews[currentIndex].avatar}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-800">
                            {reviews[currentIndex].name}
                          </h4>
                          <FaRegCheckCircle className="text-green-500" />
                        </div>
                        <p className="text-gray-600 text-sm">
                          {reviews[currentIndex].position}
                        </p>
                        <div className="flex text-yellow-500 mt-1">
                          {[...Array(reviews[currentIndex].rating)].map(
                            (_, i) => (
                              <FaStar key={i} className="w-4 h-4" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevReview}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg"
            >
              <FaChevronLeft className="text-gray-600" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextReview}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg"
            >
              <FaChevronRight className="text-gray-600" />
            </motion.button>

            {/* Dots */}
            <div className="flex justify-center mt-6 gap-2">
              {reviews.slice(0, 5).map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => goToReview(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 w-6"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Animated Counter Section */}
        <Fade direction="up" duration={1000} triggerOnce>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-16 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
              <div className="bg-white rounded-full w-full h-full"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
                Our Impact in Numbers
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { number: 1000, suffix: "+", label: "Happy Customers" },
                  { number: 99, suffix: "%", label: "Satisfaction Rate" },
                  { number: 5000, suffix: "+", label: "Deliveries Monthly" },
                  { number: 50, suffix: "+", label: "Cities Covered" },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                      {isVisible ? (
                        <CountUp
                          start={0}
                          end={stat.number}
                          suffix={stat.suffix}
                          duration={3}
                          separator=","
                        />
                      ) : (
                        `0${stat.suffix}`
                      )}
                    </div>
                    <div className="text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fade>

        {/* CTA Section */}
        <Zoom duration={1000} triggerOnce>
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Join Our Happy Community
              </h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Share your experience and help others make the right choice
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Write a Review
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl border border-blue-200 transition-all duration-300"
                >
                  View All Testimonials
                </motion.button>
              </div>
            </div>
          </div>
        </Zoom>
      </div>
    </section>
  );
};

export default CustomerReview;
