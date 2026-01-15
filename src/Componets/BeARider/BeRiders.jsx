import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Warehouse,
  Bike,
  Home,
} from "lucide-react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const BeRiders = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm();

  // Bangladesh Divisions with their Districts
  const divisionDistricts = {
    Dhaka: [
      "Dhaka",
      "Faridpur",
      "Gazipur",
      "Gopalganj",
      "Kishoreganj",
      "Madaripur",
      "Manikganj",
      "Munshiganj",
      "Narayanganj",
      "Narsingdi",
      "Rajbari",
      "Shariatpur",
      "Tangail",
      "Narshingdi",
    ],
    Chittagong: [
      "Chittagong",
      "Bandarban",
      "Brahmanbaria",
      "Chandpur",
      "Comilla",
      "Cox's Bazar",
      "Feni",
      "Khagrachari",
      "Lakshmipur",
      "Noakhali",
      "Rangamati",
    ],
    Rajshahi: [
      "Rajshahi",
      "Bogura",
      "Chapainawabganj",
      "Joypurhat",
      "Naogaon",
      "Natore",
      "Pabna",
      "Sirajganj",
    ],
    Khulna: [
      "Khulna",
      "Bagerhat",
      "Chuadanga",
      "Jessore",
      "Jhenaidah",
      "Kushtia",
      "Magura",
      "Meherpur",
      "Narail",
      "Satkhira",
    ],
    Barishal: [
      "Barishal",
      "Barguna",
      "Bhola",
      "Jhalokathi",
      "Patuakhali",
      "Pirojpur",
    ],
    Sylhet: ["Sylhet", "Habiganj", "Moulvibazar", "Sunamganj"],
    Rangpur: [
      "Rangpur",
      "Dinajpur",
      "Gaibandha",
      "Kurigram",
      "Lalmonirhat",
      "Nilphamari",
      "Panchagarh",
      "Thakurgaon",
    ],
    Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  };

  // Division list
  const divisions = Object.keys(divisionDistricts);

  // Handle division change
  const handleDivisionChange = (e) => {
    const selectedDivision = e.target.value;
    if (selectedDivision && selectedDivision !== "Select Division") {
      setDistricts(divisionDistricts[selectedDivision] || []);
      // Clear district when division changes
      setValue("district", "");
    } else {
      setDistricts([]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.post("/create-rider", data);
      if (res.data.result.insertedId) {
        toast.success("Rider request submitted successfully!");
        reset();
        setDistricts([]);
        navigate("/");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8 px-4">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent mb-2">
            Be a Rider
          </h1>
          <p className="text-gray-400">
            Join our delivery team and start earning today
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-lime-500 to-green-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div className="group">
            <label className="flex items-center gap-2 mb-2 text-gray-300 group-focus-within:text-lime-400 transition-colors">
              <User size={18} /> Your Name
            </label>
            <input
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
              {...register("name", { required: "Name required" })}
              placeholder="Your Name"
            />
          </div>

          {/* Age */}
          <div className="group">
            <label className="mb-2 block text-gray-300 group-focus-within:text-lime-400 transition-colors">
              Your Age
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
              {...register("age", { required: "Age required" })}
              placeholder="Your Age"
            />
          </div>

          {/* Email */}
          <div className="group">
            <label className="flex items-center gap-2 mb-2 text-gray-300 group-focus-within:text-lime-400 transition-colors">
              <Mail size={18} /> Your Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
              {...register("email", { required: "Email required" })}
              placeholder="Your Email"
            />
          </div>

          {/* Phone */}
          <div className="group">
            <label className="flex items-center gap-2 mb-2 text-gray-300 group-focus-within:text-lime-400 transition-colors">
              <Phone size={18} /> Contact
            </label>
            <input
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
              {...register("contact", { required: "Contact required" })}
              placeholder="01XXXXXXXXX"
            />
          </div>

          {/* Division */}
          <div className="group">
            <label className="flex items-center gap-2 mb-2 text-gray-300 group-focus-within:text-lime-400 transition-colors">
              <MapPin size={18} /> Region (Division)
            </label>
            <select
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all appearance-none"
              {...register("division", {
                required: true,
                onChange: handleDivisionChange,
              })}
            >
              <option className="bg-gray-800">Select Division</option>
              {divisions.map((d, i) => (
                <option key={i} className="bg-gray-800">
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* District - Now dependent on Division */}
          <div className="group">
            <label className="flex items-center gap-2 mb-2 text-gray-300 group-focus-within:text-lime-400 transition-colors">
              <MapPin size={18} /> District
            </label>
            <select
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all appearance-none"
              {...register("district", { required: true })}
              disabled={!districts.length}
            >
              <option className="bg-gray-800">
                {districts.length ? "Select District" : "Select Division First"}
              </option>
              {districts.map((d, i) => (
                <option key={i} className="bg-gray-800">
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Full Address */}
          <div className="md:col-span-2 group">
            <label className="flex items-center gap-2 mb-2 text-gray-300 group-focus-within:text-lime-400 transition-colors">
              <Home size={18} /> Full Address
            </label>
            <textarea
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all resize-none"
              rows="3"
              {...register("address", { required: "Address required" })}
              placeholder="Your full address"
            />
          </div>

          {/* NID */}
          <div className="group">
            <label className="flex items-center gap-2 mb-2 text-gray-300 group-focus-within:text-lime-400 transition-colors">
              <FileText size={18} /> NID Number
            </label>
            <input
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
              {...register("nid", { required: "NID required" })}
              placeholder="NID Number"
            />
          </div>

          {/* Driving License */}
          <div className="group">
            <label className="flex items-center gap-2 mb-2 text-gray-300 group-focus-within:text-lime-400 transition-colors">
              <FileText size={18} /> Driving License No
            </label>
            <input
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
              {...register("license", { required: "License required" })}
              placeholder="Driving License Number"
            />
          </div>

          {/* Bike Info */}
          <div className="md:col-span-2 group">
            <label className="flex items-center gap-2 mb-2 text-gray-300 group-focus-within:text-lime-400 transition-colors">
              <Bike size={18} /> Bike Information
            </label>
            <input
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all"
              {...register("bikeInfo", { required: "Bike info required" })}
              placeholder="Bike Model & Registration Number"
            />
          </div>

          {/* Warehouse */}
          <div className="md:col-span-2 group">
            <label className="flex items-center gap-2 mb-2 text-gray-300 group-focus-within:text-lime-400 transition-colors">
              <Warehouse size={18} /> Which warehouse you want to work?
            </label>
            <select
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all appearance-none"
              {...register("warehouse", { required: true })}
            >
              <option className="bg-gray-800">Select warehouse</option>
              <option className="bg-gray-800">Dhaka Hub</option>
              <option className="bg-gray-800">Chittagong Hub</option>
              <option className="bg-gray-800">Rajshahi Hub</option>
              <option className="bg-gray-800">Khulna Hub</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 mt-4">
            <button className="w-full py-4 bg-gradient-to-r from-lime-500 to-green-600 text-black font-bold rounded-xl hover:from-lime-600 hover:to-green-700 transform hover:-translate-y-0.5 transition-all duration-300 shadow-lg hover:shadow-xl">
              Submit Request
            </button>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex items-center gap-2 text-gray-400">
            <div className="w-2 h-2 bg-lime-500 rounded-full"></div>
            <p className="text-sm">
              After submission, our team will contact you within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeRiders;
