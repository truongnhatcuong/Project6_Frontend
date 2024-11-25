import NavBar from "@/components/NavBar";
import type { Metadata } from "next";
import ShopContextProvider from "../context/ShopContext";
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
    <ShopContextProvider>
      <ToastContainer />
      <NavBar />
      <SearchBar />
      {children}
      <Footer />
    </ShopContextProvider>
  );
}
