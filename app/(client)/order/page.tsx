/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ShopContext } from "@/app/context/ShopContext";
import Title from "@/components/Title";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

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
  paymentMethod: string;
  status: string;
}

const Page = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [order, setOrder] = useState<IProduct[] | null>(null);
  const fetchApiOrder = async () => {
    if (!token) {
      return null;
    }
    const res = await axios.post(
      `${backendUrl}/api/order/userorders`,
      {},
      { headers: { token } }
    );

    if (res.data.success) {
      let allOrderItem: any = [];
      res.data.order.map((orders: any) => {
        orders.items.map((item: any) => {
          item["status"] = orders.status;
          item["payment"] = orders.payment;
          item["paymentMethod"] = orders.paymentMethod;
          item["date"] = orders.date;
          allOrderItem.push(item);
        });
      });
      console.log("allOrderItem after processing", allOrderItem);
      setOrder(allOrderItem.reverse());
    } else {
    }
  };

  useEffect(() => {
    fetchApiOrder();
  }, [token]);
  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="ĐƠN HÀNG" text2="CỦA TÔI" />
      </div>
      <div>
        {order?.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img src={item.image[0]} className="w-16 sm:w-20" alt="" />

              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text">
                  <p className="text-lg ">
                    {item.price}
                    {currency}
                  </p>
                  <p> {item.quantity}</p>
                  <p>{item.sizes}</p>
                </div>

                <p className="mt-2">
                  date :
                  <span className="text-gray-400">
                    {new Date(item.date).toDateString()}
                  </span>
                </p>
                <p className="mt-2">
                  Payment :
                  <span className="text-gray-400">{item.paymentMethod}</span>
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-600"></p>
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button className="border px-4 py-2 text-sm font-medium rounded-sm ">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
