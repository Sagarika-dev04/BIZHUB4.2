"use client";

import React, { useEffect, useState } from "react";
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
import Link from "next/link";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Business {
  _id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  image?: string;
  email?: string;
  website?: string;
  phone?: string;
  openingHours?: string;
  createdBy?: string | { _id: string };
}

const BusinessDetailsPage = () => {
  const { data: session } = useSession(); //session from NextAuth 
  const { id } = useParams();
  const router = useRouter();
  const [business, setBusiness] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBusiness = async () => {
      if (!id) return;
  
      try {
        const res = await fetch(`/api/businessGET/${id}`);
        const data = await res.json();
        setBusiness(data);
  
        if (session?.user?.id) {
          const favRes = await fetch(`/api/favoriteCheck/${id}`);
          const favData = await favRes.json();
          setIsFavorite(favData?.isFavorite || false);
        }
      } catch (err) {
        console.error("Failed to fetch business or favorite:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBusiness();
  }, [id, session]);
  


  //Handler function to handle the deletion of a Business card
  const handleDelete = async () => {
    if (!id) return;

    const confirmDelete = confirm("Are you sure you want to delete this business?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/cardEditDel/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (res.ok) {
        alert("Business deleted successfully!");
        window.location.href = "/";
      } else {
        alert(result.error || "Delete failed.");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Something went wrong during delete.");
    }
  };


  //handler to handle favorite
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorites = async () => {
    if (!id) return;

    try {
      const res = await fetch(`/api/favorite/${id}`, {
        method: "POST",
      });

      const result = await res.json();
      if (res.ok) {
        setIsFavorite(true);
      } else {
        alert(result.error || "Failed to add to favorites.");
      }
    } catch (err) {
      console.error("Favorite Error:", err);
      alert("Something went wrong while adding to favorites.");
    }
  };



  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!business) return <div className="text-center text-red-500 py-20">Business Not Found</div>;

  const userRole = session?.user?.userType;

  return (
    <div className="overflow-hidden">
      <Nav />

      <div className="max-w-6xl mx-auto p-6 mt-24 bg-white rounded-3xl shadow-xl border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img
              src={business.image || "/images/default-business.jpg"}
              alt="Business Image"
              className="rounded-2xl w-full h-full object-contain shadow-sm"
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">{business.name}</h1>
            <p className="text-cyan-700 text-lg font-semibold">{business.category}</p>

            <div className="flex items-center text-gray-500 gap-2">
              {FiMapPin({ className: "w-5 h-5 text-gray-500" })}
              <span>{business.address || "Location not provided"}</span>
            </div>

            <p className="text-slate-700 text-base leading-relaxed">
              {business.description || "No description available"}
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

            {/* Conditional Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              {userRole === "Business Owner" &&
                ((typeof business.createdBy === "string"
                  ? business.createdBy === session?.user?.id
                  : business.createdBy?._id === session?.user?.id)) && (
                  <button
                    onClick={() => router.push(`/businessEdit/${business._id}`)}
                    className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-cyan-500 text-white hover:cursor-pointer hover:bg-cyan-600 transition rounded-md shadow-sm"
                  >
                    {FiEdit({ className: "w-4 h-4" })} Edit
                  </button>
                )}

              {userRole === "Admin" && (
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-red-600 text-white hover:cursor-pointer hover:bg-red-700 transition rounded-md shadow-sm"
                >
                  {FiTrash2({ className: "w-4 h-4" })} Delete
                </button>
              )}

              {userRole === "General User" && (
                <button
                  onClick={handleAddToFavorites}
                  className="p-2 rounded-full hover:cursor-pointer bg-gray-100 hover:bg-gray-100 transition"
                  title="Add to favorites"
                >
                  {isFavorite ? (
                    <FiHeart className="w-5 h-5 text-red-500 fill-red-500" />
                  ) : (
                    <FiHeart className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              )}

            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-10">
        <Link href="/" className="text-cyan-600 hover:underline text-sm inline-flex items-center gap-1">
          ← Back to Home
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default BusinessDetailsPage;
