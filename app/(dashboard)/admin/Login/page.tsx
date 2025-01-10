/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Đảm bảo bạn đã cài đặt react-toastify
import { backendUrl } from "../../components/RootLayout";
import { useRouter } from "next/navigation";
const PageLogin = ({ setToken }: { setToken: (value: string) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const BackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  console.log(BackendUrl);

  const onSubmitHandle = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.success) {
        toast.success("Đăng nhập thành công!");
        router.push("/admin/add");
        setToken(response.data.token);
      } else {
        toast.error(response.data.message || "Đăng nhập thất bại!");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại!"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <form onSubmit={onSubmitHandle}>
        <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Email</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <input
            type="submit"
            className="rounded-md px-4 py-4 text-white bg-black w-full cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default PageLogin;
