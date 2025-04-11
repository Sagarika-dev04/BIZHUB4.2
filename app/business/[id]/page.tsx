export const dynamic = "force-dynamic";
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiClock,
  FiGlobe,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import Nav from "@/components/Home/Navbar/Nav";
import Footer from "@/components/Home/Footer/Footer";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Business } from "@/types/index";
import { notFound } from "next/navigation";
import Favorite from "@/components/Home/Favorite/Favorite";
import { cookies } from "next/headers";

interface Props {
  params: { id: string };
}

async function getBusiness(id: string): Promise<Business | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/businessGET/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

async function checkFavorite(id: string): Promise<boolean> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/favoriteCheck/${id}`, {
    cache: "no-store",
    headers: {
      Cookie: cookieHeader,
    },
  });

  if (!res.ok) return false;
  const data = await res.json();
  return data?.isFavorite || false;
}

export default async function BusinessDetailsPage({ params }: Props) {
  const id = params.id;

  if (!id) return notFound();

  const session = await getServerSession(authOptions);
  const business = await getBusiness(id);

  if (!business) return notFound();

  const isFavorite = session?.user?.id ? await checkFavorite(id) : false;
  const userRole = session?.user?.userType;

  const isOwner =
    userRole === "Business Owner" &&
    ((typeof business.createdBy === "string"
      ? business.createdBy === session?.user?.id
      : business.createdBy?._id === session?.user?.id));


  return (
    <div className="overflow-hidden">
      <Nav session={session} />

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

            <div className="flex flex-wrap gap-4 mt-8">
              {isOwner && (
                <Link
                  href={`/businessEdit/${business._id}`}
                  className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-cyan-500 text-white hover:bg-cyan-600 transition rounded-md shadow-sm"
                >
                  {FiEdit({ className: "w-4 h-4" })} Edit
                </Link>
              )}

              {userRole === "Admin" && (
                <form action={`/api/cardEditDel/${business._id}`} method="POST">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-red-600 text-white hover:cursor-pointer hover:bg-red-700 transition rounded-md shadow-sm"
                  >
                    {FiTrash2({ className: "w-4 h-4" })} Delete
                  </button>
                </form>
              )}

              {userRole === "General User" && (
                <Favorite businessId={business._id} isFavorite={isFavorite} />
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
}
