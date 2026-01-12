import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { isLoading, data: percel = [] } = useQuery({
    queryKey: ["percel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${id}`);
      return res.data.result;
    },
  });

  // payment handle
  const handlepayment = async () => {
    const paymentInfo = {
      totalPrice: percel.totalPrice,
      id: percel._id,
      senderEmail: percel.senderEmail,
      percelName: percel.parcelName,
    };
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <p className="loading loading-bars loading-xl text-white"></p>;
  }

  return (
    <div className="text-white">
      <h1 className="text-white">
        Payment Page Pay your payment {percel.totalPrice} for{" "}
        {percel.parcelName}{" "}
      </h1>
      <br />
      <button
        onClick={handlepayment}
        className="text-white bg-green-500 btn px-3 py-6 text-2xl w-20 border-gray-600"
      >
        Pay
      </button>
    </div>
  );
};

export default Payment;
