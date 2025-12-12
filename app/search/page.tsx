// app/search/page.tsx
import React from "react";
import { connectToDB } from "@/lib/db";
import { BusinessCard } from "@/models/BusinessCard";
import Card from "@/components/Home/Card/Card";
import Nav from "@/components/Home/Navbar/Nav";
import Footer from "@/components/Home/Footer/Footer";
import Link from "next/link";
import { getServerSession } from "next-auth";
interface Props {
    searchParams: { query: string };
}

interface BusinessDocument {
    _id: string;
    name: string;
    category: string;
    description: string;
    address: string;
    image?: string;
}

export default async function SearchPage({ searchParams }: Props) {
    const {query=""}=await searchParams; 
    const q = query ;
    const session = await getServerSession();
    await connectToDB();

    const results = await BusinessCard.find({
        $or: [
            { name: { $regex: q, $options: "i" } },
            { category: { $regex: q, $options: "i" } },
        ],
    }).lean<BusinessDocument[]>(); // Return plain JS objects of BusinessDocument type

    const businesses: BusinessDocument[] = results.map((b) => ({
        _id: b._id.toString(), // Ensure _id is string
        name: b.name,
        category: b.category,
        description: b.description,
        address: b.address,
        image: b.image || "",
    }));

    return (
        <div className="overflow-hidden bg-blue-50">
            <Nav session={session}/>

            <section className="pt-32 px-6 pb-12 min-h-screen">

                <div className="text-center mb-4">
                    <Link href="/" className="text-blue-700 underline hover:text-blue-900">
                        ← Back to Home
                    </Link>
                </div>
                <h1 className="text-3xl font-bold text-center text-blue-950 mb-8">
                    Search Results for &quot;{q}&quot;
                </h1>

                {businesses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
                        {businesses.map((business) => (
                            <Card key={business._id} business={business} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-20 text-gray-500">
                        <h2 className="text-xl font-semibold">No businesses found</h2>
                        <p className="mt-2">Try a different search keyword.</p>
                    </div>
                )}
            </section>

            <Footer />
        </div>
    );
}
