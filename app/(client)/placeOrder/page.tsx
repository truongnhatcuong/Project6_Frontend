"use client";
import { assets } from "@/app/assets/frontend_assets/assets";
import { ShopContext } from "@/app/context/ShopContext";
import CartTotal from "@/components/CartTotal";
import Title from "@/components/Title";
import React, { useContext, useState } from "react";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { router } = useContext(ShopContext);
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="THÔNG TIN" text2="GIAO HÀNG" />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Họ"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="Tên"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          type="email"
          placeholder=" email"
          className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
        />
        <input
          type="text"
          placeholder="đường"
          className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="thành phố"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
          <input
            type="text"
            placeholder="tiểu bang"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
        </div>
      </div>
      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1="PHƯƠNG THỨC" text2="THANH TOÁN" />
          {/* paymen method */}
          <div className="flex gap-3 flex-col sm:flex-row">
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
              onClick={() => setMethod("stripe")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-600" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo.src} className="h-5 mx-4" alt="" />
            </div>
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
              onClick={() => setMethod("razopay")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razopay" ? "bg-green-600" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo.src} className="h-5 mx-4" alt="" />
            </div>
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
              onClick={() => setMethod("cod")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-600" : ""
                }`}
              ></p>
              <p>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              className="py-3 px-14 text-sm bg-black text-white"
              onClick={() => router.push("/order")}
            >
              THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
