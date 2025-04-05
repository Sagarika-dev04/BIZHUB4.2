import React from "react";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiClock,
  FiGlobe,
  FiEdit,
  FiTrash2,
  FiHeart,
} from "react-icons/fi";
import Nav from "@/components/Home/Navbar/Nav";
import Footer from "@/components/Home/Footer/Footer";
import { Business } from "@/app/page";
import Link from "next/link";

// Business data
const businessData: Business[] = [
  {
    id: 1,
    name: "Tech Innovators",
    category: "IT & Software",
    description:
      "Tech Innovators is a trailblazing software firm that harnesses the power of artificial intelligence and cloud computing to deliver groundbreaking digital solutions. With a strong commitment to innovation, they help businesses scale efficiently, optimize operations, and stay ahead in today’s fast-paced tech landscape.",
    location: "New York, USA",
    image: "/images/business1.jfif",
    email: "contact@techinnovators.com",
    website: "https://techinnovators.com",
    phone: "+1 234 567 8901",
    openingHours: "Mon-Fri 9am - 6pm",
  },
  {
    id: 2,
    name: "Fresh Organics",
    category: "Food & Beverage",
    description:
      "Fresh Organics is dedicated to delivering high-quality, organic produce directly from local farms to your doorstep. With a focus on sustainability and freshness, they offer a wide selection of fruits, vegetables, and health foods, ensuring your family eats healthier while supporting eco-friendly agricultural practices.",
    location: "San Francisco, USA",
    image: "/images/business2.jfif",
    email: "hello@freshorganics.com",
    website: "https://freshorganics.com",
    phone: "+1 987 654 3210",
    openingHours: "Daily 7am - 9pm",
  },
  {
    id: 3,
    name: "Creative Studios",
    category: "Marketing & Design",
    description:
      "Creative Studios crafts compelling brand stories through innovative marketing strategies and visually captivating designs. From startups to enterprises, they offer tailored digital campaigns, branding, and UX/UI design services that leave a lasting impression and elevate brands in competitive markets.",
    location: "Los Angeles, USA",
    image: "/images/business3.png",
    email: "info@creativestudios.com",
    website: "https://creativestudios.com",
    phone: "+1 555 666 7777",
    openingHours: "Mon-Sat 10am - 7pm",
  },
];


interface Props {
  params: { id: string };
}

const BusinessDetailsPage = ({ params }: Props) => {
  const business = businessData.find((b) => b.id === Number(params.id));

  if (!business)
    return <div className="text-center text-red-500 py-20">Business Not Found</div>;

  return (
    <div className="overflow-hidden">
      <Nav />

      <div className="max-w-6xl mx-auto p-6 mt-24 bg-white rounded-3xl shadow-xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img
              src={business.image}
              alt="Business Image"
              className="rounded-2xl w-full h-full object-contain shadow-sm"
            />
          </div>


          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">{business.name}</h1>
            <p className="text-cyan-700 text-lg font-semibold">{business.category}</p>

            <div className="flex items-center text-gray-500 gap-2">
              {FiMapPin({ className: "w-5 h-5 text-gray-500" })}
              <span>{business.location}</span>
            </div>

            <p className="text-slate-700 text-base leading-relaxed">
              {business.description}
            </p>

            <div className="space-y-2 text-sm text-slate-600">
              {business.email && (
                <div className="flex items-center gap-2">
                  {FiMail({ className: "w-4 h-4" })} <span>{business.email}</span>
                </div>
              )}
              {business.phone && (
                <div className="flex items-center gap-2">
                  {FiPhone({ className: "w-4 h-4" })} <span>{business.phone}</span>
                </div>
              )}
              {business.website && (
                <div className="flex items-center gap-2">
                  {FiGlobe({ className: "w-4 h-4" })}
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-600 hover:text-cyan-800 underline transition"
                  >
                    {business.website}
                  </a>
                </div>
              )}
              {business.openingHours && (
                <div className="flex items-center gap-2">
                  {FiClock({ className: "w-4 h-4" })} <span>{business.openingHours}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              {/* Edit Button */}
              <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-cyan-500 text-white hover:bg-cyan-600 hover:cursor-pointer transition duration-200 rounded-md shadow-sm">
                {FiEdit({ className: "w-4 h-4" })}
                Edit
              </button>

              {/* Delete Button */}
              <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 hover:cursor-pointer transition duration-200 rounded-md shadow-sm">
                {FiTrash2({ className: "w-4 h-4" })}
                Delete
              </button>

              {/* Favourite Button */}
              <button className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-gray-800 text-white hover:bg-gray-900 hover:cursor-pointer transition duration-200 rounded-md shadow-sm">
                {FiHeart({ className: "w-4 h-4" })}
                Favourite
              </button>
            </div>

          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <Link
          href="/"
          className="text-cyan-600 hover:underline text-sm inline-flex items-center gap-1"
        >
          ← Back to Home
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default BusinessDetailsPage;
