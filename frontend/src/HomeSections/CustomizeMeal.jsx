import React from "react";

export default function CustomizeMeal() {
  return (
    <section id="custom" className="py-20 px-6  text-white text-center">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-extrabold text-yellow-300 mb-6 tracking-wider">
          Create Your Cosmic Meal
        </h2>
        <p className="text-lg text-gray-200 mb-8 leading-relaxed">
          Choose from a galaxy of flavors, mix and match your burger, sides, and drinks.
        </p>
        <button className="button-form">
          Build Your Box
        </button>
      </div>
    </section>
  );
}
