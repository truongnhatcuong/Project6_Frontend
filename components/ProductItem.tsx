/* eslint-disable @next/next/no-img-element */
import { ShopContext } from "@/app/context/ShopContext";
import { StaticImageData } from "next/image";
import Link from "next/link";

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
import React, { useContext } from "react";

const ProductItem = ({ _id, name, image, price }: IProduct) => {
  const { currency } = useContext(ShopContext)!;
  return (
    <Link href={`/product/${_id}`} className="text-gray-700 cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={image[0].src}
          alt=""
          className="hover:scale-110 transition ease-in-out"
        />
        <p className="pt-3 pb-1 text-sm">{name}</p>
        <p className="text-sm font-medium ">
          {price}
          {currency}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
