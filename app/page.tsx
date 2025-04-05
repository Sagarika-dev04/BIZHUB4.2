import React from "react";
import Nav from "@/components/Home/Navbar/Nav";
import Hero from "@/components/Home/Hero/Hero";
import Card from "@/components/Home/Card/Card";
import Footer from "@/components/Home/Footer/Footer";

export interface Business {
  id: number;
  name: string;
  category: string;
  description: string;
  location: string;
  image?: string;
  email?: string;
  website?: string;
  phone?: string;
  openingHours?: string;
}

const businessData: Business[] = [
  {
    id: 1,
    name: "Tech Innovators",
    category: "IT & Software",
    description: "A leading software company specializing in AI and cloud computing.",
    location: "New York, USA",
    image: "/images/business1.jfif",
    email: "contact@techinnovators.com",
    website: "https://techinnovators.com",
    phone: "+1 234 567 8901",
    openingHours: "Mon-Fri 9am - 6pm"
  },
  {
    id: 2,
    name: "Fresh Organics",
    category: "Food & Beverage",
    description: "Providing farm-fresh organic produce to your doorstep.",
    location: "San Francisco, USA",
    image: "/images/business2.jfif",
    email: "hello@freshorganics.com",
    website: "https://freshorganics.com",
    phone: "+1 987 654 3210",
    openingHours: "Daily 7am - 9pm"
  },
  {
    id: 3,
    name: "Creative Studios",
    category: "Marketing & Design",
    description: "Helping brands with digital marketing, branding, and design solutions.",
    location: "Los Angeles, USA",
    image: "/images/business3.png",
    email: "info@creativestudios.com",
    website: "https://creativestudios.com",
    phone: "+1 555 666 7777",
    openingHours: "Mon-Sat 10am - 7pm"
  }
];

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <Nav />
      <Hero />

      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-blue-950 mb-8">
          Explore Businesses
        </h2>

        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
          {businessData.map((business) => (
            <Card key={business.id} business={business} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
