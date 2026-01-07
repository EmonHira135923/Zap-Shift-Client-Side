import React from "react";
import { Fade, Slide, Zoom } from "react-awesome-reveal";

const MerchantandCustomer = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-purple-50"></div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <Fade direction="left" duration={800} triggerOnce>
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                  Our Commitment
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-6">
                  Merchant and Customer{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    Satisfaction
                  </span>{" "}
                  is Our First Priority
                </h1>
              </div>
            </Fade>

            <Slide direction="up" duration={800} delay={200} triggerOnce>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                We offer the lowest delivery charge with the highest value along
                with support of the optimal delivery right on time.
              </p>
            </Slide>

            <Zoom duration={800} delay={400} triggerOnce>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2">
                  <span>Become a Merchant</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
                <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-blue-100">
                  Learn More
                </button>
              </div>
            </Zoom>

            {/* Stats */}
            <Fade direction="up" duration={800} delay={600} triggerOnce>
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">99%</div>
                  <div className="text-gray-600 text-sm">Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">24/7</div>
                  <div className="text-gray-600 text-sm">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">100+</div>
                  <div className="text-gray-600 text-sm">Merchants</div>
                </div>
              </div>
            </Fade>
          </div>

          {/* Right Content - Animated Cards */}
          <div className="lg:w-1/2">
            <div className="relative">
              {/* Card 1 */}
              <Fade direction="right" duration={800} delay={200} triggerOnce>
                <div className="bg-white rounded-2xl p-6 shadow-xl mb-6 border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <svg
                        className="w-6 h-6 text-blue-600"
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
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">For Merchants</h3>
                      <p className="text-sm text-gray-600">
                        Grow your business
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Lowest commission rates",
                      "Real-time analytics",
                      "24/7 merchant support",
                      "Secure payment gateway",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>

              {/* Card 2 */}
              <Fade direction="right" duration={800} delay={400} triggerOnce>
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 transform hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-purple-100 rounded-xl">
                      <svg
                        className="w-6 h-6 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 1.195a9 9 0 01-13.5 0"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">For Customers</h3>
                      <p className="text-sm text-gray-600">
                        Best shopping experience
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {[
                      "Fastest delivery guarantee",
                      "Live tracking system",
                      "Easy returns & refunds",
                      "Multiple payment options",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Fade>
            </div>
          </div>
        </div>

        {/* Testimonial Section */}
        <Fade direction="up" duration={800} delay={600} triggerOnce>
          <div className="mt-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  What our partners say
                </h3>
                <p className="text-gray-600">
                  Join thousands of satisfied merchants and customers
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-2 border-white bg-gray-200"
                    ></div>
                  ))}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">4.9/5</div>
                  <div className="text-gray-600 text-sm">Average Rating</div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};

export default MerchantandCustomer;
