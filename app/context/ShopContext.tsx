/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
"use client";
import { createContext, ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

interface IProduct {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  quantity: number;
  subCategory: string;
  sizes: string[] | string;
  date: number;
  bestseller: boolean;
}

interface IShopContext {
  product: IProduct[];
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: (value: string) => void;
  setShowSearch: (value: boolean) => void;
  showSearch: boolean;
  addToCart: (itemId: string, size: string) => void;
  cartItem: any; // Lưu trữ theo sản phẩm và kích cỡ
  setCartItem: (values?: string | any) => any;
  getCartCount: () => number;
  UpdateCart: (itemId: string, size: string, quantily: number) => any;
  getCartAmount: any;
  router: any;
  token: string;
  setToken: any;
  backendUrl: string | null;
}

// giá trị mặc định

export const ShopContext = createContext<IShopContext>(null!) || null;

interface ShopContextProviderProps {
  children: ReactNode;
}

const ShopContextProvider = ({ children }: ShopContextProviderProps) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(true);
  const [cartItem, setCartItem] = useState<any>({});
  const [product, setProduct] = useState<IProduct[]>([]);
  const [token, setToken] = useState<string>("") || "";
  const router = useRouter();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

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
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error: any) {
        toast.error(error.message);
      }
    }
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

  const UpdateCart = async (itemId: string, size: string, quantity: number) => {
    const CartData = JSON.parse(JSON.stringify(cartItem));
    CartData[itemId][size] = quantity;
    setCartItem(CartData);
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error: any) {
        console.log(error);
        toast.error(error);
      }
    }
  };

  //get cartUserName
  const getUserCart = async (token: any) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setCartItem(res.data.cartData);
      } else {
        toast.error(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getCartAmount = () => {
    let totalAmont = 0;
    for (const items in cartItem) {
      let itemInfor = product.find((product) => product._id === items);
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

  const FetchApi = async () => {
    const res = await axios.get(`${backendUrl}/api/product/list`);
    if (res.data.success) {
      setProduct(res.data.listProduct);
    }
  };

  useEffect(() => {
    FetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token")!);
      getUserCart(localStorage.getItem("token"));
    }
  }, []);
  const value: IShopContext = {
    product: product, // Đảm bảo products được định nghĩa chính xác
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
    token,
    setToken,
    backendUrl,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
