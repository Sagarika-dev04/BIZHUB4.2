"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <div className="relative w-full h-auto min-h-screen bg-gray-50 flex flex-col-reverse md:flex-row items-center px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-0">
      {/* Left Side: Text */}
      <div className="text-blue-950 w-full md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Discover & Connect with Businesses
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          A comprehensive business directory to explore, find, and grow your network.
        </p>
        <button
          onClick={() => router.push("/signup")}
          className="bg-blue-950 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:text-gray-200 cursor-pointer"
        >
          Get Started
        </button>
      </div>

      {/* Right Side: Image */}
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md p-6 bg-blue-950 rounded-lg shadow-lg">
          <img
            src="/images/Logo.webp"
            className="w-full h-auto object-contain rounded-lg"
            alt="Business Directory"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
