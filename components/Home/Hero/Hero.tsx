"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

const Hero = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");

  const images = [
    "/images/Logo.webp",
    "/images/business1.jfif",
    "/images/business2.jfif",
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
    console.log("Search for:", searchQuery);
    // router.push(`/search?query=${searchQuery}`);
  };

  return (
    <div className="relative w-full h-auto min-h-screen bg-gray-50 flex flex-col-reverse md:flex-row items-center px-4 sm:px-6 md:px-12 py-8 sm:py-10 md:py-0 pt-24">
      {/* Left Side: Text + Search */}
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

        {/* 🌟 Stylish Centered Search Bar */}
        <div className="flex justify-center md:justify-start mt-8">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full max-w-lg bg-cyan-100 rounded-full px-6 py-3 shadow-md"
          >
            <button
              type="submit"
              className="text-cyan-600 hover:text-cyan-700 cursor-pointer"
            >
            {FiSearch ({className:"w-5 h-5" })}
            </button>
            <input
              type="text"
              placeholder="Search businesses by category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 ml-3 bg-transparent outline-none text-gray-700 placeholder-gray-500"
            />
          </form>
        </div>

        {/* CTA Button below Search */}
        <div>
          <button
            onClick={() => router.push("/signup")}
            className="mt-6 bg-blue-950 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:text-gray-200 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Right Side: Image Slider */}
      <div className="w-full md:w-1/2 flex justify-center mb-6 md:mb-0">
        <div className="relative w-full max-w-lg p-6 bg-blue-950 rounded-lg shadow-lg">
          <img
            src={images[current]}
            className="w-full h-72 object-contain rounded-lg transition duration-500 ease-in-out"
            alt="Business Slide"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
