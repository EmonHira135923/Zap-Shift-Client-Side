import React, { useState, useEffect } from "react";

// You can replace these image URLs with your actual images
// For now, I'm using placeholder images that represent parcel delivery and riders

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "We Make Sure Your Parcel Arrives On Time - No Fuss.",
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments - we deliver on time, every time.",
      cta1: "Track Your Parcel",
      cta2: "Be A Rider",
      image:
        "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Package delivery
      imageAlt: "Parcel delivery",
    },
    {
      title: "Fastest Delivery & Easy Pickup",
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
      cta1: "Track Your Parcel",
      cta2: "Be A Rider",
      image:
        "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", // Bike delivery
      imageAlt: "Bike delivery service",
    },
    {
      title: "Delivery in 30 Minutes at your doorstep",
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
      cta1: "Track Your Parcel",
      cta2: "Be A Rider",
      image:
        "https://images.pexels.com/photos/4391478/pexels-photo-4391478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // Doorstep delivery
      imageAlt: "Doorstep delivery",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-gradient-to-r from-blue-50 to-white">
      {/* Slides container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-700 ease-in-out flex items-center ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="container mx-auto px-6 md:px-12 lg:px-24 w-full">
              <div className="flex flex-col lg:flex-row items-center justify-between w-full">
                {/* Text content */}
                <div className="lg:w-1/2 mb-10 lg:mb-0">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 md:mb-6 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8 max-w-xl">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 md:py-3 px-6 md:px-8 rounded-lg text-base md:text-lg transition duration-300 transform hover:scale-105 shadow-lg">
                      {slide.cta1}
                    </button>
                    <button className="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-2 md:py-3 px-6 md:px-8 rounded-lg text-base md:text-lg border-2 border-blue-600 transition duration-300 transform hover:scale-105 shadow-md">
                      {slide.cta2}
                    </button>
                  </div>
                </div>

                {/* Image content */}
                <div className="lg:w-1/2 flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-lg">
                    <div className="absolute -top-4 -right-4 w-32 h-32 bg-blue-100 rounded-full opacity-50"></div>
                    <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-200 rounded-full opacity-50"></div>
                    <img
                      src={slide.image}
                      alt={slide.imageAlt}
                      className="relative z-10 w-full h-auto max-h-[300px] md:max-h-[400px] object-contain rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg z-20 transition duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 md:p-3 rounded-full shadow-lg z-20 transition duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-blue-600 w-6 md:w-8"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Background decorative elements */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full -translate-x-1/4 translate-y-1/4 opacity-30"></div>
      <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-gradient-to-r from-blue-100 to-blue-50 rounded-full -translate-x-1/4 -translate-y-1/4 opacity-30"></div>
    </div>
  );
};

export default Banner;
