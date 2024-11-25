import { assets } from "@/app/assets/frontend_assets/assets";
import NewLetterBox from "@/components/NewLetterBox";
import Title from "@/components/Title";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t uppercase">
        <Title text1="phần" text2="giới thiệu" />
      </div>
      <div className="my-10 flex flex-col sm:flex-row gap-16">
        <img
          src={assets.about_img.src}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 ">
          <p>
            MIKENCO AIMS TO BECOME VIETNAM’S LEADING FASHION COMPANY BY
            IMPROVING PRODUCTS AND SERVICES, WHILE ENHANCING THE VIETNAMESE
            BRAND IN THE GLOBAL MARKET WITH A SUSTAINABLE APPROACH.
          </p>
          <p>
            IN SUCCESS. WE RESPECT INDIVIDUAL RIGHTS, BUILD A PROFESSIONAL
            ENVIRONMENT AND BELIEVE THAT BY INVESTING IN PEOPLE, WE CAN ACHIEVE
            GREAT THINGS
          </p>
          <b className="text-gray-800 font-medium">OUR Mission</b>
          <p className="lowercase">
            Production technology and breakthrough in street fashion business in
            Vietnam
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1="Why" text2="Choose Us" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Chất Lượng</b>
          <p>
            Sản phẩm có xuất xứ tại Nga, được công nhận và kiểm duyệt bởi Cục y
            tế. Chỉ cần sử dụng sản phẩm này, bạn sẽ ngăn chặn tình trạng nôn
            nghén, hạ thấp nguy cơ sảy thai hoặc sinh non, tăng cường hệ miễn
            dịch và nâng cao sức đề kháng cho bé. Mặt khác sản phẩm còn giúp cải
            thiện tình trạng rối loạn cảm xúc; giảm thiểu sự nảy sinh vết nám,
            ngăn ngừa sự xuất hiện các vết rạn da cho các bà bầu...
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Chất Lượng</b>
          <p>
            Sản phẩm có xuất xứ tại Nga, được công nhận và kiểm duyệt bởi Cục y
            tế. Chỉ cần sử dụng sản phẩm này, bạn sẽ ngăn chặn tình trạng nôn
            nghén, hạ thấp nguy cơ sảy thai hoặc sinh non, tăng cường hệ miễn
            dịch và nâng cao sức đề kháng cho bé. Mặt khác sản phẩm còn giúp cải
            thiện tình trạng rối loạn cảm xúc; giảm thiểu sự nảy sinh vết nám,
            ngăn ngừa sự xuất hiện các vết rạn da cho các bà bầu...
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Chất Lượng</b>
          <p>
            Sản phẩm có xuất xứ tại Nga, được công nhận và kiểm duyệt bởi Cục y
            tế. Chỉ cần sử dụng sản phẩm này, bạn sẽ ngăn chặn tình trạng nôn
            nghén, hạ thấp nguy cơ sảy thai hoặc sinh non, tăng cường hệ miễn
            dịch và nâng cao sức đề kháng cho bé. Mặt khác sản phẩm còn giúp cải
            thiện tình trạng rối loạn cảm xúc; giảm thiểu sự nảy sinh vết nám,
            ngăn ngừa sự xuất hiện các vết rạn da cho các bà bầu...
          </p>
        </div>
      </div>
      <NewLetterBox />
    </div>
  );
};

export default page;
