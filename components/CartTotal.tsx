import { ShopContext } from "@/app/context/ShopContext";
import React, { useContext } from "react";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1="Tổng Tiền" text2="Giỏ hàng" />
      </div>
      <div className="flex flex-col gap-3 mt-2 text-sm">
        <div className="flex justify-between ">
          <p> thành tiền</p>
          <p>
            {getCartAmount()}.00{currency}
          </p>
        </div>

        <hr />
        <div className="flex justify-between ">
          <p>Phí giao hàng</p>
          <p>
            {delivery_fee}.00{currency}
          </p>
        </div>
        <hr />
        <div className="flex justify-between  font-semibold">
          <p className="">Total</p>
          <p className="">
            {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
            {currency}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
