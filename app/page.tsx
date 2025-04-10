import Nav from "@/components/Home/Navbar/Nav";
import Hero from "@/components/Home/Hero/Hero";
import Card from "@/components/Home/Card/Card";
import Footer from "@/components/Home/Footer/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Business } from "@/types/index";
import { cookies } from "next/headers";

async function getBusinesses() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/businessAll`, {
    cache: "no-store",
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
}

async function getFavorites() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favoriteAll`, {
    cache: "no-store",
    headers: {
      Cookie: cookieHeader,
    },
  });
  return res.json();
}

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const businesses: Business[] = await getBusinesses();

  let favorites: Business[] = [];
  if (session?.user?.userType === "General User") {
    favorites = await getFavorites();
  }

  return (
    <div className="overflow-hidden">
      <Nav session={session} />
      <Hero session={session} />

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

      {session?.user?.userType === "General User" && favorites.length > 0 && (
        <section className="py-12 px-6 bg-gray-50">
          <h2 className="text-3xl font-bold text-center text-blue-950 mb-8">
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
}
