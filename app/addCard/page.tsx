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
    address: "",
    image: null as File | null,
    email: "",
    website: "",
    phone: "",
    openingHours: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, files } = target;
    
    if (name === "image" && files && files.length > 0) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value as string | Blob);
    });

    const res = await fetch("/api/business/add", {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      router.push("/");
    } else {
      console.error("Failed to add business");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <div className="bg-white border shadow-lg rounded-3xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Add Your Business
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input name="name" placeholder="Business Name" value={formData.name} onChange={handleChange} required Icon={Building2} />
              <Input name="category" placeholder="Business Category" value={formData.category} onChange={handleChange} required Icon={Tags} />
              <Input name="address" placeholder="Location" value={formData.address} onChange={handleChange} required Icon={MapPin} />
              <FileInput name="image" onChange={handleChange} required Icon={Image} />
              <Input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} Icon={Mail} />
              <Input name="website" placeholder="Website URL" value={formData.website} onChange={handleChange} Icon={Globe} />
              <Input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} Icon={Phone} />
              <Input name="openingHours" placeholder="Opening Hours" value={formData.openingHours} onChange={handleChange} Icon={Clock} />
            </div>

            <div className="relative">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Business Description
              </label>
              <AlignLeft className="absolute left-3 top-11 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <textarea
                name="description"
                placeholder="Describe your business..."
                value={formData.description}
                onChange={handleChange}
                rows={5}
                required
                className="w-full pl-10 pr-4 rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-950 hover:bg-indigo-950 text-white font-semibold rounded-lg hover:cursor-pointer transition-all duration-200"
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

// ---------- Types ----------

interface InputProps {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  Icon: React.ElementType;
}

interface FileInputProps {
  name: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon: React.ElementType;
}

// ---------- Components ----------

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  Icon,
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
        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  </div>
);

const FileInput: React.FC<FileInputProps> = ({ name, required = false, onChange, Icon }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
      Upload Image
    </label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <input
        type="file"
        name={name}
        accept="image/*"
        onChange={onChange}
        required={required}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  </div>
);

export default AddBusinessCard;
