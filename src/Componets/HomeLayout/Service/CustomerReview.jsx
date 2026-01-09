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
  FaHeart,
  FaPlay,
  FaPause,
  FaShareAlt,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaMapMarkerAlt,
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
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const statsRef = useRef(null);
  const intervalRef = useRef(null);
  const containerRef = useRef(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

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

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
      }, 4000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextReview();
    }
    if (isRightSwipe) {
      prevReview();
    }
  };

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Marketing Director",
      rating: 5,
      content:
        "ZapShift transformed our delivery operations. The real-time tracking and automated dispatch saved us 40% in logistics costs and improved customer satisfaction dramatically.",
      avatar: "SJ",
      color: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-400",
      company: "MarketPro Inc.",
      date: "2 days ago",
      verified: true,
      location: "New York, USA",
      videoReview: true,
      likes: 45,
      shares: 12,
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Operations Manager",
      rating: 4,
      content:
        "The integration capabilities are outstanding! We connected ZapShift with our existing CRM and ERP systems seamlessly. The API documentation is clear and the support team is responsive.",
      avatar: "MC",
      color: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-400",
      company: "Logistics Pro",
      date: "1 week ago",
      verified: true,
      location: "San Francisco, USA",
      videoReview: false,
      likes: 32,
      shares: 8,
    },
    {
      id: 3,
      name: "Emma Wilson",
      position: "E-commerce Business Owner",
      rating: 5,
      content:
        "As a small business owner, the cash on delivery feature has been a game-changer. Our sales increased by 60% in just 3 months! The dashboard analytics provide invaluable insights.",
      avatar: "EW",
      color: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
      textColor: "text-green-400",
      company: "ShopEasy",
      date: "3 days ago",
      verified: true,
      location: "London, UK",
      videoReview: true,
      likes: 67,
      shares: 15,
    },
    {
      id: 4,
      name: "David Park",
      position: "Supply Chain Director",
      rating: 5,
      content:
        "The predictive analytics feature accurately forecasts delivery times and optimizes routes. We've reduced fuel costs by 25% and improved delivery accuracy to 99.8%.",
      avatar: "DP",
      color: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      textColor: "text-orange-400",
      company: "Global Logistics",
      date: "2 weeks ago",
      verified: true,
      location: "Seoul, South Korea",
      videoReview: false,
      likes: 89,
      shares: 21,
    },
    {
      id: 5,
      name: "Lisa Rodriguez",
      position: "Retail Operations Head",
      rating: 4,
      content:
        "The mobile app for delivery personnel is incredibly intuitive. Training time reduced by 70% and error rates dropped significantly. The customer support is phenomenal!",
      avatar: "LR",
      color: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
      borderColor: "border-pink-500/30",
      textColor: "text-pink-400",
      company: "Urban Retail",
      date: "1 month ago",
      verified: true,
      location: "Madrid, Spain",
      videoReview: true,
      likes: 56,
      shares: 14,
    },
    {
      id: 6,
      name: "James Wilson",
      position: "CTO",
      rating: 5,
      content:
        "From a technical perspective, the platform's scalability and reliability are impressive. We've handled peak season volumes without any downtime. The security features are top-notch.",
      avatar: "JW",
      color: "bg-gradient-to-br from-indigo-500/20 to-violet-500/20",
      borderColor: "border-indigo-500/30",
      textColor: "text-indigo-400",
      company: "TechInnovate",
      date: "5 days ago",
      verified: true,
      location: "Toronto, Canada",
      videoReview: false,
      likes: 72,
      shares: 18,
    },
  ];

  const stats = [
    {
      icon: <FaShippingFast className="w-8 h-8" />,
      title: "Fast Delivery",
      count: "99.8",
      suffix: "%",
      description: "On-time delivery rate",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <FaThumbsUp className="w-8 h-8" />,
      title: "Customer Satisfaction",
      count: "10",
      suffix: "K+",
      description: "Happy customers worldwide",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <FaHeadset className="w-8 h-8" />,
      title: "Support Response",
      count: "2",
      suffix: "min",
      description: "Average response time",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <FaAward className="w-8 h-8" />,
      title: "Trust Score",
      count: "4.9",
      suffix: "/5",
      description: "Based on 15,000+ reviews",
      gradient: "from-orange-500 to-red-500",
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

  const toggleAutoplay = () => {
    setIsPlaying(!isPlaying);
  };

  const filteredReviews =
    activeTab === "all"
      ? reviews
      : activeTab === "5star"
        ? reviews.filter((review) => review.rating === 5)
        : reviews.filter((review) => review.videoReview);

  const visibleReviews = [
    ...filteredReviews.slice(currentIndex),
    ...filteredReviews.slice(0, currentIndex),
  ].slice(0, 3);

  const ReviewCard = ({ review, isActive, index }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{
        opacity: isActive ? 1 : 0.6,
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : 10,
      }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`relative rounded-3xl p-8 border-2 ${
        review.borderColor
      } backdrop-blur-sm transition-all duration-500 ${
        isActive
          ? "bg-gray-900/80 shadow-2xl z-10"
          : "bg-gray-900/40 shadow-lg z-0"
      }`}
      onClick={() => setSelectedReview(review)}
    >
      {/* Glow effect for active card */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-3xl blur-xl"></div>
      )}

      <div className="relative z-10">
        {/* Review Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div
              className={`${review.color} w-16 h-16 rounded-2xl flex items-center justify-center border ${review.borderColor}`}
            >
              <span className={`text-2xl font-bold ${review.textColor}`}>
                {review.avatar}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">{review.name}</h3>
                {review.verified && (
                  <FaRegCheckCircle className="text-green-500" />
                )}
              </div>
              <p className="text-gray-400">{review.position}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <FaCalendarAlt />
                <span>{review.date}</span>
                <FaMapMarkerAlt className="ml-2" />
                <span>{review.location}</span>
              </div>
            </div>
          </div>
          {review.videoReview && (
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
              <FaPlay className="w-3 h-3" />
              <span>Video Review</span>
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-6">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`w-5 h-5 ${i < review.rating ? "text-yellow-500" : "text-gray-700"}`}
              />
            ))}
          </div>
          <span className="text-gray-400 ml-2">{review.rating}.0 rating</span>
        </div>

        {/* Review Content */}
        <div className="mb-6">
          <FaQuoteLeft className="text-3xl text-blue-500/30 mb-4" />
          <p className="text-gray-300 leading-relaxed">{review.content}</p>
        </div>

        {/* Review Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-800">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
              <FaHeart />
              <span>{review.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors">
              <FaShareAlt />
              <span>{review.shares}</span>
            </button>
          </div>
          <button className="text-gray-400 hover:text-white transition-colors">
            <FaExternalLinkAlt />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const ReviewModal = () => {
    if (!selectedReview) return null;

    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedReview(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`bg-gray-900 rounded-3xl max-w-2xl w-full p-8 border-2 ${selectedReview.borderColor}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div
                  className={`${selectedReview.color} w-20 h-20 rounded-2xl flex items-center justify-center border ${selectedReview.borderColor}`}
                >
                  <span
                    className={`text-3xl font-bold ${selectedReview.textColor}`}
                  >
                    {selectedReview.avatar}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedReview.name}
                  </h3>
                  <p className="text-gray-400">{selectedReview.position}</p>
                  <p className="text-gray-500">{selectedReview.company}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReview(null)}
                className="text-gray-500 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Detailed Content */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-6 h-6 ${i < selectedReview.rating ? "text-yellow-500" : "text-gray-700"}`}
                    />
                  ))}
                </div>
                <span className="text-gray-400">
                  {selectedReview.rating}.0 rating
                </span>
              </div>

              <div className="bg-gray-800/50 rounded-2xl p-6">
                <FaQuoteLeft className="text-4xl text-blue-500/30 mb-4" />
                <p className="text-gray-300 text-lg leading-relaxed">
                  {selectedReview.content}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800/30 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">{selectedReview.location}</p>
                </div>
                <div className="bg-gray-800/30 rounded-xl p-4">
                  <p className="text-gray-400 text-sm">Date Posted</p>
                  <p className="text-white">{selectedReview.date}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 py-20 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with TypeAnimation */}
        <div className="text-center mb-20">
          <Fade direction="down" duration={800} triggerOnce>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl border border-gray-800 mb-8">
              <FaStar className="text-yellow-500 animate-spin-slow" />
              <span className="text-blue-400 font-semibold">
                Trusted by 10,000+ Companies
              </span>
            </div>
          </Fade>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Hear from our{" "}
            <TypeAnimation
              sequence={[
                "Happy Customers",
                2000,
                "Valued Partners",
                2000,
                "Success Stories",
                2000,
                "Global Community",
                2000,
              ]}
              speed={40}
              repeat={Infinity}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
            />
          </h1>

          <Slide direction="up" duration={800} triggerOnce>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
              Join thousands of businesses who have transformed their operations
              with ZapShift. Real stories from real people.
            </p>
          </Slide>
        </div>

        {/* Statistics with CountUp */}
        <div ref={statsRef} className="mb-20">
          <Zoom triggerOnce>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 text-center md:text-left">
              {stats.map((stat, index) => (
                <Tilt
                  key={index}
                  tiltMaxAngleX={5}
                  tiltMaxAngleY={5}
                  scale={1.03}
                  glareEnable={true}
                  glareMaxOpacity={0.1}
                  glareColor="#ffffff"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-800 hover:border-gray-700 transition-all duration-500"
                  >
                    <div
                      className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} bg-opacity-20 text-white mb-6`}
                    >
                      {stat.icon}
                    </div>
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                      {isVisible ? (
                        <CountUp
                          start={0}
                          end={
                            stat.title === "Support Response"
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
                      {stat.title === "Support Response" && stat.count}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-300 mb-2">
                      {stat.title}
                    </h3>
                    <p className="text-gray-500">{stat.description}</p>
                  </motion.div>
                </Tilt>
              ))}
            </div>
          </Zoom>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: "all", label: "All Reviews", icon: <FaStar /> },
            {
              id: "5star",
              label: "5-Star Reviews",
              icon: <FaStar className="text-yellow-500" />,
            },
            { id: "video", label: "Video Reviews", icon: <FaPlay /> },
          ].map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-sm ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-gray-900/50 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700"
              }`}
            >
              {tab.icon}
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Swiper/Carousel Section */}
        <div className="relative mb-20">
          <div
            ref={containerRef}
            className="flex gap-6 overflow-hidden px-4 py-8"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {visibleReviews.map((review, index) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2"
              >
                <ReviewCard
                  review={review}
                  isActive={index === 1} // Center card is active
                  index={index}
                />
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevReview}
              className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl border border-gray-800 hover:border-blue-500 transition-colors"
            >
              <FaChevronLeft className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
            </motion.button>

            <button
              onClick={toggleAutoplay}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl border border-gray-800 hover:border-purple-500 transition-colors"
            >
              {isPlaying ? (
                <>
                  <FaPause className="text-purple-500" />
                  <span className="text-gray-400">Pause Auto</span>
                </>
              ) : (
                <>
                  <FaPlay className="text-blue-500" />
                  <span className="text-gray-400">Play Auto</span>
                </>
              )}
            </button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextReview}
              className="p-4 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl border border-gray-800 hover:border-blue-500 transition-colors"
            >
              <FaChevronRight className="w-6 h-6 text-gray-400 hover:text-white transition-colors" />
            </motion.button>
          </div>

          {/* Progress Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {filteredReviews.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                onClick={() => goToReview(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 w-8"
                    : "bg-gray-800"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Featured Review */}
        <Fade direction="up" duration={1000} triggerOnce>
          <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800 mb-20 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -translate-y-32 translate-x-32"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full mb-4">
                    <FaStar className="text-yellow-500" />
                    <span className="text-blue-400 font-semibold">
                      Featured Review
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    Why Companies Choose ZapShift
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                    4.9
                  </div>
                  <p className="text-gray-400">Average Rating</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-500/10 rounded-xl">
                      <FaThumbsUp className="text-green-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">98%</div>
                      <p className="text-gray-400">Customer Retention</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                      <FaShippingFast className="text-blue-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">99.8%</div>
                      <p className="text-gray-400">Delivery Accuracy</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-500/10 rounded-xl">
                      <FaAward className="text-purple-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">50+</div>
                      <p className="text-gray-400">Industry Awards</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>

        {/* CTA Section */}
        <Zoom duration={1000} triggerOnce>
          <div className="text-center">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-gray-800 shadow-2xl">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Transform Your Business?
              </h3>
              <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
                Join thousands of successful companies who trust ZapShift for
                their logistics and delivery needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-900/50 text-white font-bold py-4 px-10 rounded-xl shadow-lg border border-gray-700 hover:border-blue-500 transition-all duration-300"
                >
                  Schedule Demo
                </motion.button>
              </div>
              <p className="text-gray-500 mt-8">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </Zoom>
      </div>

      {/* Review Modal */}
      <ReviewModal />
    </section>
  );
};

export default CustomerReview;
