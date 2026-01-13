import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Loader2, CreditCard, Package, Mail, DollarSign } from "lucide-react";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel = [] } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${id}`);
      return res.data.result;
    },
  });

  // payment handle
  const handlePayment = async () => {
    const paymentInfo = {
      totalPrice: parcel.totalPrice,
      id: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
      senderRegion: parcel.senderRegion,
      senderDistrict: parcel.senderDistrict,
      senderName: parcel.senderName,
      senderAddress: parcel.senderAddress,
      senderPhone: parcel.senderPhone,
      receiverRegion: parcel.receiverRegion,
      receiverDistrict: parcel.receiverDistrict,
      receiverName: parcel.receiverName,
      receiverEmail: parcel.receiverEmail,
      receiverAddress: parcel.receiverAddress,
      receiverContact: parcel.receiverContact,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.result;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-gray-800"></div>
            <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-emerald-500 border-t-transparent animate-spin"></div>
          </div>
          <p className="text-gray-400 font-medium">
            Loading payment details...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Complete Your Payment
          </h1>
          <p className="text-gray-400 mt-3">
            Secure payment gateway • SSL encrypted
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Details Card */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-emerald-900/30 rounded-xl">
                <Package className="h-7 w-7 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Parcel Details</h2>
            </div>

            <div className="space-y-6">
              {/* Parcel Name */}
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <Package className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Parcel Name</p>
                    <p className="font-medium text-white">
                      {parcel.parcelName}
                    </p>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Amount</p>
                    <p className="font-medium text-white">
                      ${parcel.totalPrice}
                    </p>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-800 rounded-lg">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Sender Email</p>
                    <p className="font-medium text-white">
                      {parcel.senderEmail}
                    </p>
                  </div>
                </div>
              </div>

              {/* ID */}
              <div className="p-4 bg-gray-900/30 rounded-xl">
                <p className="text-sm text-gray-400 mb-2">Payment Reference</p>
                <div className="flex items-center gap-2">
                  <code className="text-xs bg-black/50 px-3 py-2 rounded-lg text-gray-300 font-mono">
                    {parcel._id}
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary Card */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-900/30 rounded-xl">
                <CreditCard className="h-7 w-7 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">Payment Summary</h2>
            </div>

            <div className="space-y-6">
              {/* Total Amount Display */}
              <div className="text-center py-8">
                <div className="inline-flex flex-col items-center">
                  <span className="text-gray-400 text-sm mb-2">
                    Total Amount Due
                  </span>
                  <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                    ${parcel.totalPrice}
                  </div>
                </div>
              </div>

              {/* Security Badges */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                  <div className="text-emerald-400 font-bold text-sm">
                    🔒 SSL
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Secure</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                  <div className="text-blue-400 font-bold text-sm">⚡ Fast</div>
                  <p className="text-xs text-gray-400 mt-1">Instant</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-3 text-center">
                  <div className="text-purple-400 font-bold text-sm">
                    🛡️ Safe
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Protected</p>
                </div>
              </div>

              {/* Terms */}
              <div className="text-sm text-gray-400 space-y-2">
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  Your payment is securely processed with encryption
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  You will receive a confirmation email after payment
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-emerald-400">✓</span>
                  Full refund available within 24 hours if requested
                </p>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayment}
                className="w-full mt-8 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 flex items-center justify-center gap-3"
              >
                <CreditCard className="h-5 w-5" />
                <span className="text-lg">Proceed to Payment</span>
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                You will be redirected to our secure payment gateway
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-6 text-sm text-gray-500">
            <span>
              Need help?{" "}
              <a href="#" className="text-emerald-400 hover:text-emerald-300">
                Contact Support
              </a>
            </span>
            <span className="h-4 w-px bg-gray-700"></span>
            <span>
              Read our{" "}
              <a href="#" className="text-emerald-400 hover:text-emerald-300">
                Privacy Policy
              </a>
            </span>
            <span className="h-4 w-px bg-gray-700"></span>
            <span>
              View{" "}
              <a href="#" className="text-emerald-400 hover:text-emerald-300">
                Terms of Service
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
