import React from "react";

interface IText {
  text1: string;
  text2: string;
}

const Title = ({ text1, text2 }: IText) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-gray-500">
        {text1} <span className="text-gray-600 font-medium">{text2}</span>
      </p>
      <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
    </div>
  );
};

export default Title;
