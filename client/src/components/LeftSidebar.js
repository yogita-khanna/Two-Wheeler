import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { IoHomeSharp } from "react-icons/io5";
import { FaInfoCircle, FaRegistered } from "react-icons/fa";
import { GiBuyCard } from "react-icons/gi";
import { RiContrastFill } from "react-icons/ri";
import { IoMdContact } from "react-icons/io";
import { MdFeedback } from "react-icons/md";
import { RiLoginCircleFill, RiLogoutCircleFill, RiMenuFill, RiCloseFill } from "react-icons/ri";

const LeftSidebar = () => {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await axios.get("https://two-wheeler-gilt.vercel.app/api/user/logout");
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && user.length > 10) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <div>
      <button
        className="fixed top-4 left-4 md:hidden z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <RiCloseFill size={24} /> : <RiMenuFill size={24} />}
      </button>
      <div
        className={`fixed top-0 left-0 w-[75%] sm:w-[50%] md:w-[25%] h-full bg-[#78350f] p-2 rounded-lg shadow-lg transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-40`}
      >
        <h1 className="p-2 font-semibold text-white text-3xl">Riders Services</h1>
        <div className="p-1 font-semibold text-white text-xl space-y-2">
          <Link to="/" className="rounded hover:bg-black hover:text-white flex p-2">
            <IoHomeSharp className="mt-1" />
            <h5 className="p-2">Home</h5>
          </Link>
          <Link to="/aboutus" className="rounded hover:bg-black hover:text-white flex p-2">
            <FaInfoCircle className="mt-1" />
            <h5 className="p-2">About Us</h5>
          </Link>
          <Link to="/gallery" className="rounded hover:bg-black hover:text-white flex p-2">
            <FaRegistered className="mt-1" />
            <h5 className="p-2">Renter Portal</h5>
          </Link>
          <Link to="/addrider" className="rounded hover:bg-black hover:text-white flex p-2">
            <RiContrastFill className="mt-1" />
            <h5 className="p-2">Owner Portal</h5>
          </Link>
          <Link to="/contactus" className="rounded hover:bg-black hover:text-white flex p-2">
            <IoMdContact className="mt-1" />
            <h5 className="p-2">Contact Us</h5>
          </Link>
          <Link to="/feedback" className="rounded hover:bg-black hover:text-white flex p-2">
            <MdFeedback className="mt-1" />
            <h5 className="p-2">Feedback</h5>
          </Link>
          {!isLoggedIn && (
            <>
              <Link to="/login" className="rounded hover:bg-black hover:text-white flex p-2">
                <RiLoginCircleFill className="mt-1" />
                <h5 className="p-2">Login</h5>
              </Link>
              <Link to="/register" className="rounded hover:bg-black hover:text-white flex p-2">
                <GiBuyCard className="mt-1" />
                <h5 className="p-2">Register</h5>
              </Link>
            </>
          )}
          {isLoggedIn && (
            <div className="rounded hover:bg-black hover:text-white flex p-2">
              <RiLogoutCircleFill className="mt-1" />
              <button onClick={handleLogout} className="p-2">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default LeftSidebar;
