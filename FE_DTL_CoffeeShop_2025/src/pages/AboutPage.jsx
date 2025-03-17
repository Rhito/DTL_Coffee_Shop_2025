// AboutPage.js
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import UILayout from "../components/layout/UILayout";

function AboutPage() {
  return (
    <UILayout>
      {/* Hero Section */}
      <section className="bg-[#2c3e50] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About DTL Coffee
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            We are passionate about delivering the finest coffee experience to
            our customers, blending tradition with innovation.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                DTL Coffee was founded with a simple mission: to bring
                exceptional coffee to every cup. From humble beginnings, we’ve
                grown into a beloved brand, sourcing the best beans globally and
                crafting unique blends that tell a story in every sip.
              </p>
              <p className="text-gray-600">
                Our commitment to quality and sustainability drives everything
                we do, ensuring that every bean we roast contributes to a better
                world.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop"
                alt="Coffee making"
                className="w-full h-96 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Quality",
                desc: "We never compromise on the quality of our coffee beans and brewing process.",
              },
              {
                title: "Sustainability",
                desc: "Committed to ethical sourcing and environmentally friendly practices.",
              },
              {
                title: "Innovation",
                desc: "Constantly exploring new ways to enhance your coffee experience.",
              },
              {
                title: "Community",
                desc: "Building strong connections with our customers and local farmers.",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </UILayout>
  );
}

export default AboutPage;
