"use client";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "@/app/context/ShopContext";
import Title from "./Title";
import { StaticImageData } from "next/image";
import ProductItem from "./ProductItem";

interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: StaticImageData[];
  category: string;
  subCategory: string;
  sizes: string[];
  date: number;
  bestseller: boolean;
}
const LatestCollection = () => {
  const { products } = useContext(ShopContext)!;
  const [latestProduct, setlatestProduct] = useState<IProduct[] | null>([]);

  useEffect(() => {
    setlatestProduct(products.slice(0, 10));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur
          fugit dignissimos ducimus sint adipisci praesentium, ipsam alias sed
          facilis culpa suscipit magnam, iusto et unde. Reiciendis deleniti eius
          voluptates necessitatibus?
        </p>
      </div>
      {/* rendering product */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 mx-16">
        {latestProduct?.map((item) => (
          <ProductItem {...item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
