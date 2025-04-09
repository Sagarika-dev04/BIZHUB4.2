"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface CardProps {
  business: {
    _id: string;
    name: string;
    category: string;
    description: string;
    address: string;
    image?: string;
  };
}

const Card: React.FC<CardProps> = ({ business }) => {
  const router = useRouter();

  return (
    <div className="bg-slate-50 rounded-md shadow border border-cyan-100 overflow-hidden w-full max-w-xl h-48 flex hover:scale-[1.01] hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <div className="w-48 h-full flex-shrink-0">
        <img
          src={business.image || "/images/default-business.jpg"}
          alt={business.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between p-4 flex-1 h-full overflow-hidden">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-blue-950 truncate">
            {business.name}
          </h2>
          <p className="text-sm text-gray-500 mb-1 truncate">{business.category||"Category Not Provided"}</p>
          <p className="text-sm text-gray-600 line-clamp-2">{business.description||"Description Not Provided"}</p>
          <div className="text-xs text-gray-400 mt-2 truncate">
            {business.address||"Location not Provided"}
          </div>
        </div>

        <button
          onClick={() => router.push(`/business/${business._id}`)}
          className="mt-3 bg-blue-950 text-white px-3 py-1 text-sm rounded-md hover:text-gray-300 hover:cursor-pointer transition w-fit"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
