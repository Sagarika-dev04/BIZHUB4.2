"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HiBuildingLibrary } from "react-icons/hi2";
import { FiLogIn, FiLogOut, FiUserPlus, FiUser } from "react-icons/fi";
import { MdAddBusiness } from "react-icons/md";

const Nav = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !(userMenuRef.current as any).contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-blue-950 shadow-md transition-all duration-200 h-[11vh] z-[1000] fixed w-full">
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* LOGO */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center">
            {HiBuildingLibrary({ className: "w-7 h-7 text-white" })}
          </div>
          <h1 className="text-xl md:text-2xl text-white uppercase font-semibold">BizHub</h1>
        </div>

        {/* BUTTONS */}
        <div className="flex items-center space-x-2 sm:space-x-4 relative">
          {!session && (
            <>
              {/* Login */}
              <button
                onClick={() => router.push("/login")}
                className="flex items-center justify-center space-x-2 px-3 sm:px-5 md:px-7 lg:px-8 py-2 text-blue-900 bg-white rounded-lg transition-all duration-200 hover:bg-gray-100 hover:cursor-pointer"
              >
                {FiLogIn({ className: "text-gray-500 w-4 sm:w-5 h-4 sm:h-5" })}
                <span className="font-medium text-xs sm:text-sm md:text-base">Log In</span>
              </button>

              {/* Register */}
              <button
                onClick={() => router.push("/signup")}
                className="flex items-center justify-center space-x-2 px-3 sm:px-5 md:px-7 lg:px-8 py-2 text-white bg-cyan-500 rounded-lg transition-all duration-200 hover:bg-cyan-600 hover:cursor-pointer"
              >
                {FiUserPlus({ className: "text-white w-4 sm:w-5 h-4 sm:h-5" })}
                <span className="font-medium text-xs sm:text-sm md:text-base">Register</span>
              </button>
            </>
          )}

          {session && user?.userType === "Business Owner" && (
            <button
              onClick={() => router.push("/addCard")}
              className="flex items-center justify-center space-x-2 px-3 sm:px-5 md:px-7 py-2 text-white bg-green-600 rounded-lg transition-all duration-200 hover:bg-green-700 hover:cursor-pointer"
            >
              {MdAddBusiness({ className: "text-white w-5 h-5" })}
              <span className="font-medium text-xs sm:text-sm md:text-base">Add Business</span>
            </button>
          )}

          {/* USER ICON + DROPDOWN */}
          {session && (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center justify-center w-10 h-10 bg-cyan-500 rounded-full hover:bg-cyan-600 transition-all hover:cursor-pointer"
              >
                {FiUser({ className: "text-white w-5 h-5" })}
              </button>

              {/* Dropdown */}
              <div
                className={`absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg z-50 px-4 py-3 transition-all duration-300 ease-in-out ${
                  showUserMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="text-gray-800 font-semibold text-base truncate">{user?.name}</div>
                <div className="text-gray-500 text-sm truncate">{user?.email}</div>
                <div className="text-gray-500 text-sm truncate">{user?.userType}</div>
                <hr className="my-2" />
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center space-x-2 text-sm text-red-600 font-medium hover:underline hover:cursor-pointer"
                >
                  {FiLogOut({ className: "w-4 h-4" })}
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
