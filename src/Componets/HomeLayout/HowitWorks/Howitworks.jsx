import React from "react";

const HowItWorks = () => {
  const features = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      description:
        "From personal packages to business shipments — we deliver on time every time.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
      ),
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      title: "Cash On Delivery",
      description:
        "From personal packages to business shipments — we deliver on time every time.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-green-500 to-green-600",
    },
    {
      id: 3,
      title: "Delivery Hub",
      description:
        "From personal packages to business shipments — we deliver on time every time.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      color: "from-purple-500 to-purple-600",
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      description:
        "From personal packages to business shipments — we deliver on time every time.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            How it <span className="text-blue-600">Works</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple and efficient delivery process from start to finish
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="relative group"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {/* Card */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full border border-gray-100">
                {/* Number Badge */}
                <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-lg">
                  {feature.id}
                </div>

                {/* Icon Container */}
                <div className="mb-6">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} text-white shadow-lg`}
                  >
                    {feature.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Learn More Link */}
                <a
                  href="#"
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-300"
                >
                  Learn More
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-16 h-16 opacity-10">
                  <div
                    className={`bg-gradient-to-r ${feature.color} rounded-full w-full h-full`}
                  ></div>
                </div>
              </div>

              {/* Connector Line (for desktop) */}
              {index < features.length - 1 && (
                <>
                  {/* Mobile connector (vertical) */}
                  <div className="md:hidden flex justify-center mt-6 mb-6">
                    <div className="w-0.5 h-6 bg-gradient-to-b from-blue-400 to-transparent"></div>
                  </div>

                  {/* Desktop connector (horizontal) */}
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-transparent group-hover:w-12 transition-all duration-300"></div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Get Started Now
          </button>
          <p className="text-gray-500 mt-4 text-sm">
            Join thousands of satisfied customers
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
