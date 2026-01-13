import React from "react";
import { useNavigate, Link } from "react-router";
import {
  XCircle,
  RotateCcw,
  Home,
  AlertTriangle,
  ArrowLeft,
  CreditCard,
} from "lucide-react";

const PaymentCancel = () => {
  const navigate = useNavigate();

  const handleRetry = () => {
    navigate(`/dashboard/mypercels`);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-64 w-64 rounded-full bg-red-500/5 blur-3xl"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `scale(${0.5 + Math.random()})`,
              }}
            />
          ))}
        </div>

        <div className="relative">
          {/* Main Card */}
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-700 shadow-2xl overflow-hidden">
            {/* Header Section */}
            <div className="relative p-8 border-b border-gray-800">
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-orange-600">
                    <XCircle className="h-12 w-12 text-white" />
                  </div>
                </div>
              </div>

              <div className="pt-16 text-center">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                  Payment Cancelled
                </h1>
                <p className="text-gray-400 mt-3 max-w-md mx-auto">
                  Your payment process was interrupted. No charges were made to
                  your account.
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Information */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 rounded-xl p-6 border border-red-800/30">
                    <div className="flex items-start gap-4">
                      <AlertTriangle className="h-6 w-6 text-orange-400 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          What Happened?
                        </h3>
                        <p className="text-gray-300 text-sm">
                          You chose to cancel the payment or the transaction was
                          interrupted before completion. This can happen if you
                          close the payment window or cancel the process.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-900/50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Security Note
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-400 mt-2"></div>
                        <span className="text-sm text-gray-300">
                          No charges were made to your payment method
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-400 mt-2"></div>
                        <span className="text-sm text-gray-300">
                          Your financial information remains secure
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-400 mt-2"></div>
                        <span className="text-sm text-gray-300">
                          You can safely retry the payment
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right Column - Actions */}
                <div className="space-y-6">
                  <div className="bg-gray-900/30 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-white mb-6">
                      What would you like to do?
                    </h3>

                    <div className="space-y-4">
                      <button
                        onClick={handleRetry}
                        className="w-full group bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                      >
                        <RotateCcw className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
                        <span className="text-lg">Try Payment Again</span>
                      </button>

                      <button
                        onClick={handleGoHome}
                        className="w-full group bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        <Home className="h-5 w-5" />
                        <span>Return to Home</span>
                      </button>

                      <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-transparent hover:bg-gray-800/50 text-gray-300 font-medium py-3 px-6 rounded-xl transition-all duration-300 border border-gray-700 hover:border-gray-600 flex items-center justify-center gap-3"
                      >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Go Back</span>
                      </button>
                    </div>
                  </div>

                  {/* Support Section */}
                  <div className="bg-gray-900/20 rounded-xl p-6">
                    <h4 className="text-white font-medium mb-3">
                      Need assistance?
                    </h4>
                    <p className="text-gray-400 text-sm mb-4">
                      Having trouble with payments? Our support team is
                      available 24/7.
                    </p>
                    <div className="flex gap-3">
                      <Link
                        to="/contact"
                        className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                      >
                        Contact Support
                      </Link>
                      <Link
                        to="/faq"
                        className="flex-1 text-center bg-transparent hover:bg-gray-800 text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors text-sm border border-gray-700"
                      >
                        View FAQ
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-900/50 border-t border-gray-800 p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-900/30 to-orange-900/30 flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">
                      Secure Payment Gateway
                    </p>
                    <p className="text-xs text-gray-500">
                      Powered by Stripe • SSL Encrypted
                    </p>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-sm text-gray-500">
                    Having issues?{" "}
                    <a
                      href="mailto:support@example.com"
                      className="text-orange-400 hover:text-orange-300"
                    >
                      support@example.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -z-10 -inset-4">
            <div className="absolute top-0 left-0 h-32 w-32 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 h-32 w-32 bg-orange-500/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Additional Options */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-6 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
              <span>Payment securely cancelled</span>
            </span>
            <span className="h-4 w-px bg-gray-800"></span>
            <span>
              Transaction ID:{" "}
              <span className="text-gray-400 font-mono">
                cancelled_{Date.now().toString().slice(-8)}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
