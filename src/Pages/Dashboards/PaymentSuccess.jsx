import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../Componets/hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchparams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const session_id = searchparams.get("session_id");
  console.log(session_id);
  useEffect(() => {
    if (session_id) {
      axiosSecure
        .patch(`/verify-payment?session_id=${session_id}`)
        .then((res) => {
          console.log("res", res.data);
        });
    }
  }, [session_id, axiosSecure]);
  return (
    <div className="text-white">
      <h1>Payment Successfully Done</h1>
    </div>
  );
};

export default PaymentSuccess;
