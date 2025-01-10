import { assets } from "@/app/assets/admin_assets/assets";
import React from "react";

const NavBar = () => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img src={assets.logo.src} alt="" className="w-[max(10%,80px)]" />
      <button className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm">
        Logout
      </button>
    </div>
  );
};

export default NavBar;
