/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { ShopContext } from "@/app/context/ShopContext";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken, router, backendUrl } = useContext(ShopContext);
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SubmitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const res = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (res.data.success) {
          toast.success(res.data.message);
          setCurrentState("Login");
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (res.data.success) {
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (token) {
      router.push("/");
    }
  }, [token]);
  return (
    <form
      onSubmit={SubmitHandle}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 dark:bg-black dark:text-w"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="font-serif text-4xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState == "Login" ? (
        ""
      ) : (
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="name"
        />
      )}
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="email"
        required
      />
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="password"
        required
      />
      <div className="w-full flex justify-between text-sm mt-[-8px] ">
        <p className="cursor-pointer">forgot your password</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            {" "}
            Login here
          </p>
        )}
      </div>
      <button className="bg-black text-white text-sm px-7 py-3">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
