/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { usePathname } from "next/navigation";
import { FaRegUser } from "react-icons/fa6";
import { IoSearchOutline, IoChevronBackOutline } from "react-icons/io5";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HiMenu } from "react-icons/hi";
import { ShopContext } from "@/app/context/ShopContext";

const menuItems = [
  { name: "TRANG CHỦ", link: "/" },
  { name: "BỘ SIÊU TẬP", link: "/collection" },
  { name: "GIỚI THIỆU", link: "/about" },
  { name: "LIÊN LẠC", link: "/contact" },
];

const NavBar = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState<boolean>(false);
  const { setShowSearch } = useContext(ShopContext);

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <Link href={"/"}>
        <img
          src="https://designercomvn.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2018/12/06090103/logo-shop-qu%E1%BA%A7n-%C3%A1o-8.png"
          alt=""
          className="w-20 h-20"
        />
      </Link>
      <ul className="hidden sm:flex gap-5 text-gray-700 mr-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.link}
            className="flex flex-col items-center gap-1"
          >
            <p>{item.name}</p>
            <hr
              className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${
                pathname === item.link ? "block" : "hidden"
              }`}
            />
          </Link>
        ))}
      </ul>
      <div className="flex items-center gap-6 ">
        <IoSearchOutline
          className="text-2xl cursor-pointer mr-3 "
          onClick={() => setShowSearch(true)}
        />
        <div className="group relative">
          <FaRegUser className="text-xl cursor-pointer mr-3" />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-50 text-gray-500 rounded-md">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Order</p>
              <p className="cursor-pointer hover:text-black">LogOut</p>
            </div>
          </div>
        </div>

        <Link href={"/cart"} className="relative">
          <HiOutlineShoppingBag className="text-2xl cursor-pointer mr-5" />
          <p
            className="absolute right-[-5px] bottom-[-5px] w-4 text-center 
            leading-4 bg-black text-white rounded-full aspect-square text-[8px] mr-5 "
          >
            10
          </p>
        </Link>
        <HiMenu
          className="text-3xl cursor-pointer sm:hidden mr-2"
          onClick={() => setVisible(true)}
        />
      </div>
      {/* Sibar Menu for small screen */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        } `}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center text-gray-600 gap-4 py-7 cursor-pointer"
            onClick={() => setVisible(false)}
          >
            <IoChevronBackOutline className="ml-3 rotate-180" />
            <p>BACK</p>
          </div>
          {menuItems.map((item) => (
            <Link
              href={item.link}
              onClick={() => setVisible(false)}
              key={item.name}
              className={`py-2 pl-6 border ${
                pathname === item.link ? "bg-black text-white" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
