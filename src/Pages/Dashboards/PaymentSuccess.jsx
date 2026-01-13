import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../Componets/hooks/useAxiosSecure";
import {
  CheckCircle,
  Clock,
  Download,
  Home,
  Shield,
  CreditCard,
} from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const session_id = searchParams.get("session_id");

  const [paymentStatus, setPaymentStatus] = useState({
    loading: true,
    success: false,
    error: null,
    data: null,
  });

  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (session_id) {
      axiosSecure
        .patch(`/verify-payment?session_id=${session_id}`)
        .then((res) => {
          console.log("res", res.data);
          setPaymentStatus({
            loading: false,
            success: true,
            error: null,
            data: res.data,
          });
        })
        .catch((error) => {
          console.error("Payment verification failed:", error);
          setPaymentStatus({
            loading: false,
            success: false,
            error: error.message,
            data: null,
          });
        });
    } else {
      setPaymentStatus({
        loading: false,
        success: false,
        error: "No session ID found",
        data: null,
      });
    }
  }, [session_id, axiosSecure]);

  // Countdown for redirect
  useEffect(() => {
    if (paymentStatus.success) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            // Optionally redirect here
            // navigate('/dashboard');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [paymentStatus.success]);

  if (paymentStatus.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="h-24 w-24 rounded-full border-4 border-gray-800"></div>
            <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <CreditCard className="h-8 w-8 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-white">
            Verifying Payment
          </h2>
          <p className="mt-2 text-gray-400">
            Please wait while we confirm your transaction...
          </p>
          <div className="mt-8 flex justify-center space-x-2">
            <div className="h-1 w-1 bg-emerald-400 rounded-full animate-pulse"></div>
            <div className="h-1 w-1 bg-emerald-400 rounded-full animate-pulse delay-75"></div>
            <div className="h-1 w-1 bg-emerald-400 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
    );
  }

  if (paymentStatus.error || !paymentStatus.success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl border border-gray-700 p-8 shadow-2xl">
            <div className="text-center">
              <div className="mx-auto h-20 w-20 flex items-center justify-center rounded-full bg-red-900/30 mb-6">
                <div className="h-12 w-12 rounded-full bg-red-900/50 flex items-center justify-center">
                  <div className="text-2xl text-red-400">✕</div>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-3">
                Payment Verification Failed
              </h1>
              <p className="text-gray-400 mb-6">
                {paymentStatus.error ||
                  "Unable to verify your payment. Please contact support."}
              </p>

              <div className="bg-gray-900/50 rounded-xl p-4 mb-8">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-2">
                  <Shield className="h-4 w-4" />
                  <span>Transaction ID:</span>
                </div>
                <code className="block text-center text-xs bg-black/50 px-3 py-2 rounded-lg text-gray-300 font-mono">
                  {session_id || "N/A"}
                </code>
              </div>

              <div className="space-y-4">
                <Link
                  to="/"
                  className="block w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Home className="h-5 w-5" />
                    <span>Return to Home</span>
                  </div>
                </Link>

                <button
                  onClick={() => window.location.reload()}
                  className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Try Again
                </button>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-500">
                  Need help?{" "}
                  <a
                    href="mailto:support@example.com"
                    className="text-emerald-400 hover:text-emerald-300"
                  >
                    Contact our support team
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Confetti animation container */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
            <div className="relative h-24 w-24 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Payment Successful!
          </h1>
          <p className="text-gray-400 mt-3 text-lg">
            Your transaction has been completed successfully
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Receipt Card */}
          <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Payment Receipt</h2>
              <div className="flex items-center gap-2 text-emerald-400">
                <Clock className="h-5 w-5" />
                <span className="text-sm">Just now</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Transaction Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 rounded-xl p-5">
                  <p className="text-sm text-gray-400 mb-2">Transaction ID</p>
                  <code className="text-sm bg-black/50 px-3 py-2 rounded-lg text-gray-300 font-mono block truncate">
                    {session_id}
                  </code>
                </div>
                <div className="bg-gray-900/50 rounded-xl p-5">
                  <p className="text-sm text-gray-400 mb-2">Date & Time</p>
                  <p className="text-white font-medium">
                    {new Date().toLocaleDateString()} •{" "}
                    {new Date().toLocaleTimeString()}
                  </p>
                </div>
              </div>

              {/* Payment Details */}
              {paymentStatus.data && (
                <div className="bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 rounded-xl p-6 border border-emerald-800/30">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Details
                  </h3>
                  <div className="space-y-4">
                    {paymentStatus.data.amount && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Amount Paid</span>
                        <span className="text-2xl font-bold text-emerald-400">
                          ${paymentStatus.data.amount / 100}
                        </span>
                      </div>
                    )}
                    {paymentStatus.data.customer_email && (
                      <div className="flex justify-between items-center py-3 border-y border-gray-800">
                        <span className="text-gray-400">Customer Email</span>
                        <span className="text-white font-medium">
                          {paymentStatus.data.customer_email}
                        </span>
                      </div>
                    )}
                    {paymentStatus.data.currency && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Currency</span>
                        <span className="text-white font-medium">
                          {paymentStatus.data.currency.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Security Note */}
              <div className="bg-gray-900/30 rounded-xl p-5 border border-gray-800">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-emerald-400 mt-0.5" />
                  <div>
                    <h4 className="text-white font-medium mb-2">
                      Payment Secured
                    </h4>
                    <p className="text-sm text-gray-400">
                      Your payment was processed securely. A confirmation email
                      has been sent to your registered email address. Keep this
                      receipt for your records.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            {/* Next Steps */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 p-6">
              <h3 className="text-xl font-bold text-white mb-6">Next Steps</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900/70 transition-colors cursor-pointer">
                  <div className="h-10 w-10 rounded-lg bg-emerald-900/30 flex items-center justify-center">
                    <Download className="h-5 w-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Download Receipt</p>
                    <p className="text-sm text-gray-400">PDF format</p>
                  </div>
                </div>

                <Link
                  to="/dashboard"
                  className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-xl hover:bg-gray-900/70 transition-colors"
                >
                  <div className="h-10 w-10 rounded-lg bg-blue-900/30 flex items-center justify-center">
                    <Home className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Go to Dashboard</p>
                    <p className="text-sm text-gray-400">
                      View all your parcels
                    </p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Auto Redirect */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 p-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-900/50 mb-4">
                  <div className="text-2xl font-bold text-emerald-400">
                    {countdown}
                  </div>
                </div>
                <h4 className="text-white font-medium mb-2">Auto Redirect</h4>
                <p className="text-sm text-gray-400 mb-4">
                  Redirecting to dashboard in {countdown} seconds
                </p>
                <Link
                  to="/dashboard"
                  className="inline-block w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
                >
                  Go Now
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gray-900/30 rounded-2xl border border-gray-800 p-6">
              <h4 className="text-white font-medium mb-4">Need Help?</h4>
              <p className="text-sm text-gray-400 mb-4">
                If you have any questions about your payment, our support team
                is here to help.
              </p>
              <a
                href="mailto:support@example.com"
                className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
              >
                Contact Support →
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Thank you for your payment. Your transaction ID is{" "}
            <span className="text-gray-400 font-mono">
              {session_id?.substring(0, 12)}...
            </span>
          </p>
        </div>
      </div>

      {/* Add custom CSS for confetti animation */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti linear forwards;
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
