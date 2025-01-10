/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";

import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import PageLogin from "../admin/Login/page";

export const backendUrl = "http://localhost:4000";

export default function RootLayout1({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    // Chỉ chạy trên client-side
    const storedToken = localStorage.getItem("tokenadmin") || "";
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("tokenadmin", token);
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("tokenadmin", token);
  }, [token]);
  return (
    <div className="bg-gray-50 min-h-screen">
      {token === "" ? (
        <div>
          <PageLogin setToken={setToken} />
        </div>
      ) : (
        <>
          <div>
            <NavBar />
            <hr />
          </div>
          <div className="w-full flex">
            <SideBar />
            <div className="flex-1 p-6 antialiased">{children}</div>
          </div>
        </>
      )}
    </div>
  );
}
