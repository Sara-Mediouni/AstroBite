import React from "react";
import { assets } from "../assets/assets";

export default function FeaturedSection() {
  return (
    <section className="py-20 text-center ">
    <h2 className="text-4xl font-extrabold text-yellow-400 mb-4 tracking-wider">🌟 Today’s Galactic Feast</h2>
    <p className="text-lg text-white mb-12">Exclusive intergalactic combos — limited time only!</p>
  
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {/* First Special Item */}
      <div className="food-cart">
        <img
          src={assets.juicyburger}
          alt="Galactic Burger"
          className="feature-image"
        />
        <h3 className="text-2xl font-semibold text-yellow-500">Galactic Burger</h3>
        <p className="text-gray-300">Juicy burger with cosmic sauce and crispy fries.</p>
        <span className="text-2xl font-bold text-white">$9.99</span>
        <button className="order-button">
          Add to Cart
        </button>
      </div>
  
      {/* Second Special Item */}
      <div className="food-cart">
        <img
          src={assets.fries}
          alt="Galactic Fries"
          className="feature-image"
        />
        <h3 className="text-2xl font-semibold text-yellow-500">Cosmic Fries</h3>
        <p className="text-gray-300">Crispy fries with space seasoning and galactic dip.</p>
        <span className="text-2xl font-bold text-white">$5.49</span>
        <button className="order-button">
          Add to Cart
        </button>
      </div>
  
      {/* Third Special Item */}
      <div className="food-cart">
        <img
          src={assets.coke}
          alt="Galactic Soda"
          className="feature-image"
        />
        <h3 className="text-2xl font-semibold text-yellow-500">Nebula Soda</h3>
        <p className="text-gray-300">Cool soda with cosmic bubbles — perfect for any meal.</p>
        <span className="text-2xl font-bold text-white">$3.99</span>
        <button className="order-button">
          Add to Cart
        </button>
      </div>
    </div>
  </section>
  
  );
}
