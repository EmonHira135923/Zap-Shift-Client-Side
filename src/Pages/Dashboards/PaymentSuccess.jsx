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

  // Verify Payment
  useEffect(() => {
    if (!session_id) {
      setPaymentStatus({
        loading: false,
        success: false,
        error: "No session id found",
        data: null,
      });
      return;
    }

    axiosSecure
      .patch(`/verify-payment?session_id=${session_id}`)
      .then((res) => {
        setPaymentStatus({
          loading: false,
          success: true,
          error: null,
          data: res.data,
        });
      })
      .catch((err) => {
        setPaymentStatus({
          loading: false,
          success: false,
          error: err.response?.data?.message || "Payment verification failed",
          data: null,
        });
      });
  }, [session_id, axiosSecure]);

  // Countdown
  useEffect(() => {
    if (!paymentStatus.success) return;

    const timer = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [paymentStatus.success]);

  // Loading Screen
  if (paymentStatus.loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <CreditCard className="h-12 w-12 text-emerald-400 animate-pulse mx-auto" />
          <h2 className="mt-4 text-xl text-white">Verifying Payment...</h2>
        </div>
      </div>
    );
  }

  // Error Screen
  if (!paymentStatus.success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-red-400 mb-3">
            Payment Verification Failed
          </h2>
          <p className="text-gray-400 mb-4">{paymentStatus.error}</p>
          <Link
            to="/"
            className="px-5 py-2 bg-emerald-600 text-white rounded-lg"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  // Success Screen
  const data = paymentStatus.data;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-gray-900 p-8 rounded-xl border border-gray-800">
        <div className="text-center mb-6">
          <CheckCircle className="h-14 w-14 text-emerald-400 mx-auto mb-3" />
          <h1 className="text-3xl font-bold">Payment Successful</h1>
          <p className="text-gray-400 mt-2">
            Your transaction has been completed
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Tracking ID</span>
            <span className="text-emerald-400 font-bold">
              {data.trackingId}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Transaction ID</span>
            <span className="font-mono text-sm">{data.transaction_id}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Amount Paid</span>
            <span className="font-bold text-emerald-400">
              {data.amount} {data.currency?.toUpperCase()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Customer Email</span>
            <span>{data.customer_email}</span>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Redirecting to dashboard in {countdown} seconds
        </div>

        <Link
          to="/dashboard"
          className="block mt-4 text-center bg-emerald-600 py-2 rounded-lg"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
