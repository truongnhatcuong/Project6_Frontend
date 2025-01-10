"use client";
import { assets } from "@/app/assets/frontend_assets/assets";
import { ShopContext } from "@/app/context/ShopContext";
import CartTotal from "@/components/CartTotal";
import Title from "@/components/Title";

import React, { useContext, useEffect, useState } from "react";

interface ICart {
  _id: string;
  size: string;
  quantily: number;
}
const Page = () => {
  const { product, cartItem, currency, UpdateCart, router } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState<ICart[] | []>([]);

  useEffect(() => {
    if (product.length > 0) {
      const itemData = [];

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            itemData.push({
              _id: items,
              size: item,
              quantily: cartItem[items][item],
            });
          }
        }
      }

      setCartData(itemData);
    }
  }, [cartItem, product]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="Danh Mục" text2="Giỏ Hàng" />
      </div>
      <div>
        {cartData?.map((item: ICart, index: number) => {
          const productData = product.find((prd) => prd._id === item._id);
          return (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center"
            >
              <div className="flex items-start gap-6">
                <img
                  src={productData?.image[0]}
                  alt=""
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {productData?.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2 ">
                    <p>
                      {productData?.price}
                      {currency}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border border-gray-50 text-gray-700 bg-slate-50">
                      {item?.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                className="max-w-10 sm:max-w-20 border px-1 sm:px-2 py-1  "
                type="number"
                min={1}
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : UpdateCart(item._id, item.size, Number(e.target.value))
                }
                defaultValue={item.quantily}
              />
              <img
                onClick={() => UpdateCart(item._id, item.size, 0)}
                src={assets.bin_icon.src}
                className="w-4 sm:w-5 cursor-pointer"
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20 ">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="text-end w-full">
            <button
              type="submit"
              className="bg-black text-white text-sm py-3 px-8 my-8"
              onClick={
                cartData?.length === 0
                  ? undefined
                  : () => router.push("/placeOrder")
              }
            >
              THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
