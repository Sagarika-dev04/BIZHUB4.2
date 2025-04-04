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
    <div className="bg-slate-50  rounded-md shadow border border-cyan-100 overflow-hidden w-full max-w-xl h-48 flex gap-y-2.5 hover:scale-[1.01] hover:shadow-lg transition-all duration-300">
    {/* Business Image */}
    <div className="w-48 h-full flex-shrink-0">
      <img
        src={business.image || "/images/default-business.jpg"}
        alt={business.name}
        className="w-full h-full object-cover"
      />
    </div>
  
    {/* Business Info */}
    <div className="flex flex-col justify-between p-4 flex-1 h-full overflow-hidden">
      <div>
        <h2 className=" text-lg font-bold tracking-tight text-blue-950 truncate">{business.name}</h2>
        <p className="text-sm text-gray-500 mb-1 truncate">{business.category}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{business.description}</p>
  
        {/* Location */}
        <div className="flex items-center text-gray-400 text-xs mt-2 truncate">
          <span className="material-icons text-sm mr-1"></span>
          {business.location}
        </div>
      </div>
  
      {/* Button */}
      <button className="mt-3 bg-blue-950 text-white px-2 py-1 text-sm rounded-md hover:text-gray-300 hover:cursor-pointer transition w-fit">
        View Details
      </button>
    </div>
  </div>
  
  );
};

export default Card;
