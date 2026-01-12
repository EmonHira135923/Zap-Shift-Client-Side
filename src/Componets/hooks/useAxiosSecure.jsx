import axios from "axios";
import React from "react";
import Baseurl from "../utils/Baseurl";

const axiosSecure = axios.create({
  baseURL: `${Baseurl}`,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
