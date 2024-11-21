"use client";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "@/app/context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { IProduct } from "@/app/Interface/IntefaceProduct";

const LatestCollection = () => {
  const { products } = useContext(ShopContext)!;
  const [latestProduct, setlatestProduct] = useState<IProduct[] | null>([]);

  useEffect(() => {
    setlatestProduct(products.slice(0, 10));
  }, [products]);
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text2="FASHION" text1="BỘ SIÊU TẬP" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700">
          Bộ siêu tập áo quần mới nhất đang chờ đón bạn! Khám phá những thiết kế
          đa dạng, từ áo thun đơn giản đến những chiếc áo sơ mi thanh lịch, cùng
          với quần tây, quần jeans chất lượng cao. Mỗi sản phẩm đều được chọn
          lọc kỹ lưỡng để mang lại cho bạn vẻ ngoài thời trang và thoải mái
          nhất. Đừng bỏ lỡ cơ hội làm mới tủ đồ của bạn ngay hôm nay!
        </p>
      </div>
      {/* rendering product */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
        {latestProduct?.map((item) => (
          <ProductItem {...item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
