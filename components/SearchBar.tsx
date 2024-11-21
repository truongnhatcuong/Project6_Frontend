"use client";
/* eslint-disable @next/next/no-img-element */
import { assets } from "@/app/assets/frontend_assets/assets";
import { ShopContext } from "@/app/context/ShopContext";
import React, { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext)!;
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [pathname, showSearch]);
  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="tìm kiếm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <img src={assets.search_icon.src} alt="" className="w-4" />
      </div>
      <img
        onClick={() => setShowSearch(!showSearch)}
        src={assets.cross_icon.src}
        alt=""
        className="inline w-3 cursor-pointer"
      />
    </div>
  ) : null;
};

export default SearchBar;
