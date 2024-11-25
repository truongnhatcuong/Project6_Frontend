"use client";
import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const SubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <form
      onClick={SubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
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
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="name"
        />
      )}
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="email"
      />
      <input
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="password"
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
