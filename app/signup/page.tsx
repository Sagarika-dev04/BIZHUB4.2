"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiUser, FiMail, FiLock, FiChevronDown } from "react-icons/fi";

const Signup: React.FC = () => {
  const router=useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "General User",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const isJSON = res.headers.get("content-type")?.includes("application/json");
    const data = isJSON ? await res.json() : {};

    if (res.ok) {
      alert("Signup successful!");
      
      router.push("/login");
    } else {
      alert(data?.error || "Signup failed.");
    }
  } catch (err) {
    console.error("Signup error:", err);
    alert("Something went wrong.");
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-cyan-500 mb-6">Sign Up</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium text-sm">Full Name</label>
            <div className="relative">
              {FiUser ({className:"absolute left-3 top-3.5 text-gray-500 text-lg"})}
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium text-sm">Email Address</label>
            <div className="relative">
              {FiMail ({className:"absolute left-3 top-3.5 text-gray-500 text-lg"})}
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium text-sm">Password</label>
            <div className="relative">
              {FiLock ({className:"absolute left-3 top-3.5 text-gray-500 text-lg"})}
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className="w-full h-12 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* User Type */}
          <div className="space-y-2">
            <label className="text-gray-700 font-medium text-sm">User Type</label>
            <div className="relative">
              {FiChevronDown ({className:"absolute right-3 top-3.5 text-gray-500 text-lg"})}
              <select
                name="userType"
                value={formData.userType}
                className="w-full h-12 pl-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all appearance-none"
                onChange={handleChange}
              >
                <option value="Business Owner">Business Owner</option>
                {/*<option value="Admin">Admin</option>*/}
                <option value="General User">General User</option>
              </select>
            </div>
          </div>

          {/* Sign Up Button */}
          <button type="submit" className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold text-lg hover:shadow-lg hover:cursor-pointer transition-all">
            Sign Up
          </button>

          {/* Login Redirect */}
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
