import React from "react";

interface Business {
  name: string;
  category: string;
  description: string;
  location: string;
  image?: string; // Optional
}

interface CardProps {
  business: Business;
}

const Card: React.FC<CardProps> = ({ business }) => {
  return (
    <div className="bg-white rounded-1xl shadow-lg overflow-hidden transition-transform transform hover:scale-102 hover:shadow-xl duration-300 max-w-sm">
      {/* Business Image */}
      <img
        src={business.image || "/images/default-business.jpg"}
        alt={business.name}
        className="w-full h-48 object-cover"
      />

      {/* Business Info */}
      <div className="p-5">
        <h2 className="text-2xl font-semibold text-blue-950 mb-2">
          {business.name}
        </h2>
        <p className="text-gray-600 text-sm mb-3">{business.category}</p>
        <p className="text-gray-700 text-sm line-clamp-2">{business.description}</p>

        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm mt-3">
          <span className="material-icons text-lg mr-1">location_on</span>
          {business.location}
        </div>

        {/* Button */}
        <button className="mt-4 w-full bg-cyan-500 text-white py-2 rounded-lg font-medium hover:bg-cyan-600 transition duration-200 cursor-pointer">
          View Details
        </button>
      </div>
    </div>
  );
};

export default Card;
