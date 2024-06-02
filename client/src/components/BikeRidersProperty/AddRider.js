import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import LeftSidebar from "../LeftSidebar";
import { useNavigate } from "react-router-dom";
import Login from "../Login/Login";
axios.defaults.baseURL = "https://two-wheeler-three.vercel.app";

function BikeRiders() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [preOwned, setPreOwned] = useState(0);
  const [findLatitude, setFindLatitude] = useState("");
  const [findLongitude, setFindLongitude] = useState("");
  const [nearestRiders, setNearestRiders] = useState([]);
  const [error, setError] = useState("");

  if (!localStorage.getItem("user")) {
    console.log(navigate);
    // navigate("/login");
    return(
      <div>
        <Login/>
      </div>
    )
  }
  const addRider = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/api/riders", { name, latitude, longitude, preOwned });
      console.log("Adding rider URL:", "/api/riders");

      alert("Rider added successfully!");
      setName("");
      setLatitude("");
      setLongitude("");
      setPreOwned(0);
    } catch (err) {
      console.error("Error adding rider:", err); // Log the error
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  const isValidLatitude = (lat) => {
    return lat >= -90 && lat <= 90;
  };

  const isValidLongitude = (lng) => {
    return lng >= -180 && lng <= 180;
  };

  return (
    <div>
      <LeftSidebar />
      <div className="ml-[25%] w-[75%] container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4">Bike Riders</h1>

        <div className="my-8">
          <h2 className="text-2xl font-semibold mb-4">Add Rider</h2>
          <form onSubmit={addRider} className="space-y-4">
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">
                Name of the bike:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded-md px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Pre-Owned:</label>
              <input
                type="number"
                value={preOwned}
                onChange={(e) => setPreOwned(e.target.value)}
                className="border rounded-md px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Latitude:</label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                className="border rounded-md px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-lg font-medium mb-2">Longitude:</label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                className="border rounded-md px-4 py-2 focus:border-blue-500 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add Rider
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BikeRiders;