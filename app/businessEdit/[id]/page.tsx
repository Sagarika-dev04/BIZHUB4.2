"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const EditBusiness = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    address: "",
    email: "",
    phone: "",
    website: "",
    openingHours: "",
    image: "",
  });

  useEffect(() => {
    const fetchBusiness = async () => {
      const res = await fetch(`/api/businessGET/${id}`);
      const data = await res.json();
      setFormData(data);
    };
    fetchBusiness();
  }, [id]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/cardEditDel/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Business updated successfully!");
        router.push(`/business/${id}`);
      } else {
        alert("Failed to update business.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-24 p-6 bg-slate-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Business</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["name", "category", "description", "address", "email", "phone", "website", "openingHours", "image"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={(formData as any)[field] || ""}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-950 text-white rounded-md hover:cursor-pointer hover:bg-blue-900 transition"
        >
          Update Business
        </button>
      </form>
    </div>
  );
};

export default EditBusiness;
