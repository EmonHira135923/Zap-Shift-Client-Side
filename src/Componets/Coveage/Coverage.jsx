import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import axios from "axios";
import { toast } from "react-toastify";
import L from "leaflet";
import {
  Search,
  MapPin,
  Navigation2,
  ZoomIn,
  ZoomOut,
  Filter,
  X,
  ChevronRight,
  Check,
  Clock,
  Shield,
  Loader2,
} from "lucide-react";

// Custom blue icon for markers
const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// Component to recenter map
const RecenterMap = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, 10);
  }, [position, map]);
  return null;
};

const Coverage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    express: false,
    standard: false,
    economy: false,
  });
  const position = [23.685, 90.3563];
  const mapRef = useRef(null);

  useEffect(() => {
    axios
      .get("/Ourservices.json")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Services Error Finding");
        console.error("Error:", err.message);
        setLoading(false);
      });
  }, []);

  const hanldeMapSearch = (e) => {
    e.preventDefault();
    const searchValue = e.target.map.value.toLowerCase().trim();

    if (!searchValue) {
      setFilteredData(data);
      toast.info("Showing all districts");
      return;
    }

    const foundDistricts = data.filter((d) =>
      d.district.toLowerCase().includes(searchValue)
    );

    if (foundDistricts.length > 0) {
      setFilteredData(foundDistricts);
      const firstDistrict = foundDistricts[0];
      const cord = [firstDistrict.latitude, firstDistrict.longitude];
      if (mapRef.current) {
        mapRef.current.flyTo(cord, 14);
      }
      setSelectedDistrict(firstDistrict);
      toast.success(`Found ${foundDistricts.length} district(s)`);
    } else {
      toast.error("District not found! Try a different search");
    }
  };

  const handleDistrictClick = (district) => {
    const cord = [district.latitude, district.longitude];
    if (mapRef.current) {
      mapRef.current.flyTo(cord, 14);
    }
    setSelectedDistrict(district);
    toast.info(`Zoomed to ${district.district}`);
  };

  const applyFilters = () => {
    let result = data;

    if (
      activeFilters.express ||
      activeFilters.standard ||
      activeFilters.economy
    ) {
      result = result.filter((item) => {
        if (activeFilters.express && item.serviceType === "express")
          return true;
        if (activeFilters.standard && item.serviceType === "standard")
          return true;
        if (activeFilters.economy && item.serviceType === "economy")
          return true;
        return false;
      });
    }

    if (searchQuery) {
      result = result.filter((item) =>
        item.district.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(result);
    toast.info(`Showing ${result.length} service area(s)`);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setActiveFilters({
      express: false,
      standard: false,
      economy: false,
    });
    setFilteredData(data);
    toast.info("Filters cleared");
  };

  // Dark theme tile layer
  const darkTileLayer =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-300 mb-2">
            Loading Service Coverage
          </h2>
          <p className="text-gray-400">Fetching district data...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Service Coverage
          </h1>
          <p className="text-gray-400 mt-2">
            Explore our service areas across {data.length} districts
          </p>
        </div>

        {/* Stats Cards - Top */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Cities Covered",
              value: data.length,
              icon: <MapPin className="w-5 h-5" />,
              color: "from-blue-500 to-blue-600",
            },
            {
              label: "Service Areas",
              value: filteredData.length,
              icon: <Navigation2 className="w-5 h-5" />,
              color: "from-green-500 to-green-600",
            },
            {
              label: "Active Now",
              value: data.length,
              icon: <Shield className="w-5 h-5" />,
              color: "from-amber-500 to-amber-600",
            },
            {
              label: "Coverage Rate",
              value: "98%",
              icon: <Check className="w-5 h-5" />,
              color: "from-purple-500 to-purple-600",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-2 rounded-lg bg-gradient-to-r ${stat.color} text-white`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-6">
          {/* Filters Section - Top for all screens */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left Side - Search and Quick Filters */}
              <div className="lg:w-1/2">
                {/* Search Form */}
                <form onSubmit={hanldeMapSearch} className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="search"
                      name="map"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-100 placeholder-gray-500"
                      placeholder="Search district..."
                    />
                    <button
                      type="submit"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-lg text-sm font-medium transition-all"
                    >
                      Search
                    </button>
                  </div>
                </form>

                {/* Quick Filter Chips */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => {
                      setActiveFilters({
                        express: !activeFilters.express,
                        standard: false,
                        economy: false,
                      });
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      activeFilters.express
                        ? "bg-gradient-to-r from-green-600 to-emerald-500 text-white"
                        : "bg-gray-900/50 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    Express Delivery
                  </button>
                  <button
                    onClick={() => {
                      setActiveFilters({
                        express: false,
                        standard: !activeFilters.standard,
                        economy: false,
                      });
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      activeFilters.standard
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                        : "bg-gray-900/50 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    Standard
                  </button>
                  <button
                    onClick={() => {
                      setActiveFilters({
                        express: false,
                        standard: false,
                        economy: !activeFilters.economy,
                      });
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      activeFilters.economy
                        ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white"
                        : "bg-gray-900/50 text-gray-300 hover:bg-gray-800"
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    Economy
                  </button>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-900/50 text-gray-300 hover:bg-gray-800 transition-all"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              {/* Right Side - Action Buttons */}
              <div className="lg:w-1/2 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 items-start lg:items-end xl:items-center justify-end">
                <button
                  onClick={applyFilters}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-xl font-medium transition-all transform hover:scale-[1.02] text-sm lg:text-base"
                >
                  Apply Filters
                </button>
                <button
                  onClick={() => {
                    if (navigator.geolocation) {
                      navigator.geolocation.getCurrentPosition(
                        (pos) => {
                          const userPos = [
                            pos.coords.latitude,
                            pos.coords.longitude,
                          ];
                          if (mapRef.current) {
                            mapRef.current.flyTo(userPos, 13);
                          }
                          toast.info("Zoomed to your location");
                        },
                        () => toast.error("Location access denied")
                      );
                    }
                  }}
                  className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-medium transition-all transform hover:scale-[1.02] text-sm lg:text-base flex items-center gap-2"
                >
                  <Navigation2 className="w-4 h-4" />
                  My Location
                </button>
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="lg:hidden px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-medium transition-all transform hover:scale-[1.02] text-sm lg:text-base flex items-center gap-2"
                >
                  {showSidebar ? (
                    <X className="w-4 h-4" />
                  ) : (
                    <Filter className="w-4 h-4" />
                  )}
                  {showSidebar ? "Hide List" : "Show List"}
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area - Sidebar and Map */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar - Districts List */}
            <div
              className={`lg:w-1/3 ${showSidebar ? "block" : "hidden lg:block"}`}
            >
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-2xl h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-200 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    All Districts
                  </h3>
                  <span className="text-sm text-gray-400">
                    {filteredData.length} of {data.length}
                  </span>
                </div>

                {/* Districts List */}
                <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2">
                  {data.map((district, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleDistrictClick(district)}
                      className={`w-full text-left p-3 rounded-xl transition-all transform hover:scale-[1.02] ${
                        selectedDistrict?.district === district.district
                          ? "bg-gradient-to-r from-blue-900/50 to-cyan-900/30 border-l-4 border-blue-500"
                          : "bg-gray-900/30 hover:bg-gray-800/50"
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-200">
                            {district.district}
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            {district.covered_area?.slice(0, 2).join(", ")}
                            {district.covered_area?.length > 2 && "..."}
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-500" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Legend */}
                <div className="pt-6 border-t border-gray-700 mt-6">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">
                    MAP LEGEND
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">
                        Service Center
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">
                        Express Service
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm text-gray-400">
                        Covered Area
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section - Bottom/Top Right */}
            <div className="lg:w-2/3">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative h-[500px] md:h-[600px] lg:h-[700px]">
                  <MapContainer
                    center={position}
                    zoom={10}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                    ref={mapRef}
                    zoomControl={false}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://carto.com/">CARTO</a>, &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
                      url={darkTileLayer}
                    />

                    {filteredData.map((pos, idx) => (
                      <Marker
                        key={idx}
                        position={[pos.latitude, pos.longitude]}
                        icon={blueIcon}
                        eventHandlers={{
                          click: () => setSelectedDistrict(pos),
                        }}
                      >
                        <Popup className="dark-popup">
                          <div className="min-w-[200px] text-gray-900">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="p-1.5 bg-blue-100 rounded-lg">
                                <MapPin className="w-4 h-4 text-blue-600" />
                              </div>
                              <h3 className="font-bold text-lg">
                                {pos.district}
                              </h3>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-green-600" />
                                <span className="font-medium">
                                  Service Areas:
                                </span>
                              </div>
                              <div className="bg-gray-50 p-2 rounded-lg">
                                <p className="text-sm">
                                  {pos.covered_area?.join(", ")}
                                </p>
                              </div>

                              <div className="flex items-center gap-2 mt-3">
                                <Clock className="w-4 h-4 text-blue-600" />
                                <span className="text-sm font-medium text-blue-600">
                                  {pos.serviceType || "Standard"} Delivery
                                  Available
                                </span>
                              </div>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                    ))}

                    {selectedDistrict && (
                      <RecenterMap
                        position={[
                          selectedDistrict.latitude,
                          selectedDistrict.longitude,
                        ]}
                      />
                    )}
                  </MapContainer>

                  {/* Map Controls */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
                    <button
                      onClick={() => mapRef.current?.zoomIn()}
                      className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg shadow-lg border border-gray-700 transition-colors"
                    >
                      <ZoomIn className="w-5 h-5 text-gray-300" />
                    </button>
                    <button
                      onClick={() => mapRef.current?.zoomOut()}
                      className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg shadow-lg border border-gray-700 transition-colors"
                    >
                      <ZoomOut className="w-5 h-5 text-gray-300" />
                    </button>
                    <button
                      onClick={() => {
                        if (mapRef.current) {
                          mapRef.current.flyTo(position, 10);
                        }
                      }}
                      className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg shadow-lg border border-gray-700 transition-colors"
                      title="Reset View"
                    >
                      <Navigation2 className="w-5 h-5 text-gray-300" />
                    </button>
                  </div>

                  {/* Selected District Info */}
                  {selectedDistrict && (
                    <div className="absolute bottom-4 left-4 right-4 bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-2xl z-[1000]">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-white">
                            {selectedDistrict.district}
                          </h3>
                          <p className="text-gray-400 text-sm mt-1">
                            {selectedDistrict.covered_area?.length} service
                            areas
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedDistrict(null)}
                          className="text-gray-400 hover:text-white"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedDistrict.covered_area
                          ?.slice(0, 5)
                          .map((area, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-xs"
                            >
                              {area}
                            </span>
                          ))}
                        {selectedDistrict.covered_area?.length > 5 && (
                          <span className="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">
                            +{selectedDistrict.covered_area.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Map Footer */}
                <div className="p-4 border-t border-gray-700 bg-gray-900/50">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-sm text-gray-400">
                      Showing{" "}
                      <span className="text-white font-medium">
                        {filteredData.length}
                      </span>{" "}
                      of{" "}
                      <span className="text-white font-medium">
                        {data.length}
                      </span>{" "}
                      districts
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFilteredData(data)}
                        className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg border border-gray-700 transition-colors"
                      >
                        Show All
                      </button>
                      <button
                        onClick={() => {
                          if (navigator.geolocation) {
                            navigator.geolocation.getCurrentPosition(
                              (pos) => {
                                const userPos = [
                                  pos.coords.latitude,
                                  pos.coords.longitude,
                                ];
                                if (mapRef.current) {
                                  mapRef.current.flyTo(userPos, 13);
                                }
                                toast.info("Zoomed to your location");
                              },
                              () => toast.error("Location access denied")
                            );
                          }
                        }}
                        className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-lg transition-colors flex items-center gap-2"
                      >
                        <Navigation2 className="w-4 h-4" />
                        My Location
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
