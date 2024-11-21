/* eslint-disable prefer-const */
"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
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
  search: string;
  setSearch: (value: string) => void;
  setShowSearch: (value: boolean) => void;
  showSearch: boolean;
  addToCart: (itemId: any, size: any) => void;
  cartItem: any; // Lưu trữ theo sản phẩm và kích cỡ
  setCartItem: (values?: string) => any;
}

// giá trị mặc định

export const ShopContext = createContext<IShopContext>(null!);

interface ShopContextProviderProps {
  children: ReactNode;
}

const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const [cartItem, setCartItem] = useState<any>({});

  const addToCart = async (itemId: number, size: number) => {
    let cartData = structuredClone(cartItem);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    setCartItem(cartData);
  };
  useEffect(() => {
    console.log(cartItem);
  }, [cartItem]);

  const value: IShopContext = {
    products: products, // Đảm bảo products được định nghĩa chính xác
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addToCart,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
