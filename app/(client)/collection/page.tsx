/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { assets } from "@/app/assets/frontend_assets/assets";
import { ShopContext } from "@/app/context/ShopContext";
import Title from "@/components/Title";
import React, { useContext, useEffect, useState } from "react";
import { IProduct } from "@/app/Interface/IntefaceProduct";
import ProductItem from "@/components/ProductItem";
const Page = () => {
  const context = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filterProduct, setFilterProduct] = useState<IProduct[] | null>(null);
  const [fillterCategory, setFillterCategory] = useState<string[]>([]);
  const [subFillterCategory, setSubFillterCategory] = useState<string[]>([]);
  const [sortProduct, setSortProduct] = useState<string>("Relavent") || "";
  if (!context) {
    return (
      <div className="text-center text-sm text-gray-700">không có danh mục</div>
    );
  }
  const { products, search, showSearch } = context || { products: [] };

  // lọc theo tên danh mục
  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFillterCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  const FitterHandle = () => {
    let ApplyProduct = products.slice();

    if (showSearch && search) {
      ApplyProduct = ApplyProduct.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (fillterCategory.length > 0) {
      ApplyProduct = ApplyProduct.filter((item) =>
        fillterCategory.includes(item.category)
      );
    }

    if (subFillterCategory.length > 0) {
      ApplyProduct = ApplyProduct.filter((item) =>
        subFillterCategory.includes(item.subCategory)
      );
    }

    setFilterProduct(ApplyProduct);
  };

  // lọc theo tên kiểu loại
  const toggleSubCategory = (e: any) => {
    const value = e.target.value;
    setSubFillterCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // sắp xếp
  const SortProductHandle = () => {
    if (sortProduct && filterProduct) {
      // eslint-disable-next-line prefer-const
      let sortHandle = filterProduct.slice();
      if (sortProduct == "low-hight") {
        sortHandle?.sort((a, b): number => a.price - b.price).reverse();
      } else if (sortProduct == "hight-low") {
        sortHandle?.sort((a, b): number => a.price - b.price);
      } else if (sortProduct === "Relavent") {
        FitterHandle();
        return;
      }
      setFilterProduct(sortHandle);
    }
  };

  useEffect(() => {
    setFilterProduct(products);
  }, []);

  useEffect(() => {
    FitterHandle();
  }, [fillterCategory, subFillterCategory, search, showSearch]);

  useEffect(() => {
    SortProductHandle();
  }, [sortProduct]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t w-full ">
      {/* Lựa Chọn Lọc */}
      <div className="w-1/6">
        <p className="my-2 text-xl flex items-center cursor-pointer gap-2">
          FILTERS
          <img
            src={assets.dropdown_icon.src}
            alt=""
            onClick={() => setShowFilter(!showFilter)}
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* lọc theo Category */}
        <div
          className={`border border-gray-500 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">DANH MỤC</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 "
                value={"Men"}
                onChange={toggleCategory}
              />
              NAM
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 "
                value={"Women"}
                onChange={toggleCategory}
              />
              NỮ
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 "
                value={"Kids"}
                onChange={toggleCategory}
              />
              Trẻ Em
            </p>
          </div>
        </div>
        {/* danh mục nhỏ */}
        <div
          className={`border border-gray-500 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">LOẠI KIỂU</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 "
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Áo khoác
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 "
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              quần
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3 "
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Đồ Mùa đông
            </p>
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="flex-1 w-5/6">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="Tất Cả" text2="Bộ Siêu Tập" />
          {/* product sort */}
          <select
            className="border-2 border-gray-300 text-sm px-2"
            onChange={(e) => setSortProduct(e.target.value)}
          >
            <option value="Relavent">Sắp Xếp : Liên Quan</option>
            <option value="low-hight">Sắp Xếp : GIá Cao Đến Thấp</option>
            <option value="hight-low">Sắp Xếp : Giá Thấp Đến Cao</option>
          </select>
        </div>
        {/* render Product */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProduct?.map((item, index) => (
            <ProductItem key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
