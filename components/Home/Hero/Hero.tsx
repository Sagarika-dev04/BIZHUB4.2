"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";

const Hero = ({ session }: { session: any }) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const images = [
    "/images/Logo.webp",
    "/images/business1.png",
    "/images/business2.png",
    "/images/business3.png",
  ];

  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div className="relative w-full h-auto min-h-screen bg-gray-50 flex flex-col-reverse md:flex-row items-center px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-0 pt-24">
      <div className="text-blue-950 w-full md:w-1/2 text-center md:text-left space-y-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Discover & Connect with Businesses
        </h1>
        <p className="text-lg sm:text-xl text-gray-700">
          Explore verified businesses, connect with service providers, and grow your network — all in one place.
        </p>
        <ul className="text-gray-600 text-base space-y-2">
          <li>✔ Verified business listings across multiple industries</li>
          <li>✔ Easy-to-use interface for search and discovery</li>
        </ul>

        {/* Search Bar */}
        <div className="flex justify-center md:justify-start mt-10">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full max-w-lg bg-white border-2 border-cyan-400 rounded-full px-6 py-3 shadow-md focus-within:shadow-cyan-400/60 transition-shadow duration-300"
          >
            <button
              type="submit"
              className="text-cyan-600 hover:text-cyan-700 cursor-pointer transition-colors duration-200"
            >
              {FiSearch({ className: "w-5 h-5" })}
            </button>
            <input
              type="text"
              placeholder="Search businesses by category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 ml-3 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-base"
            />
          </form>
        </div>


        {/* CTA Button - only if not logged in */}
        {!session && (
          <div>
            <button
              onClick={() => router.push("/signup")}
              className="mt-6 bg-blue-950 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:text-gray-200 cursor-pointer"
            >
              Get Started
            </button>
          </div>
        )}
      </div>

      {/* Right Side: Image Slider */}
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        <div className="relative w-full max-w-lg p-6 bg-blue-950 rounded-lg shadow-lg">
          <Image
            src={images[current]}
            alt="Business Slide"
            width={500}
            height={300}
            className="w-full h-72 object-contain rounded-lg transition duration-500 ease-in-out"
            priority
          />
        </div>
      </div>


    </div>
  );
};

export default Hero;
