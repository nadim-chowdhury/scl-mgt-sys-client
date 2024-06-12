"use client";

import { features } from "../../utils/features";
import { useState } from "react";
import { FaExpand } from "react-icons/fa";

export default function FeaturesSection() {
  const [expandedFeature, setExpandedFeature] = useState(null);

  const handleToggle = (id) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Our Features
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Discover the powerful features our school management system offers
            to streamline your educational institution.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="bg-gray-100 rounded-lg  p-6">
              <div className="flex items-center justify-center mb-4 text-amber-500">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                {feature.description}
              </p>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => handleToggle(feature.id)}
                  className="flex items-center justify-center text-amber-500 hover:text-amber-700 focus:outline-none"
                >
                  {expandedFeature === feature.id ? "Show Less" : "Show More"}
                  <FaExpand className="ml-2" />
                </button>
                {expandedFeature === feature.id && (
                  <p className="mt-4 text-gray-600">{feature.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
