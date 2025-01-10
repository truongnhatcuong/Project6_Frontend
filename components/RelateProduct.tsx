"use client";
import { ShopContext } from "@/app/context/ShopContext";
import { IProduct } from "@/app/Interface/IntefaceProduct";
import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import ProductItem from "./ProductItem";

export interface IProductRelate {
  category: string;
  subCategory: string;
}

const RelateProduct = ({ category, subCategory }: IProductRelate) => {
  const { product } = useContext(ShopContext);
  const [relate, setRelate] = useState<IProduct[]>([]);

  useEffect(() => {
    if (product.length > 0) {
      let RelateProduct = [...product];
      RelateProduct = RelateProduct.filter(
        (item) => item.category === category
      );
      RelateProduct = RelateProduct.filter(
        (item) => item.subCategory === subCategory
      );
      setRelate(RelateProduct.slice(0, 5));
    }
  }, [category, product, subCategory]);
  return (
    <div className="mt-24">
      <div className="text-center text-3xl py-2">
        <Title text1="SẢN PHẨM" text2="LIÊN QUAN" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relate.map((item, index) => (
          <ProductItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default RelateProduct;
