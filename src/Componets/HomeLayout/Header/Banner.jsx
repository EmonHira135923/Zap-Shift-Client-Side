import React, { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: ["We Make Sure Your", "Parcel Arrives On Time", "No Fuss."],
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments - we deliver on time, every time.",
      cta1: "Track Your Parcel",
      cta2: "Be A Rider",
      image:
        "https://images.unsplash.com/photo-1578575437130-527eed3abbec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Parcel delivery",
    },
    {
      title: ["Fastest Delivery", "& Easy Pickup"],
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
      cta1: "Track Your Parcel",
      cta2: "Be A Rider",
      image:
        "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      imageAlt: "Bike delivery service",
    },
    {
      title: ["Delivery in 30 Minutes", "at your doorstep"],
      description:
        "Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.",
      cta1: "Track Your Parcel",
      cta2: "Be A Rider",
      image:
        "https://images.pexels.com/photos/4391478/pexels-photo-4391478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      imageAlt: "Doorstep delivery",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Reduced time

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
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden bg-gradient-to-r from-gray-50 to-blue-50">
      {/* Slides container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ease-in-out flex items-center ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="container mx-auto px-4 md:px-8 lg:px-16 w-full">
              <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8">
                {/* Text content - Reduced size */}
                <div className="lg:w-1/2">
                  <div className="h-32 md:h-36 lg:h-40 mb-4">
                    {index === currentSlide && (
                      <TypeAnimation
                        sequence={[
                          slide.title[0],
                          800,
                          slide.title[0] + "\n" + slide.title[1],
                          800,
                          slide.title[0] +
                            "\n" +
                            slide.title[1] +
                            "\n" +
                            slide.title[2],
                          1500,
                        ]}
                        wrapper="h1"
                        speed={40}
                        deletionSpeed={60}
                        repeat={0}
                        cursor={true}
                        className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 leading-tight whitespace-pre-line"
                      />
                    )}
                    {index !== currentSlide && (
                      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 leading-tight">
                        {slide.title.map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </h1>
                    )}
                  </div>

                  <p className="text-sm md:text-base text-gray-700 mb-6 max-w-lg leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 md:py-2.5 px-5 md:px-6 rounded-lg text-sm md:text-base transition duration-300 transform hover:scale-105 shadow-lg group">
                      <span>{slide.cta1}</span>
                      <span className="inline-block ml-1.5 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                    <button className="bg-white hover:bg-gray-50 text-blue-700 font-semibold py-2 md:py-2.5 px-5 md:px-6 rounded-lg text-sm md:text-base border border-blue-200 transition duration-300 transform hover:scale-105 shadow-sm group">
                      <span>{slide.cta2}</span>
                      <span className="inline-block ml-1.5 group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </button>
                  </div>
                </div>

                {/* Image content - Reduced size */}
                <div className="lg:w-1/2 flex justify-center lg:justify-end">
                  <div className="relative w-full max-w-md">
                    <div className="absolute -top-3 -right-3 w-24 h-24 bg-blue-100 rounded-full opacity-40"></div>
                    <div className="absolute -bottom-3 -left-3 w-20 h-20 bg-blue-200 rounded-full opacity-40"></div>
                    <img
                      src={slide.image}
                      alt={slide.imageAlt}
                      className="relative z-10 w-full h-auto max-h-[220px] md:max-h-[280px] object-contain rounded-lg shadow-lg"
                    />

                    {/* Animated delivery info */}
                    {index === currentSlide && (
                      <div className="absolute -bottom-1 -right-1 bg-white/90 rounded-lg p-2 shadow-md z-20">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs font-medium text-gray-800">
                            Live Tracking
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows - Smaller */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-3 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 p-1.5 md:p-2 rounded-full shadow-md z-20 transition duration-300 hover:scale-105"
        aria-label="Previous slide"
      >
        <svg
          className="w-4 h-4 md:w-5 md:h-5"
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
        className="absolute right-2 md:right-3 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white text-gray-700 p-1.5 md:p-2 rounded-full shadow-md z-20 transition duration-300 hover:scale-105"
        aria-label="Next slide"
      >
        <svg
          className="w-4 h-4 md:w-5 md:h-5"
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

      {/* Slide indicators - Smaller */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5 md:space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-blue-600 w-4 md:w-6"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Current slide number - Smaller */}
      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm z-20">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-medium text-gray-700">
            {currentSlide + 1}/{slides.length}
          </span>
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* Delivery Stats - Smaller */}
      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-sm z-20 hidden md:block">
        <div className="text-xs font-medium text-gray-700">
          <span className="text-blue-600">🚚</span> 5000+ Deliveries
        </div>
      </div>

      {/* Background decorative elements - Lighter */}
      <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-blue-100 rounded-full -translate-x-1/4 translate-y-1/4 opacity-20"></div>
      <div className="absolute top-0 left-0 w-1/5 h-1/5 bg-blue-100 rounded-full -translate-x-1/4 -translate-y-1/4 opacity-20"></div>
    </div>
  );
};

export default Banner;
