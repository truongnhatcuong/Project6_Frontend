"use client";
import { assets } from "@/app/assets/admin_assets/assets";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBar = () => {
  const path = usePathname();
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <Link
          href={"/admin/add"}
          className={`flex  border-gray-300 border border-r-0 py-2 px-3 items-center gap-3 ${
            path === "/admin/add" ? "bg-pink-100" : ""
          }`}
        >
          <img src={assets.add_icon.src} alt="" className="h-5 w-5" />
          <p className="hidden md:block">thêm sản phẩm</p>
        </Link>
        <Link
          href={"/admin/listitem"}
          className={`flex  border-gray-300 border border-r-0 py-2 px-3 items-center gap-3 ${
            path === "/admin/listitem" ? "bg-pink-100" : ""
          }`}
        >
          <img src={assets.order_icon.src} alt="" className="h-5 w-5" />
          <p className="hidden md:block">Danh sách sản phẩm</p>
        </Link>
        <Link
          href={"/admin/order"}
          className={`flex  border-gray-300 border border-r-0 py-2 px-3 items-center gap-3 ${
            path === "/admin/order" ? "bg-pink-100" : ""
          }`}
        >
          <img src={assets.order_icon.src} alt="" className="h-5 w-5" />
          <p className="hidden md:block">Đơn Hàng</p>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
