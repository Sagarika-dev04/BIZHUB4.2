"use client";
import React, { useEffect, useState } from "react";
import Nav from "@/components/Home/Navbar/Nav";
import Hero from "@/components/Home/Hero/Hero";
import Card from "@/components/Home/Card/Card";
import Footer from "@/components/Home/Footer/Footer";
import { useSession } from "next-auth/react";

export interface Business {
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
}

const Home: React.FC = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [favorites, setFavorites] = useState<Business[]>([]);
  const { data: session } = useSession();

  // Fetch all businesses
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await fetch("/api/businessAll");
        const data = await res.json();
        setBusinesses(data);
      } catch (err) {
        console.error("Failed to fetch businesses:", err);
      }
    };

    fetchBusinesses();
  }, []);

  // Fetch user favorites if logged in and is General User
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!session?.user || session.user.userType !== "General User") return;

      try {
        const res = await fetch("/api/favoriteAll");
        const data = await res.json();
        setFavorites(data); // expects full business objects
      } catch (err) {
        console.error("Failed to fetch favorites:", err);
      }
    };

    fetchFavorites();
  }, [session]);

  return (
    <div className="overflow-hidden">
      <Nav />
      <Hero />

      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-blue-950 mb-8">
          <span className="text-cyan-500">Explore </span>Businesses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
          {businesses.map((business) => (
            <Card key={business._id} business={business} />
          ))}
        </div>
      </section>

      {/*Favorite Section for General Users */}
      {session?.user?.userType === "General User" && favorites.length > 0 && (
        <section className="py-12 px-6 bg-gray-50"> {/* Lighter background */}
          <h2 className="text-3xl font-bold text-center text-blue-950 mb-8"> {/* Softer heading color */}
            Your <span className="text-cyan-500">Favorite</span> Businesses
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
            {favorites.map((business) => (
              <Card key={business._id} business={business} />
            ))}
          </div>
        </section>
      )}


      <Footer />
    </div>
  );
};

export default Home;
