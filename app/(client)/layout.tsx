import NavBar from "@/components/NavBar";
import type { Metadata } from "next";

import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" mx-0 sm:mx-24">
      <ToastContainer />
      <NavBar />
      <SearchBar />
      {children}
      <Footer />
    </div>
  );
}
