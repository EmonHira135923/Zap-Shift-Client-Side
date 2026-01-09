import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import axios from "axios";
import { toast } from "react-toastify";
const Coverage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const position = [51.505, -0.09];

  useEffect(() => {
    axios
      .get("/Ourservices.json")
      .then((data) => {
        console.log("our services", data.data);
        setData(data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Services Error Finding");
        throw new Error("Error Finding", err.message);
      });
  }, []);

  return (
    <section>
      <div className="h-[800px]">
        <MapContainer
          center={position}
          zoom={10}
          scrollWheelZoom={false}
          className="h-[800px]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </section>
  );
};

export default Coverage;
