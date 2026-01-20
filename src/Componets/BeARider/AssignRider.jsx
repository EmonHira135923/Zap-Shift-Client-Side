import React from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AssignRider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["Mypercel", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/Mypercel?deliveryStatus=pending-pickup`,
      );
      console.log(res.data.result);
      return res.data.result;
    },
  });
  return (
    <div>
      <h1>Assign Riders {parcels.length} </h1>
    </div>
  );
};

export default AssignRider;
