"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { HiBuildingLibrary } from 'react-icons/hi2';
import { FiLogIn, FiLogOut, FiUserPlus } from 'react-icons/fi';
import { MdAddBusiness } from 'react-icons/md';

const Nav = () => {
  const router = useRouter();

  return (
    <div className='bg-blue-950 shadow-md transition-all duration-200 h-[11vh] z-[1000] fixed w-full'>
      <div className='flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto'>

        {/* LOGO */}
        <div className='flex items-center space-x-2'>
          <div className='w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center'>
            {HiBuildingLibrary({ className: 'w-7 h-7 text-white' })}
          </div>
          <h1 className='text-xl md:text-2xl text-white uppercase font-semibold'>BizHub</h1>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Add Business Button */}
          <button
            onClick={() => router.push('/addCard')} // Navigate to Add Card
            className="flex items-center justify-center space-x-2 px-3 sm:px-5 md:px-7 py-2 text-white bg-green-600 rounded-lg transition-all duration-200 hover:bg-green-700 cursor-pointer"
          >
            {MdAddBusiness({ className: "text-white w-5 h-5" })}
            <span className="font-medium text-xs sm:text-sm md:text-base">Add Business</span>
          </button>

          {/* Log In Button */}
          <button
            onClick={() => router.push('/login')}
            className="flex items-center justify-center space-x-2 px-3 sm:px-5 md:px-7 lg:px-8 py-2 text-blue-900 bg-white rounded-lg transition-all duration-200 hover:bg-gray-100 cursor-pointer"
          >
            {FiLogIn({ className: "text-gray-500 w-4 sm:w-5 h-4 sm:h-5" })}
            <span className="font-medium text-xs sm:text-sm md:text-base">Log In</span>
          </button>

          {/* Register Button */}
          <button
            onClick={() => router.push('/signup')}
            className="flex items-center justify-center space-x-2 px-3 sm:px-5 md:px-7 lg:px-8 py-2 text-white bg-cyan-500 rounded-lg transition-all duration-200 hover:bg-cyan-600 cursor-pointer"
          >
            {FiUserPlus({ className: "text-white w-4 sm:w-5 h-4 sm:h-5" })}
            <span className="font-medium text-xs sm:text-sm md:text-base">Register</span>
          </button>

          {/*Log out */}
          <button
            className="flex items-center justify-center space-x-2 px-3 sm:px-5 md:px-7 lg:px-8 py-2 text-blue-900 bg-white rounded-lg transition-all duration-200 hover:bg-gray-100 cursor-pointer"
          >
            {FiLogOut({ className: "text-gray-500 w-4 sm:w-5 h-4 sm:h-5" })}
            <span className="font-medium text-xs sm:text-sm md:text-base">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
