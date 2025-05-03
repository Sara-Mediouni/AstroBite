import React from 'react'
import {assets } from '../assets/assets'
const Pastry = () => {
  return (
    <section className="relative py-28 text-white text-center">
    <h2 className="text-4xl font-bold mb-4 text-yellow-400 tracking-widest">✨ Sweet Beyond the Stars</h2>
    <p className="text-lg max-w-xl mx-auto mb-12 text-white/80">
      Explore cosmic cravings with our out-of-this-world desserts — crafted to delight every star-traveler’s taste buds.
    </p>
  
    <div className="flex justify-center flex-wrap gap-12 px-6">
      {[
        { name: "Milky Way Muffin", image: assets.cupcake },
        { name: "Saturn Donut", image: assets.cupcake  },
        { name: "Comet Cupcake", image: assets.cupcake  },
        { name: "Meteor Ice Cream", image: assets.cupcake  },
      ].map((item, index) => (
        <div
          key={index}
          className="relative w-60 h-60 rounded-full bg-white/10 border border-yellow-400/20 hover:scale-105 transition-all transform shadow-xl flex items-center justify-center"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-36 animate-float-slow drop-shadow-lg"
          />
          <div className="absolute bottom-4 w-full text-center text-yellow-400 font-semibold text-sm tracking-widest">
            {item.name}
          </div>
        </div>
      ))}
    </div>
  </section>
  
  )
}

export default Pastry