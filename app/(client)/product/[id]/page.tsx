/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { assets } from "@/app/assets/frontend_assets/assets";
import { ShopContext } from "@/app/context/ShopContext";
import { IProduct } from "@/app/Interface/IntefaceProduct";
import RelateProduct from "@/components/RelateProduct";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { id } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext)!;
  const [productData, setProductData] = useState<IProduct | null>(null);
  const [image, setImage] = useState<string>("");
  const [size, setSize] = useState<string>("");

  const CallFetch = async () => {
    products.map((item) => {
      if (item._id === id) {
        setProductData(item);
        setImage(item.image[0].src);

        return null;
      }
    });
  };
  useEffect(() => {
    CallFetch();
  }, [id]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/*-------------------------- Product data --------------------------*/}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                src={item.src}
                onClick={() => setImage(item.src)}
                alt=""
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={image} alt="" className="w-full h-auto " />
          </div>
        </div>
        {/* -------------------------product info -------------------------------*/}
        <div className="flex-1 ">
          <h1 className="font-medium text-2xl mt-2"> {productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon.src} alt="" className="w-3 5" />
            <img src={assets.star_icon.src} alt="" className="w-3 5" />
            <img src={assets.star_icon.src} alt="" className="w-3 5" />
            <img src={assets.star_icon.src} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon.src} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {productData.price}
            {currency}
          </p>
          <p className="mt-5 text-gray-500 text-sm md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Chọn Kích Cỡ</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-3.5  bg-slate-100 ${
                    item === size ? " border border-black" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          {/* adđ to cart */}
          <button
            onClick={() => addToCart(productData._id, productData.sizes)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-slate-700"
          >
            GIỎ HÀNG
          </button>
          <hr className="mt-8 sm:w-4/5 " />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% chính hãng</p>
            <p>thanh toán và kiểm tra hàng khi nhận </p>
            <p> chính sách đổi trả dễ dàng trong vòng 7 ngày</p>
          </div>
        </div>
      </div>
      {/* mô tả và đánh giá */}
      <div className="mt-20">
        <div className="flex">
          <p className="border py-3 px-6">Mô Tả</p>
          <p className="border py-3 px-6">Đánh Giá (99)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            Áo là một trang phục phổ biến trong tủ đồ của mọi người, được thiết
            kế để che phủ phần thân trên của cơ thể. Nó có thể được làm từ nhiều
            loại chất liệu khác nhau như cotton, polyester, len, lụa, hay vải
            tổng hợp, mang đến nhiều sự lựa chọn về cảm giác thoải mái và tính
            năng của áo
          </p>
          <p>
            Mục đích sử dụng: Chế độ thời tiết: Áo được thiết kế để phù hợp với
            thời tiết và khí hậu, từ áo mỏng nhẹ cho mùa hè đến áo khoác ấm áp
            cho mùa đông. Phong cách: Mỗi loại áo mang một phong cách riêng, từ
            trang trọng, thanh lịch cho đến thoải mái, năng động. Hoạt động: Tùy
            thuộc vào nhu cầu, bạn có thể chọn áo phù hợp cho các hoạt động như
            đi làm, đi chơi, thể thao, hoặc tham gia các sự kiện.
          </p>
        </div>
      </div>
      {/* danh sách liên quan đến sản phẩm */}
      <RelateProduct
        subCategory={productData.subCategory}
        category={productData.category}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Page;
