import React, { useState } from "react";
import { Menu, X, House, Info, LogIn, UserPlus, Map } from "lucide-react";
import { NavLink } from "react-router";

const Navvar = () => {
  const [toggle, setToggle] = useState(true);

  const activeClass =
    "border-b-2 border-[#632ee3] bg-clip-text bg-gradient-to-r from-[#632ee3] to-[#9f62f2] text-purple-700 font-bold";

  // Public Nav Items
  const publicItems = [
    { name: "Home", path: "/", icon: <House size={18} /> },
    { name: "Coverage", path: "/coverage", icon: <Map size={18} /> },
    { name: "About Us", path: "/about", icon: <Info size={18} /> },
  ];

  // Auth based Nav Items
  const authItems = [
    { name: "Login", path: "/login", icon: <LogIn size={18} /> },
    { name: "Register", path: "/register", icon: <UserPlus size={18} /> },
  ];

  return (
    <nav className="p-5 bg-gray-50 shadow-md">
      <div className="flex justify-between items-center text-xl font-bold">
        {/* Logo & Mobile Toggle */}
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <button onClick={() => setToggle(!toggle)}>
              {toggle ? <Menu /> : <X />}
            </button>
          </div>

          <NavLink to="/" className="flex gap-2 items-center">
            <span className="text-2xl bg-clip-text bg-gradient-to-r from-[#632ee3] to-[#9f62f2] text-transparent">
              HERO.IO
            </span>
          </NavLink>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute left-0 w-full bg-gray-200 p-5 transition-all duration-300 ${
            toggle ? "-top-96" : "top-16"
          }`}
        >
          {[...publicItems, ...authItems].map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                isActive ? activeClass : "block py-2"
              }
              onClick={() => setToggle(true)}
            >
              <span className="flex gap-2 items-center">
                {item.icon}
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          {publicItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => (isActive ? activeClass : "")}
            >
              <span className="flex gap-1 items-center">
                {item.icon}
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>

        {/* Right Side (Auth / Github) */}
        <div className="hidden md:flex gap-4 items-center">
          {authItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => (isActive ? activeClass : "")}
            >
              <span className="flex gap-1 items-center">
                {item.icon}
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navvar;
