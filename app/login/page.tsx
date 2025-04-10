"use client";

import React, { useState } from "react";
import { FiMail, FiLock } from "react-icons/fi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setMessage("Login failed: " + result.error);
      setMessageType("error");
    } else {
      setMessage("Login successful!");
      setMessageType("success");

      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-sm w-full">
        <h2 className="text-3xl font-bold text-center text-blue-950 mb-6">Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Field */}
          <div className="relative">
            {FiMail({ className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" })}
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative">
            {FiLock({ className: "absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" })}
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full h-12 pl-12 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Message (Success/Error) */}
          {message && (
            <p
              className={`text-center text-sm font-medium mt-2 ${messageType === "error" ? "text-red-600" : "text-green-600"
                }`}
            >
              {message}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-950 text-white py-3 rounded-lg font-semibold text-lg hover:shadow-lg hover:cursor-pointer transition-all"
          >
            Login
          </button>
        </form>

        {/* Sign Up Redirect */}
        <p className="text-center mt-4 text-gray-600">
          Don&apos;t have an account?{" "}

          <a href="/signup" className="text-blue-700 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
