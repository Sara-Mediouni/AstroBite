import React from 'react'
import { assets } from '../assets/assets'

const Pizza = () => {
  return (
    <section className="relative py-20 text-center bg-gradient-to-b ">
  
  <div className="absolute w-[500px] h-[500px] rounded-full border border-dashed border-yellow-500 animate-spin-slow" />
  <div className="absolute w-[350px] h-[350px] rounded-full border border-dashed border-yellow-500 animate-spin-reverse" />

  <div className="relative z-10 text-center">
    <div className="relative w-[300px] h-[300px] mx-auto flex items-center justify-center">
      <img
        src={assets.pizza}  // Remplacer avec le chemin réel de l'image de pizza
        alt="Supreme Pizza"
        className="w-72 animate-pulse-slow drop-shadow-[0_10px_30px_rgba(255,255,255,0.5)]"
      />
    </div>
    <h2 className="mt-10 text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 text-transparent bg-clip-text leading-tight">
      The Galactic Pizza Experience 🍕
    </h2>
    <p className="mt-4 text-gray-300 text-lg max-w-xl mx-auto">
      Take your tastebuds on a journey through the stars with our Supreme Galactic Pizza! A flavor combination that’s truly out of this world.
    </p>
    <div className="mt-8 bg-white/10 px-8 py-6 rounded-3xl shadow-xl backdrop-blur-lg">
      <h3 className="text-2xl font-semibold text-yellow-500">Supreme Galactic Pizza</h3>
      <p className="text-gray-300">A delicious fusion of fresh ingredients, melted cheese, and savory toppings — designed to satisfy your hunger across the galaxy!</p>
      <div className="flex items-center justify-center mt-4 space-x-6">
        <span className="text-2xl font-bold text-white">$15.99</span>
        <button className="bg-yellow-500 text-black px-8 py-3 rounded-full hover:bg-yellow-400 transition duration-300 shadow-lg transform hover:scale-105">
          Add to Cart 🚀
        </button>
      </div>
    </div>
  </div>
</section>

  )
}

export default Pizza