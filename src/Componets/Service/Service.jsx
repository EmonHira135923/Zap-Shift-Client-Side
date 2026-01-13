import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Package,
  User,
  MapPin,
  Phone,
  Map,
  FileText,
  Truck,
  AlertCircle,
  ChevronDown,
  Info,
  Weight,
  Navigation,
  Globe,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Service = () => {
  // axios
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  // user
  const { user } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [formDataToSubmit, setFormDataToSubmit] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      parcelType: "document",
      parcelName: "",
      parcelWeight: "",
      senderRegion: "Select Region",
      senderDistrict: "Select District",
      senderName: user?.displayName,
      senderEmail: user?.email,
      senderAddress: "",
      senderPhone: "",
      releaseInstructions: "",
      receiverRegion: "Select Region",
      receiverDistrict: "Select District",
      receiverName: "",
      receiverEmail: "",
      receiverAddress: "",
      receiverContact: "",
      deliveryInstructions: "",
    },
  });

  // বাংলাদেশের অঞ্চল এবং জেলা ডেটা
  const bangladeshRegions = {
    "Barisal Division": [
      "Barguna",
      "Barisal",
      "Bhola",
      "Jhalokati",
      "Patuakhali",
      "Pirojpur",
    ],
    "Chittagong Division": [
      "Bandarban",
      "Brahmanbaria",
      "Chandpur",
      "Chattogram",
      "Cumilla",
      "Cox's Bazar",
      "Feni",
      "Khagrachhari",
      "Lakshmipur",
      "Noakhali",
      "Rangamati",
    ],
    "Dhaka Division": [
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
    ],
    "Khulna Division": [
      "Bagerhat",
      "Chuadanga",
      "Jashore",
      "Jhenaidah",
      "Khulna",
      "Kushtia",
      "Magura",
      "Meherpur",
      "Narail",
      "Satkhira",
    ],
    "Rajshahi Division": [
      "Bogura",
      "Joypurhat",
      "Naogaon",
      "Natore",
      "Chapai Nawabganj",
      "Pabna",
      "Rajshahi",
      "Sirajganj",
    ],
    "Rangpur Division": [
      "Dinajpur",
      "Gaibandha",
      "Kurigram",
      "Lalmonirhat",
      "Nilphamari",
      "Panchagarh",
      "Rangpur",
      "Thakurgaon",
    ],
    "Sylhet Division": ["Habiganj", "Moulvibazar", "Sunamganj", "Sylhet"],
    "Mymensingh Division": ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  };

  const regions = [
    "Select Region",
    "Barisal Division",
    "Chittagong Division",
    "Dhaka Division",
    "Khulna Division",
    "Rajshahi Division",
    "Rangpur Division",
    "Sylhet Division",
    "Mymensingh Division",
  ];

  // ফর্মের বর্তমান মানগুলো
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const parcelType = watch("parcelType");
  const parcelWeight = watch("parcelWeight");
  const senderDistrict = watch("senderDistrict");
  const receiverDistrict = watch("receiverDistrict");

  // Calculate price whenever relevant fields change
  useEffect(() => {
    if (
      parcelWeight &&
      senderDistrict !== "Select District" &&
      receiverDistrict !== "Select District"
    ) {
      calculatePrice();
    }
  }, [parcelType, parcelWeight, senderDistrict, receiverDistrict]);

  // অঞ্চল পরিবর্তন হলে জেলা রিসেট করার ফাংশন
  const handleRegionChange = (type, newRegion) => {
    if (type === "sender") {
      setValue("senderRegion", newRegion);
      setValue("senderDistrict", "Select District");
    } else {
      setValue("receiverRegion", newRegion);
      setValue("receiverDistrict", "Select District");
    }
  };

  // বর্তমানে নির্বাচিত অঞ্চলের জেলাগুলো
  const getDistrictsForRegion = (region) => {
    if (region === "Select Region") return ["Select District"];
    return ["Select District", ...bangladeshRegions[region]];
  };

  const senderDistricts = getDistrictsForRegion(senderRegion);
  const receiverDistricts = getDistrictsForRegion(receiverRegion);

  const calculatePrice = () => {
    const data = getValues();
    const priceDocument = data.parcelType === "document";
    let priceCost = 0;
    const parcelWeightValue = parseFloat(data.parcelWeight);
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;

    if (priceDocument) {
      priceCost = isSameDistrict ? 80 : 100;
    } else {
      if (parcelWeightValue < 3) {
        priceCost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeightValue - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        priceCost = minCharge + extraCharge;
      }
    }

    setCalculatedPrice(priceCost);
    return priceCost;
  };

  const onSubmit = (data) => {
    // Calculate price first
    const price = calculatePrice();
    setCalculatedPrice(price);
    setFormDataToSubmit(data);
    setShowPriceModal(true);
  };

  const handleConfirmSubmit = () => {
    setShowPriceModal(false);
    setIsSubmitting(true);

    // Prepare the data to send
    const submissionData = {
      ...formDataToSubmit,
      totalPrice: calculatedPrice,
      createdAt: new Date().toISOString(),
    };

    // console.log("Form submission started:", submissionData);

    // Use axiosSecure to post data
    axiosSecure
      .post("/create-percel", submissionData)
      .then((response) => {
        // console.log("Backend response:", response.data);
        setIsSubmitted(true);
        toast.success("Your Items Added in Database");
        navigate("/dashboard/mypercels");
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          reset({
            parcelType: "document",
            parcelName: "",
            parcelWeight: "",
            senderRegion: "Select Region",
            senderDistrict: "Select District",
            senderName: user?.displayName || "",
            senderEmail: user?.email || "",
            senderAddress: "",
            senderPhone: "",
            releaseInstructions: "",
            receiverRegion: "Select Region",
            receiverDistrict: "Select District",
            receiverName: "",
            receiverEmail: "",
            receiverAddress: "",
            receiverContact: "",
            deliveryInstructions: "",
          });
          setFormDataToSubmit(null);
          setCalculatedPrice(0);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error in form submission:", error);
        toast.error("Ohh!!! Your items not added in DB");
        // You could add error state handling here
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 10,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg"
          >
            <Send className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
            Send A Parcel
          </h1>
          <p className="text-gray-400 mt-2">
            Fast and secure parcel delivery across Bangladesh
          </p>
        </motion.div>

        {/* Success Message */}
        <AnimatePresence>
          {isSubmitted && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 p-4 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 border border-green-500/30 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="p-2 bg-green-500/20 rounded-full"
                >
                  <Send className="w-5 h-5 text-green-400" />
                </motion.div>
                <div>
                  <p className="font-semibold text-green-400">
                    Parcel Request Submitted Successfully!
                  </p>
                  <p className="text-sm text-gray-300">
                    We'll contact you shortly for confirmation.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Price Preview (only shows when all required fields are filled) */}
        {parcelWeight &&
          senderDistrict !== "Select District" &&
          receiverDistrict !== "Select District" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-500/30 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Weight className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-green-400">
                      Estimated Price
                    </p>
                    <p className="text-sm text-gray-300">
                      Based on your selections
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">
                    ৳{calculatedPrice}
                  </p>
                  <p className="text-xs text-gray-400">BDT</p>
                </div>
              </div>
            </motion.div>
          )}

        {/* Main Form Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 overflow-hidden"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Form Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">
                    Step 1: Parcel Details
                  </span>
                  <span className="text-sm text-gray-400">
                    Step 2: Sender & Receiver Info
                  </span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>
              </div>

              {/* Parcel Type */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Package className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-300">
                    Parcel Type
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      value: "document",
                      label: "Document",
                      icon: FileText,
                      color: "blue",
                    },
                    {
                      value: "notDocument",
                      label: "Non-Document",
                      icon: Package,
                      color: "purple",
                    },
                  ].map((type) => (
                    <motion.label
                      key={type.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
                        parcelType === type.value
                          ? `border-${type.color}-500 bg-${type.color}-500/10 shadow-lg shadow-${type.color}-500/20`
                          : "border-gray-700 bg-gray-900/50 hover:border-gray-600"
                      }`}
                    >
                      <input
                        type="radio"
                        {...register("parcelType", {
                          required: "Parcel type is required",
                        })}
                        value={type.value}
                        className="hidden"
                      />
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            parcelType === type.value
                              ? `bg-${type.color}-500`
                              : "bg-gray-700"
                          }`}
                        >
                          <type.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-gray-300 font-medium">
                            {type.label}
                          </p>
                          <p className="text-sm text-gray-500">
                            {type.value === "document"
                              ? "Letters, documents, files"
                              : "Packages, goods, items"}
                          </p>
                        </div>
                      </div>
                    </motion.label>
                  ))}
                </div>
                {errors.parcelType && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-red-400 text-sm mt-2 flex items-center gap-1"
                  >
                    <AlertCircle className="w-4 h-4" />
                    {errors.parcelType.message}
                  </motion.p>
                )}
              </motion.div>

              {/* Parcel Details */}
              <motion.div variants={itemVariants} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="w-5 h-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-300">
                    Parcel Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-gray-300 mb-2">
                      <Package className="w-4 h-4" />
                      Parcel Name *
                    </label>
                    <input
                      type="text"
                      {...register("parcelName", {
                        required: "Parcel name is required",
                        minLength: {
                          value: 3,
                          message: "Minimum 3 characters required",
                        },
                      })}
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="e.g., Important Documents, Electronics, etc."
                      disabled={isSubmitting}
                    />
                    {errors.parcelName && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.parcelName.message}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-gray-300 mb-2">
                      <Weight className="w-4 h-4" />
                      Parcel Weight (kg) *
                    </label>
                    <input
                      type="number"
                      {...register("parcelWeight", {
                        required: "Parcel weight is required",
                        min: {
                          value: 0.1,
                          message: "Minimum weight is 0.1 kg",
                        },
                        max: {
                          value: 100,
                          message: "Maximum weight is 100 kg",
                        },
                      })}
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="e.g., 2.5"
                      step="0.1"
                      disabled={isSubmitting}
                    />
                    {errors.parcelWeight && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-red-400 text-sm mt-2 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.parcelWeight.message}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Sender & Receiver Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Sender Section */}
                <motion.div variants={cardVariants}>
                  <div className="bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-700 p-6 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-300">
                        Sender Details
                      </h3>
                    </div>

                    <div className="space-y-5">
                      {/* Sender Name */}
                      <div>
                        <label className="flex items-center gap-2 text-gray-300 mb-2">
                          <User className="w-4 h-4" />
                          Sender Name *
                        </label>
                        <input
                          type="text"
                          {...register("senderName", {
                            required: "Sender name is required",
                          })}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter full name"
                          defaultValue={user?.displayName}
                          readOnly
                          disabled={isSubmitting}
                        />
                        {errors.senderName && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.senderName.message}
                          </p>
                        )}
                      </div>

                      {/* Sender Email */}
                      <div>
                        <label className="flex items-center gap-2 text-gray-300 mb-2">
                          <User className="w-4 h-4" />
                          Sender Email *
                        </label>
                        <input
                          type="email"
                          {...register("senderEmail", {
                            required: "Sender email is required",
                          })}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter email"
                          defaultValue={user?.email}
                          readOnly
                          disabled={isSubmitting}
                        />
                        {errors.senderEmail && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.senderEmail.message}
                          </p>
                        )}
                      </div>

                      {/* Sender Address */}
                      <div>
                        <label className="flex items-center gap-2 text-gray-300 mb-2">
                          <MapPin className="w-4 h-4" />
                          Sender Address *
                        </label>
                        <textarea
                          {...register("senderAddress", {
                            required: "Sender address is required",
                          })}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                          rows="3"
                          placeholder="House No, Road No, Area, City"
                          disabled={isSubmitting}
                        />
                        {errors.senderAddress && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.senderAddress.message}
                          </p>
                        )}
                      </div>

                      {/* Sender Phone */}
                      <div>
                        <label className="flex items-center gap-2 text-gray-300 mb-2">
                          <Phone className="w-4 h-4" />
                          Phone No *
                        </label>
                        <input
                          type="tel"
                          {...register("senderPhone", {
                            required: "Phone number is required",
                            pattern: {
                              value: /^01[3-9]\d{8}$/,
                              message:
                                "Enter a valid Bangladeshi mobile number",
                            },
                          })}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="01XXXXXXXXX"
                          disabled={isSubmitting}
                        />
                        {errors.senderPhone && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.senderPhone.message}
                          </p>
                        )}
                      </div>

                      {/* Sender Region & District */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="flex items-center gap-2 text-gray-300 mb-2">
                            <Globe className="w-4 h-4" />
                            Region *
                          </label>
                          <div className="relative">
                            <select
                              {...register("senderRegion", {
                                required: "Please select a region",
                                validate: (value) =>
                                  value !== "Select Region" ||
                                  "Please select a region",
                                onChange: (e) =>
                                  handleRegionChange("sender", e.target.value),
                              })}
                              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={isSubmitting}
                            >
                              {regions.map((region, index) => (
                                <option
                                  key={index}
                                  value={region}
                                  className="bg-gray-800"
                                >
                                  {region}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                          </div>
                          {errors.senderRegion && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.senderRegion.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-gray-300 mb-2">
                            <Map className="w-4 h-4" />
                            District *
                          </label>
                          <div className="relative">
                            <select
                              {...register("senderDistrict", {
                                required: "Please select a district",
                                validate: (value) =>
                                  value !== "Select District" ||
                                  "Please select a district",
                              })}
                              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={
                                isSubmitting ||
                                !senderRegion ||
                                senderRegion === "Select Region"
                              }
                            >
                              {senderDistricts.map((district, index) => (
                                <option
                                  key={index}
                                  value={district}
                                  className="bg-gray-800"
                                >
                                  {district}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                          </div>
                          {errors.senderDistrict && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.senderDistrict.message}
                            </p>
                          )}
                          {(!senderRegion ||
                            senderRegion === "Select Region") && (
                            <p className="text-yellow-400 text-xs mt-1">
                              Please select a region first
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Release Instructions */}
                      <div>
                        <label className="flex items-center gap-2 text-gray-300 mb-2">
                          <FileText className="w-4 h-4" />
                          Release Instructions *
                        </label>
                        <textarea
                          {...register("releaseInstructions", {
                            required: "Release instructions are required",
                          })}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                          rows="2"
                          placeholder="e.g., Leave with security, Call before arrival, etc."
                          disabled={isSubmitting}
                        />
                        {errors.releaseInstructions && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.releaseInstructions.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Receiver Section */}
                <motion.div variants={cardVariants}>
                  <div className="bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-700 p-6 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                        <Truck className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-300">
                        Receiver Details
                      </h3>
                    </div>

                    <div className="space-y-5">
                      {/* Receiver Name */}
                      <div>
                        <label className="flex items-center gap-2 text-gray-300 mb-2">
                          <User className="w-4 h-4" />
                          Receiver Name *
                        </label>
                        <input
                          type="text"
                          {...register("receiverName", {
                            required: "Receiver name is required",
                          })}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter full name"
                          disabled={isSubmitting}
                        />
                        {errors.receiverName && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.receiverName.message}
                          </p>
                        )}
                      </div>

                      {/* Receiver Email */}
                      <div>
                        <label className="flex items-center gap-2 text-gray-300 mb-2">
                          <User className="w-4 h-4" />
                          Receiver Email *
                        </label>
                        <input
                          type="email"
                          {...register("receiverEmail", {
                            required: "Receiver email is required",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Enter a valid email address",
                            },
                          })}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter receiver email"
                          disabled={isSubmitting}
                        />
                        {errors.receiverEmail && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.receiverEmail.message}
                          </p>
                        )}
                      </div>

                      {/* Receiver Address */}
                      <div>
                        <label className="flex items-center gap-2 text-gray-300 mb-2">
                          <MapPin className="w-4 h-4" />
                          Receiver Address *
                        </label>
                        <textarea
                          {...register("receiverAddress", {
                            required: "Receiver address is required",
                          })}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                          rows="3"
                          placeholder="House No, Road No, Area, City"
                          disabled={isSubmitting}
                        />
                        {errors.receiverAddress && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.receiverAddress.message}
                          </p>
                        )}
                      </div>

                      {/* Receiver Contact */}
                      <div>
                        <label className="flex items-center gap-2 text-gray-300 mb-2">
                          <Phone className="w-4 h-4" />
                          Contact No *
                        </label>
                        <input
                          type="tel"
                          {...register("receiverContact", {
                            required: "Contact number is required",
                            pattern: {
                              value: /^01[3-9]\d{8}$/,
                              message:
                                "Enter a valid Bangladeshi mobile number",
                            },
                          })}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                          placeholder="01XXXXXXXXX"
                          disabled={isSubmitting}
                        />
                        {errors.receiverContact && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.receiverContact.message}
                          </p>
                        )}
                      </div>

                      {/* Receiver Region & District */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="flex items-center gap-2 text-gray-300 mb-2">
                            <Globe className="w-4 h-4" />
                            Region *
                          </label>
                          <div className="relative">
                            <select
                              {...register("receiverRegion", {
                                required: "Please select a region",
                                validate: (value) =>
                                  value !== "Select Region" ||
                                  "Please select a region",
                                onChange: (e) =>
                                  handleRegionChange(
                                    "receiver",
                                    e.target.value
                                  ),
                              })}
                              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={isSubmitting}
                            >
                              {regions.map((region, index) => (
                                <option
                                  key={index}
                                  value={region}
                                  className="bg-gray-800"
                                >
                                  {region}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                          </div>
                          {errors.receiverRegion && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.receiverRegion.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="flex items-center gap-2 text-gray-300 mb-2">
                            <Map className="w-4 h-4" />
                            District *
                          </label>
                          <div className="relative">
                            <select
                              {...register("receiverDistrict", {
                                required: "Please select a district",
                                validate: (value) =>
                                  value !== "Select District" ||
                                  "Please select a district",
                              })}
                              className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              disabled={
                                isSubmitting ||
                                !receiverRegion ||
                                receiverRegion === "Select Region"
                              }
                            >
                              {receiverDistricts.map((district, index) => (
                                <option
                                  key={index}
                                  value={district}
                                  className="bg-gray-800"
                                >
                                  {district}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                          </div>
                          {errors.receiverDistrict && (
                            <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.receiverDistrict.message}
                            </p>
                          )}
                          {(!receiverRegion ||
                            receiverRegion === "Select Region") && (
                            <p className="text-yellow-400 text-xs mt-1">
                              Please select a region first
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Delivery Instructions */}
                      <div>
                        <label className="flex items-center gap-2 text-gray-300 mb-2">
                          <FileText className="w-4 h-4" />
                          Delivery Instructions *
                        </label>
                        <textarea
                          {...register("deliveryInstructions", {
                            required: "Delivery instructions are required",
                          })}
                          className="w-full px-4 py-3 bg-gray-800/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                          rows="2"
                          placeholder="e.g., Deliver after 5 PM, Ring bell twice, etc."
                          disabled={isSubmitting}
                        />
                        {errors.deliveryInstructions && (
                          <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                            <AlertCircle className="w-4 h-4" />
                            {errors.deliveryInstructions.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Information Note */}
              <motion.div
                variants={itemVariants}
                className="mb-8 p-4 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 border border-blue-500/30 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <Navigation className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div>
                    <p className="text-blue-400 font-medium mb-1">
                      📦 Important Notice: RedUp Delivery Time Approx. 7 PM
                      Daily
                    </p>
                    <p className="text-sm text-gray-300">
                      Estimated delivery time may vary based on destination and
                      weather conditions. For urgent deliveries, please contact
                      our customer support at +880 1711-XXXXXX
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button with Loading State */}
              <motion.div variants={itemVariants} className="text-center">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 overflow-hidden animate-gradient disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative flex items-center justify-center gap-3 text-lg">
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="inline-block"
                        >
                          <Loader2 className="w-5 h-5 animate-spin" />
                        </motion.span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="inline-block"
                        >
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </motion.span>
                        Submit Parcel Request
                      </>
                    )}
                  </span>
                </motion.button>
                <p className="text-gray-500 text-sm mt-3">
                  All fields marked with * are required
                </p>
                {isSubmitting && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-blue-400 text-sm mt-2 flex items-center justify-center gap-2"
                  >
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending your request to the server...
                  </motion.p>
                )}
              </motion.div>
            </motion.div>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-8"
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              SSL Encrypted
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              24/7 Customer Support
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Real-time Tracking
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              All Over Bangladesh
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            © 2024 Centrum Binding. Serving across all 8 divisions of
            Bangladesh.
          </p>
        </motion.div>
      </motion.div>

      {/* Price Confirmation Modal */}
      <AnimatePresence>
        {showPriceModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
              onClick={() => setShowPriceModal(false)}
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full overflow-hidden">
                {/* Modal Header */}
                <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        Confirm Your Order
                      </h3>
                      <p className="text-sm text-gray-300">
                        Please review the calculated price
                      </p>
                    </div>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6">
                  {/* Price Display */}
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-gray-700 mb-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-400 mb-1">
                          Total Price
                        </p>
                        <div className="flex items-baseline justify-center gap-2">
                          <span className="text-4xl font-bold text-white">
                            ৳{calculatedPrice}
                          </span>
                          <span className="text-gray-400">BDT</span>
                        </div>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-2 text-left mb-6">
                      <div className="flex justify-between py-2 border-b border-gray-700">
                        <span className="text-gray-400">Parcel Type:</span>
                        <span className="text-white">
                          {parcelType === "document"
                            ? "Document"
                            : "Non-Document"}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-700">
                        <span className="text-gray-400">Weight:</span>
                        <span className="text-white">{parcelWeight} kg</span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-gray-700">
                        <span className="text-gray-400">Delivery Type:</span>
                        <span className="text-white">
                          {senderDistrict === receiverDistrict
                            ? "Same District"
                            : "Different District"}
                        </span>
                      </div>
                    </div>

                    {/* Confirmation Message */}
                    <p className="text-gray-300 text-sm mb-6">
                      Are you sure your total price is{" "}
                      <span className="font-bold text-white">
                        ৳{calculatedPrice}
                      </span>
                      ? Click <span className="text-green-400">Confirm</span> to
                      proceed or <span className="text-red-400">Cancel</span> to
                      review.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowPriceModal(false)}
                      className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirmSubmit}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Confirm & Submit
                    </motion.button>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 bg-gray-900/50 border-t border-gray-700">
                  <p className="text-center text-xs text-gray-500">
                    Your payment will be processed upon delivery
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Service;
