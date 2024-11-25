import { assets } from "@/app/assets/frontend_assets/assets";
import NewLetterBox from "@/components/NewLetterBox";
import Title from "@/components/Title";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-10 border-t uppercase">
        <Title text1="Liên Hệ" text2="Với Chúng Tôi" />
      </div>
      <div className="my-10 flex flex-col sm:flex-row justify-center gap-10 mb-28">
        <img
          src={assets.contact_img.src}
          className="w-full sm:w-[480px]"
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            🏬 Store 1: 123 Main Street, New York, NY
          </p>
          <p className="text-gray-500">
            🏬 Store 2: 456 Second Avenue, Los Angeles, CA
          </p>
          <p className="text-gray-500">
            🏬 Store 3: 101 Fourth Lane, Houston, TX
          </p>
          <p className="text-gray-500">
            Tel: (415) 555-0132 <br />
            Email: admin@forever.com
          </p>

          <p className="font-semibold text-gray-700 text-2xl my-6">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <p className="py-4 px-8 border border-gray-500 text-center hover:bg-black hover:text-white text-sm transition-all duration-500 ">
            Join Jobs
          </p>
        </div>
      </div>
      <NewLetterBox />
    </div>
  );
};

export default page;
