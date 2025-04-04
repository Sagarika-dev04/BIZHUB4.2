import React from "react";
import Nav from "./Navbar/Nav";
import Hero from "./Hero/Hero";
import Card from "./Card/Card";
import Footer from "./Footer/Footer"
interface Business {
  name: string;
  category: string;
  description: string;
  location: string;
  image: string;
}

const businessData: Business[] = [
  {
    name: "Tech Innovators",
    category: "IT & Software",
    description: "A leading software company specializing in AI and cloud computing.",
    location: "New York, USA",
    image: "/images/business1.jfif",
  },
  {
    name: "Fresh Organics",
    category: "Food & Beverage",
    description: "Providing farm-fresh organic produce to your doorstep.",
    location: "San Francisco, USA",
    image: "/images/business2.jfif",
  },
  {
    name: "Creative Studios",
    category: "Marketing & Design",
    description: "Helping brands with digital marketing, branding, and design solutions.",
    location: "Los Angeles, USA",
    image: "/images/business3.png",
  },
  {
    name: "Creative Studios",
    category: "Marketing & Design",
    description: "Helping brands with digital marketing, branding, and design solutions.",
    location: "Los Angeles, USA",
    image: "/images/business3.png",
  },
  {
    name: "Tech Innovators",
    category: "IT & Software",
    description: "A leading software company specializing in AI and cloud computing.",
    location: "New York, USA",
    image: "/images/business1.jfif",
  },

  
    {
    name: "Fresh Organics",
    category: "Food & Beverage",
    description: "Providing farm-fresh organic produce to your doorstep.",
    location: "San Francisco, USA",
    image: "/images/business2.jfif",
  },
];

const Home: React.FC = () => {
  return (
    <div className="overflow-hidden">
      <Nav />
      <Hero />

      {/* Business Cards Section */}
      <section className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center text-blue-950 mb-8">
          Explore Businesses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
          {businessData.map((business, index) => (
            <Card key={index} business={business} />
          ))}
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default Home;
