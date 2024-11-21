/* eslint-disable @next/next/no-img-element */

import React from "react";

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:flex-row  gap-16 my-10 mt-40 text-sm sm:justify-between text-center sm:text-start">
        <div className="w-full sm:w-3/4">
          {" "}
          <img
            src="https://designercomvn.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/2018/12/06090103/logo-shop-qu%E1%BA%A7n-%C3%A1o-8.png"
            alt=""
            className="mb-5 w-20"
          />
          <p className="text-gray-600 ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta
            perspiciatis quo est, quidem error, voluptatum nulla amet, ab sint
            dolores debitis repudiandae vero dolorum. Quasi officia hic sunt
            labore itaque!
          </p>
        </div>

        <div className="w-full sm:w-1/5">
          <p className="font-semibold text-xl">SHOP NOW</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="w-full sm:w-1/5">
          <p className="font-semibold text-xl">CONTACT OUR</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>PHONE:*123456789</li>
            <li>Email:TNC@gmail.com</li>
            <li>FACEBOOK:Trương Nhật Cường</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="border-black " />
        <p className="text-center text-sm sm:text-base text-slate-800 p-3">
          Thiết kế website bởi@TruongNhatCuong
        </p>
      </div>
    </div>
  );
};

export default Footer;
