"use client";
import { createContext, ReactNode } from "react";
import { StaticImageData } from "next/image";
import { products } from "../assets/frontend_assets/assets";

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

interface IShopContext {
  products: IProduct[];
  currency: string;
  delivery_fee: number;
}

export const ShopContext = createContext<IShopContext | null>(null);

interface ShopContextProviderProps {
  children: ReactNode;
}

const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const currency = "$";
  const delivery_fee = 10;

  const value: IShopContext = {
    products: products as IProduct[], // Đảm bảo products được định nghĩa chính xác
    currency,
    delivery_fee,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
