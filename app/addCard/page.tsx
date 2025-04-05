"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Home/Navbar/Nav";
import Footer from "@/components/Home/Footer/Footer";

import {
  Building2,
  Tags,
  MapPin,
  Image,
  Mail,
  Globe,
  Phone,
  Clock,
  AlignLeft,
} from "lucide-react";

const AddBusinessCard = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    location: "",
    image: "",
    email: "",
    website: "",
    phone: "",
    openingHours: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Business added:", formData);
    router.push("/"); // redirect after submission
  };

  return (
    <div className="overflow-hidden min-h-screen bg-gray-50">
      <Nav />

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div className="bg-white border border-gray-200 shadow-lg rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Add Your Business
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input name="name" placeholder="Business Name" value={formData.name} onChange={handleChange} required Icon={Building2} />
              <Input name="category" placeholder="Business Category" value={formData.category} onChange={handleChange} required Icon={Tags} />
              <Input name="location" placeholder="Location" value={formData.location} onChange={handleChange} required Icon={MapPin} />
              <Input name="image" placeholder="Image URL" value={formData.image} onChange={handleChange} required Icon={Image} />
              <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} Icon={Mail} />
              <Input name="website" placeholder="Website URL" value={formData.website} onChange={handleChange} Icon={Globe} />
              <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} Icon={Phone} />
              <Input name="openingHours" placeholder="Opening Hours (e.g. 9am - 5pm)" value={formData.openingHours} onChange={handleChange} Icon={Clock} />
            </div>

            {/* Description with Icon */}
            <div className="relative">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Business Description
              </label>
              <AlignLeft className="absolute left-3 top-11 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <textarea
                name="description"
                placeholder="Describe your business, services, and offerings..."
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
                className="w-full pl-10 pr-4 rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-950 hover:bg-indigo-950 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:cursor-pointer"
            >
              Add Business
            </button>

            <div className="text-center mt-6">
              <Link href="/" className="text-indigo-600 hover:underline text-sm">
                ← Back to Home
              </Link>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Reusable input component with icon
const Input = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  Icon,
}: {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  Icon: React.ElementType;
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      {placeholder}
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
      />
    </div>
  </div>
);

export default AddBusinessCard;
