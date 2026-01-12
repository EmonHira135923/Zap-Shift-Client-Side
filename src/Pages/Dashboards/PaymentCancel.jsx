import React from "react";
import { useNavigate } from "react-router";

const PaymentCancel = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Payment cancel</h1>
      <br />
      <button
        onClick={() => navigate(`/dashboard/mypercels`)}
        className="btn bg-yellow-500 text-white"
      >
        Try Again
      </button>
    </div>
  );
};

export default PaymentCancel;
