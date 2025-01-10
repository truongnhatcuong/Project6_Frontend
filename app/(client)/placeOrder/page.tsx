/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { assets } from "@/app/assets/frontend_assets/assets";
import { ShopContext } from "@/app/context/ShopContext";
import CartTotal from "@/components/CartTotal";
import Title from "@/components/Title";
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    product,
    cartItem,
    router,
    getCartAmount,
    delivery_fee,
    backendUrl,
    token,
    setCartItem,
  } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firtName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = async (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };
  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              product.find((prd) => prd._id === items)
            );
            if (itemInfo) {
              itemInfo.sizes = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        case "cod":
          const res = await axios.post(
            `${backendUrl}/api/order/place`,
            orderData,
            { headers: { token } }
          );
          console.log(res.data.success);

          if (res.data.success) {
            setCartItem({});
            router.push("/order");
          } else {
            toast.error(res.data.message);
          }
          break;
        case "stripe":
          const resStripe = await axios.post(
            `${backendUrl}/api/order/stripe`,
            orderData,
            { headers: { token } }
          );
          if (resStripe.data.success) {
            const { session_url } = resStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(resStripe.data.message);
          }
      }
    } catch (error: any) {
      toast.error(error);
    }
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      {/* left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="THÔNG TIN" text2="GIAO HÀNG" />
        </div>
        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="firtName"
            value={formData.firtName}
            type="text"
            placeholder="Họ"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            type="text"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            placeholder="Tên"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder=" email"
          className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
        />
        <input
          required
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="đường"
          className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
        />

        <div className="flex gap-3">
          <input
            required
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="thành phố"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="state"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="tiểu bang"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="text"
            placeholder="zipcode"
            className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
          />
        </div>
        <input
          required
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="text"
          placeholder="phone"
          className="border border-gray-400 rounded py-1.5 px-3.5 w-full"
        />
      </div>
      {/* right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1="PHƯƠNG THỨC" text2="THANH TOÁN" />
          {/* paymen method */}
          <div className="flex gap-3 flex-col sm:flex-row">
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
              onClick={() => setMethod("stripe")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-600" : ""
                }`}
              ></p>
              <img src={assets.stripe_logo.src} className="h-5 mx-4" alt="" />
            </div>
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
              onClick={() => setMethod("razopay")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razopay" ? "bg-green-600" : ""
                }`}
              ></p>
              <img src={assets.razorpay_logo.src} className="h-5 mx-4" alt="" />
            </div>
            <div
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer "
              onClick={() => setMethod("cod")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-600" : ""
                }`}
              ></p>
              <p>CASH ON DELIVERY</p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              className="py-3 px-14 text-sm bg-black text-white"
              type="submit"
            >
              THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
