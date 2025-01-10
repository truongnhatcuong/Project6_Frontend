/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { assets } from "@/app/assets/admin_assets/assets";
import { ShopContext } from "@/app/context/ShopContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Address {
  firtName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  phone: string;
}

interface Item {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  bestseller: boolean;
  sizes: string;
  date: number;
  __v: number;
  quantity: number;
}

interface Order {
  _id: string;
  userId: string;
  items: Item[];
  amount: number;
  address: Address;
  status: string;
  paymentMethod: string;
  payment: boolean;
  date: number;
  __v: number;
}

const Page = () => {
  const token = localStorage.getItem("tokenadmin");
  const [orders, setOrders] = useState<Order[]>([]);
  const { backendUrl } = useContext(ShopContext);
  const featchApiOrder = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error(res.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error);
    }
  };

  const StatusHandler = async (e: any, orderId: string) => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/order/status`,
        {
          orderId,
          status: e.target.value,
        },
        { headers: { token } }
      );
      if (res.data.success) {
        await featchApiOrder();
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  useEffect(() => {
    featchApiOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 px-5 md:p-8 my-3 md:my-4 sm:text-sm text-gray-700 "
          >
            <img
              src={assets.parcel_icon.src}
              alt="Parcel Icon"
              className="w-20"
            />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p key={index}>
                        {item.name} x {item.quantity}
                        <span>{item.sizes}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={index}>
                        {item.name} x {item.quantity}
                        <span>{item.sizes}</span>
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">
                {order.address.firtName + " " + order.address.lastName}
              </p>
              <div>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    "," +
                    order.address.state +
                    "," +
                    order.address.country +
                    "," +
                    order.address.zipcode}
                </p>
              </div>
              <p>{order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">
                Item : {order.items.length}
              </p>
              <p className="mt-3 ">METHOD :{order.paymentMethod}</p>
              <p>Payment :{order.payment ? "Done" : "Pending"}</p>
              <p>date :{new Date(order.date).toDateString()}</p>
              <p></p>
            </div>
            <p className="text-sm sm:text-[15px]">${order.amount}</p>
            <select
              onChange={(e) => StatusHandler(e, order._id)}
              value={order.status}
              className="p-2 font-semibold"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
