"use client";
import React from "react";

const NewLetterBox = () => {
  const HanleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800 ">
        Theo Dõi Page & Để Nhận voucher 20%{" "}
      </p>
      <p className="text-gray-600 mt-3">
        Nhanh Tay Là Người Đầu Tiên Theo Dõi Và Nhận Mã Giảm Giá Từ Shop Lên Đến
        99%
      </p>
      <form
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 "
        onSubmit={HanleSubmit}
      >
        <input
          type="email"
          className="w-full sm:flex-1 outline-none text-gray-700"
          placeholder="Nhập Email ...."
        />
        <button
          className="bg-black text-white text-sm px-10 py-4"
          type="submit"
        >
          Follow Now
        </button>
      </form>
    </div>
  );
};

export default NewLetterBox;
