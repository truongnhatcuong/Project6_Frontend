/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
import { assets } from "@/app/assets/admin_assets/assets";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [image4, setImage4] = useState<File | null>(null);
  const token = localStorage.getItem("tokenadmin");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("MEN");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState<boolean>(false);
  const [sizes, setSizes] = useState<string[]>([]);

  const addSubmitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller.toString());
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);
      console.log("form data", formData);
      console.log("Subcategory before submit:", subCategory);

      // Kiểm tra giá trị của subcategory

      // thực thi
      const res = await axios.post(`${BackendUrl}/api/product/add`, formData, {
        headers: { token },
      });
      if (res.data.success) {
        toast.success(res.data.message);
        console.log(res.data.success);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      className="flex flex-col w-full items-start gap-3 "
      onSubmit={addSubmitHandle}
    >
      <div>
        <p className="mb-2 ">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              src={
                !image1 ? assets.upload_area.src : URL.createObjectURL(image1)
              }
              className="w-20 "
              alt=""
            />
            <input
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage1(e.target.files[0]);
                }
              }}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              src={
                !image2 ? assets.upload_area.src : URL.createObjectURL(image2)
              }
              className="w-20 "
              alt=""
            />
            <input
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage2(e.target.files[0]);
                }
              }}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              src={
                !image3 ? assets.upload_area.src : URL.createObjectURL(image3)
              }
              className="w-20 "
              alt=""
            />
            <input
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage3(e.target.files[0]);
                }
              }}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              src={
                !image4 ? assets.upload_area.src : URL.createObjectURL(image4)
              }
              className="w-20 "
              alt=""
            />
            <input
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage4(e.target.files[0]);
                }
              }}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      {/* product */}

      <div className="w-full">
        <p>Product Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="type here"
          required
          className="w-full max-w-[500px] px-3 py-2 rounded-md outline-pink-200 border border-gray-300"
        />
      </div>

      <div className="w-full">
        <p>Product Description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
          required
          className="w-full max-w-[500px] px-3 py-2 rounded-md outline-pink-200 border border-gray-300"
        />
      </div>
      {/* category product */}
      <div className="flex flex-col sm:flex-row sm:gap-8 gap-2 w-full ">
        <div>
          <p className="mb-2">Product Categories</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">sub Categories</p>
          <select
            className="w-full px-3 py-2"
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="TopWear">TopWear</option>
            <option value="BottomWear">BottomWear</option>
            <option value="WinterWear">WinterWear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Price"
            required
            className="w-full px-3 py-2 sm:w[120px] "
          />
        </div>
      </div>
      {/* side */}
      <div>
        <p className="mb-2">ProductSize</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-pink-300" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-pink-300" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-pink-300" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-pink-300" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-pink-300" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      {/* best seller */}
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller((prev) => !prev)}
        />
        <label htmlFor="bestseller">Add to Bestseller</label>
      </div>
      {/* add product */}
      <button type="submit" className="w-28 px-3 py-2 text-white bg-black">
        ADD
      </button>
    </form>
  );
};

export default page;
