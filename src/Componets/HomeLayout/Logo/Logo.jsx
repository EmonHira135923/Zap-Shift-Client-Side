import React from "react";

const Logo = () => {
  const logos = [
    {
      name: "CASIO",
      logo: <div className="text-2xl font-bold text-gray-800">CASIO</div>,
    },
    {
      name: "Amazon",
      logo: <div className="text-2xl font-bold text-blue-600">Amazon</div>,
    },
    {
      name: "eSmoonstan",
      logo: <div className="text-xl font-bold text-purple-600">eSmoonstan</div>,
    },
    {
      name: "STAR+",
      logo: (
        <div className="text-2xl font-bold text-red-600">
          STAR<span className="text-blue-500">+</span>
        </div>
      ),
    },
    {
      name: "Startpeople",
      logo: <div className="text-xl font-bold text-green-600">Startpeople</div>,
    },
    {
      name: "Randstad",
      logo: <div className="text-2xl font-bold text-orange-600">Randstad</div>,
    },
    {
      name: "Microsoft",
      logo: <div className="text-2xl font-bold text-blue-700">Microsoft</div>,
    },
    {
      name: "Google",
      logo: <div className="text-2xl font-bold text-red-500">Google</div>,
    },
    {
      name: "FedEx",
      logo: <div className="text-2xl font-bold text-purple-800">FedEx</div>,
    },
    {
      name: "UPS",
      logo: <div className="text-2xl font-bold text-yellow-600">UPS</div>,
    },
    {
      name: "DHL",
      logo: <div className="text-2xl font-bold text-red-500">DHL</div>,
    },
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            We've helped thousands of{" "}
            <span className="text-blue-600">sales teams</span>
          </h2>
          <p className="text-gray-600 mt-2">Trusted by companies worldwide</p>
        </div>

        {/* Marquee Container */}
        <div className="relative overflow-hidden">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10"></div>

          {/* First Marquee */}
          <div className="flex animate-marquee whitespace-nowrap py-6">
            {[...logos, ...logos].map((company, index) => (
              <div
                key={index}
                className="mx-6 md:mx-8 flex-shrink-0 bg-white rounded-xl px-8 py-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                {company.logo}
              </div>
            ))}
          </div>

          {/* Second Marquee (Reverse) */}
          <div className="flex animate-marquee-reverse whitespace-nowrap py-6 mt-2">
            {[...logos].reverse().map((company, index) => (
              <div
                key={index}
                className="mx-6 md:mx-8 flex-shrink-0 bg-white rounded-xl px-8 py-4 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="opacity-80">{company.logo}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-600">10K+</div>
            <div className="text-gray-600 mt-1">Companies</div>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600">50K+</div>
            <div className="text-gray-600 mt-1">Sales Teams</div>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-purple-600">100+</div>
            <div className="text-gray-600 mt-1">Countries</div>
          </div>
          <div className="text-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-orange-600">99%</div>
            <div className="text-gray-600 mt-1">Satisfaction Rate</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee {
          animation: marquee 25s linear infinite;
        }

        .animate-marquee-reverse {
          animation: marquee-reverse 30s linear infinite;
        }

        /* Pause animation on hover */
        .animate-marquee:hover,
        .animate-marquee-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Logo;
