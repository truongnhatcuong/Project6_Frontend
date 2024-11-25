/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
"use client";
import { createContext, ReactNode, useState } from "react";
import { StaticImageData } from "next/image";
import { products } from "../assets/frontend_assets/assets";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
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
  addToCart: (itemId: string, size: string) => void;
  cartItem: any; // Lưu trữ theo sản phẩm và kích cỡ
  setCartItem: (values?: string) => any;
  getCartCount: () => number;
  UpdateCart: (itemId: string, size: string, quantily: number) => any;
  getCartAmount: any;
  router: any;
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
  const router = useRouter();
  const addToCart = async (itemId: string, size: any) => {
    if (!size) {
      toast.error("vui lòng chọn size");
      return;
    }
    let cartData = JSON.parse(JSON.stringify(cartItem));

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

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          totalCount += cartItem[items][item];
        }
      }
    }
    return totalCount;
  };

  const UpdateCart = (itemId: string, size: string, quantily: number) => {
    const CartData = JSON.parse(JSON.stringify(cartItem));
    CartData[itemId][size] = quantily;
    setCartItem(CartData);
  };

  const getCartAmount = () => {
    let totalAmont = 0;
    for (const items in cartItem) {
      let itemInfor = products.find((product) => product._id === items);
      if (!itemInfor?.price) {
        return;
      }
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          totalAmont += itemInfor?.price * cartItem[items][item];
        }
      }
    }
    return totalAmont;
  };

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
    getCartCount,
    UpdateCart,
    getCartAmount,
    router,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
