/* eslint-disable @next/next/no-img-element */

import { assets } from "@/app/assets/frontend_assets/assets";
import React from "react";

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-10 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 ">
      {/* Exchange */}
      <div>
        <img
          src={assets.exchange_icon.src}
          alt=""
          className="w-12 m-auto mb-5  hover:rotate-360  transition-transform hover:scale-150"
        />
        <p className="font-medium">Chính Sách Đổi Trả </p>
        <p className="text-gray-600">
          Dễ Dàng Đổi trả khi hàng mắc khâu lỗi của Shop
        </p>
      </div>
      {/* return 7d */}

      <div>
        <img
          src={assets.quality_icon.src}
          alt=""
          className="w-12 m-auto mb-5  hover:rotate-360  transition-transform hover:scale-150"
        />
        <p className="font-medium">Trả Hàng Trong Vòng 7 ngày </p>
        <p className="text-gray-600">
          Chúng Tôi Sẽ Hỗ Trở Đổi Trả Hàng Nếu Gặp Hàng Lỗi
        </p>
      </div>

      {/* support */}
      <div>
        <img
          src={assets.support_img.src}
          alt=""
          className="w-10 m-auto mb-5  hover:rotate-360  transition-transform hover:scale-150"
        />
        <p className="font-medium">Hỗ Trợ Khách Hàng</p>
        <p className="text-gray-600">
          Chúng Tôi làm Việc 24/7 Để Hỗ Trợ Khách Hàng Tốt Nhất
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
