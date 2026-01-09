import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Truck,
  Package,
  Clock,
  MapPin,
  Shield,
  ChevronLeft,
  ChevronRight,
  Zap,
  Play,
  Pause,
} from "lucide-react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      title: ["We Make Sure Your", "Parcel Arrives On Time", "No Fuss."],
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments - we deliver on time, every time.",
      cta1: "Track Your Parcel",
      cta2: "Be A Rider",
      icon: <Truck className="w-5 h-5" />,
      stats: [
        { value: "30 Min", label: "Fastest Delivery" },
        { value: "99.9%", label: "Success Rate" },
      ],
      gradient: "from-blue-600 to-cyan-500",
      image:
        "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Parcel delivery",
    },
    {
      title: ["Fastest Delivery", "& Easy Pickup"],
      description:
        "Experience lightning-fast deliveries with our optimized routes and dedicated riders. Get your packages delivered in record time across the city.",
      cta1: "Book Delivery",
      cta2: "Join as Partner",
      icon: <Package className="w-5 h-5" />,
      stats: [
        { value: "5000+", label: "Daily Deliveries" },
        { value: "98%", label: "On-time Rate" },
      ],
      gradient: "from-emerald-600 to-green-500",
      image:
        "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Bike delivery service",
    },
    {
      title: ["Delivery in 30 Minutes", "at your doorstep"],
      description:
        "Our express delivery service ensures your packages reach you within 30 minutes. Perfect for urgent deliveries and time-sensitive shipments.",
      cta1: "Express Delivery",
      cta2: "Schedule Pickup",
      icon: <Clock className="w-5 h-5" />,
      stats: [
        { value: "24/7", label: "Service Available" },
        { value: "4.9", label: "Customer Rating" },
      ],
      gradient: "from-purple-600 to-pink-500",
      image:
        "https://images.pexels.com/photos/4391478/pexels-photo-4391478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      imageAlt: "Doorstep delivery",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Simple background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-blue-100 dark:bg-blue-900/20 rounded-full -translate-x-8 md:-translate-x-12 -translate-y-8 md:-translate-y-12"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32 bg-cyan-100 dark:bg-cyan-900/20 rounded-full translate-x-10 md:translate-x-16 translate-y-10 md:translate-y-16"></div>
      </div>

      {/* Slides container */}
      <div className="relative w-full">
        <AnimatePresence initial={false} custom={1}>
          <motion.div
            key={currentSlide}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="w-full"
          >
            {/* Mobile Layout (Stacked: Image on top, Text below) */}
            <div className="block md:hidden w-full min-h-[800px] flex flex-col">
              {/* Image Section - Top */}
              <div className="w-full h-[400px] flex items-center justify-center px-4 pt-8">
                <div className="relative w-full max-w-md">
                  {/* Floating badges */}
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 rounded-lg p-1.5 shadow-lg z-20"
                  >
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        Live
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-2 -left-2 bg-white dark:bg-gray-800 rounded-lg p-1.5 shadow-lg z-20"
                  >
                    <div className="flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        30 Min
                      </span>
                    </div>
                  </motion.div>

                  {/* Main image */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="relative z-10"
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-xl">
                      <img
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].imageAlt}
                        className="w-full h-[280px] object-cover rounded-xl"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Text Section - Bottom */}
              <div className="w-full h-[400px] px-4 pb-8">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm mb-3"
                >
                  <div
                    className={`p-1 rounded-md bg-gradient-to-r ${slides[currentSlide].gradient}`}
                  >
                    {slides[currentSlide].icon}
                  </div>
                  <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    Premium Delivery
                  </span>
                </motion.div>

                {/* Title */}
                <div className="mb-2">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                    {slides[currentSlide].title[0]}{" "}
                    <span className="block">
                      {slides[currentSlide].title[1]}
                    </span>
                    {slides[currentSlide].title[2] && (
                      <span className="block">
                        {slides[currentSlide].title[2]}
                      </span>
                    )}
                  </h1>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                  {slides[currentSlide].description}
                </p>

                {/* Stats */}
                <div className="flex gap-4 mb-4">
                  {slides[currentSlide].stats.map((stat, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-2 mb-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative bg-gradient-to-r ${slides[currentSlide].gradient} text-white font-semibold py-3 px-6 rounded-lg text-sm shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {slides[currentSlide].cta1}
                      <ChevronRight className="w-4 h-4 transition-transform" />
                    </span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-700 dark:text-blue-300 font-semibold py-3 px-6 rounded-lg text-sm border border-blue-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <span className="flex items-center justify-center gap-2">
                      {slides[currentSlide].cta2}
                      <ChevronRight className="w-4 h-4 transition-transform" />
                    </span>
                  </motion.button>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: <Shield className="w-3 h-3" />, text: "Secure" },
                    { icon: <MapPin className="w-3 h-3" />, text: "Tracking" },
                    { icon: <Clock className="w-3 h-3" />, text: "24/7" },
                  ].map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-1.5 px-2 py-1.5 bg-white dark:bg-gray-800 rounded-md shadow-sm text-xs"
                    >
                      <div className="text-blue-600 dark:text-blue-400">
                        {feature.icon}
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Layout (Side by side: Image Right, Text Left) */}
            <div className="hidden md:block container mx-auto px-8 lg:px-16 w-full h-[500px] lg:h-[550px] flex items-center">
              <div className="flex flex-row items-center justify-between w-full gap-8 lg:gap-12">
                {/* Text content - Left */}
                <div className="w-1/2">
                  {/* Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full shadow-sm mb-4"
                  >
                    <div
                      className={`p-1 rounded-md bg-gradient-to-r ${slides[currentSlide].gradient}`}
                    >
                      {slides[currentSlide].icon}
                    </div>
                    <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                      Premium Delivery
                    </span>
                  </motion.div>

                  {/* Title with Type Animation */}
                  <div className="mb-3">
                    <TypeAnimation
                      sequence={[
                        slides[currentSlide].title[0],
                        600,
                        slides[currentSlide].title[0] +
                          " " +
                          slides[currentSlide].title[1],
                        600,
                        slides[currentSlide].title[0] +
                          " " +
                          slides[currentSlide].title[1] +
                          " " +
                          slides[currentSlide].title[2],
                        1200,
                      ]}
                      wrapper="h1"
                      speed={30}
                      deletionSpeed={40}
                      repeat={0}
                      cursor={true}
                      className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-base text-gray-700 dark:text-gray-300 mb-6 max-w-xl leading-relaxed">
                    {slides[currentSlide].description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-4 mb-6">
                    {slides[currentSlide].stats.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                        <div>
                          <div className="text-xl font-bold text-gray-900 dark:text-white">
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {stat.label}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`relative bg-gradient-to-r ${slides[currentSlide].gradient} text-white font-semibold py-3 px-6 rounded-lg text-base shadow-lg hover:shadow-xl transition-shadow`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {slides[currentSlide].cta1}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-blue-700 dark:text-blue-300 font-semibold py-3 px-6 rounded-lg text-base border border-blue-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {slides[currentSlide].cta2}
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.button>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {[
                      { icon: <Shield className="w-3 h-3" />, text: "Secure" },
                      {
                        icon: <MapPin className="w-3 h-3" />,
                        text: "Tracking",
                      },
                      { icon: <Clock className="w-3 h-3" />, text: "24/7" },
                    ].map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-1.5 px-2 py-1.5 bg-white dark:bg-gray-800 rounded-md shadow-sm text-xs"
                      >
                        <div className="text-blue-600 dark:text-blue-400">
                          {feature.icon}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {feature.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Image content - Right */}
                <div className="w-1/2 flex justify-end">
                  <div className="relative w-full max-w-md">
                    {/* Floating badges */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-3 -right-3 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg z-20"
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                        <span className="text-xs font-bold text-gray-900 dark:text-white">
                          Live
                        </span>
                      </div>
                    </motion.div>

                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                      className="absolute -bottom-3 -left-3 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg z-20"
                    >
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs font-bold text-gray-900 dark:text-white">
                          30 Min
                        </span>
                      </div>
                    </motion.div>

                    {/* Main image */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10"
                    >
                      <div className="relative overflow-hidden rounded-xl shadow-xl">
                        <img
                          src={slides[currentSlide].image}
                          alt={slides[currentSlide].imageAlt}
                          className="w-full h-[280px] lg:h-[320px] object-cover rounded-xl"
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 p-2 rounded-full shadow-lg z-30 transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      <button
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 p-2 rounded-full shadow-lg z-30 transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1.5 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="relative"
          >
            <div className="relative w-2 h-2">
              <div
                className={`absolute inset-0 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? `bg-gradient-to-r ${slides[currentSlide].gradient} w-6`
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
            </div>
          </button>
        ))}
      </div>

      {/* Current slide counter */}
      <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg px-3 py-1.5 shadow-md z-30">
        <div className="flex items-center gap-2">
          <div className="flex">
            <span className="text-xs font-bold text-gray-900 dark:text-white">
              {currentSlide + 1}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 mx-1">
              /
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {slides.length}
            </span>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Auto-play toggle */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-4 left-4 bg-white dark:bg-gray-800 rounded-lg p-1.5 shadow-md z-30"
        title={isAutoPlaying ? "Pause auto-slide" : "Play auto-slide"}
      >
        {isAutoPlaying ? (
          <Pause className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        ) : (
          <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        )}
      </button>
    </div>
  );
};

export default Banner;
