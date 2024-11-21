"use client";
import { ShopContext } from "@/app/context/ShopContext";
import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { IProduct } from "@/app/Interface/IntefaceProduct";

// eslint-disable-next-line react-hooks/rules-of-hooks

const BestSeller = () => {
  const { products } = useContext(ShopContext)!;
  const [BestSeller, setBestSeller] = useState<IProduct[] | []>([]);

  useEffect(() => {
    const bestSellerProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestSellerProduct.slice(0, 5));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="Giảm Giá" text2="Ưu Đãi Lớn" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500 ">
          Các sản phẩm này luôn có nhu cầu cao và được nhiều người tìm kiếm.
          Chúng tôi luôn cập nhật danh sách các sản phẩm bán chạy nhất để bạn có
          thể dễ dàng lựa chọn những mặt hàng phù hợp.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 gap-4 gap-y-6 ">
        {BestSeller.map((item) => (
          <ProductItem key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
