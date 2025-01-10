"use client";
import { ShopContext } from "@/app/context/ShopContext";
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface IList {
  _id: string;
  name: string;
  discription: string;
  price: number;
  image: string[];
  category: string;
  subCategory: string;
  sizes?: [];
}
const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const token = localStorage.getItem("token");
const Page = () => {
  const { currency } = useContext(ShopContext)!;
  const [list, setList] = useState<IList[] | []>([]);

  const listProdut = async () => {
    const res = await axios.get(`${BackendUrl}/api/product/list`);

    if (res.data.success) {
      setList(res.data.listProduct);
    } else {
      toast.error(res.data.error);
    }
  };
  useEffect(() => {
    listProdut();
  }, []);

  const removeSubmitHandle = async (productId: string) => {
    try {
      const res = await axios.post(
        `${BackendUrl}/api/product/remove`,
        { productId },
        {
          headers: {
            token,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        await listProdut();
      } else {
        toast.error(res.data.message);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.error);
    }
  };

  return (
    <>
      <p className="mb-2">All Product</p>
      <div className="flex flex-col gap-2">
        {/* list product */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-slate-100 text-sm ">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center ">Action</b>
        </div>
        {/* prodcut list */}
        {list.map((item, index) => (
          <div
            key={index}
            className=" grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img src={item.image[1]} alt="" className="w-12" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              className="text-right md:text-center cursor-pointer text-lg"
              onClick={() => removeSubmitHandle(item._id)}
            >
              X
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
