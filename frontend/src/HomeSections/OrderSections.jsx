import { assets } from "../assets/assets";

export default function CockpitOrder() {
    const meals = [
      { name: "Galaxy Burger", desc: "Double star-meat, cosmic cheese", image: "/images/3d-burger.png" },
      { name: "Astro Fries", desc: "Asteroid-cut fries", image: "/images/3d-fries.png" },
      { name: "Stellar Soda", desc: "Zero-gravity drink", image: "/images/3d-soda.png" },
    ];
  
    return (
      <section className="py-20 text-white text-center px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold tracking-wider text-yellow-400 mb-4">Explore Our Stellar Menu</h2>
        <p className="text-lg text-gray-300 mb-8">From cosmic burgers to galactic fries, embark on your flavor journey.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="menu-card">
            <img src={assets.burger} alt="Burger" className="w-full h-40 object-cover rounded-lg mb-4 " />
            <h3 className="text-xl text-yellow-400">Cosmic Burger</h3>
            <p className="text-gray-300">A juicy burger that will launch your taste buds to another galaxy.</p>
          </div>
          <div className="menu-card">
            <img src={assets.chicken} alt="Nuggets" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl text-yellow-400">Galactic Nuggets</h3>
            <p className="text-gray-300">Golden nuggets that are out of this world, crispy and delicious.</p>
          </div>
          <div className="menu-card">
            <img src={assets.coke} alt="Soda" className="w-full h-40 object-cover rounded-lg mb-4" />
            <h3 className="text-xl text-yellow-400">Nebula Soda</h3>
            <p className="text-gray-300">A fizzy drink that will send you on a flavor voyage.</p>
          </div>
        </div>
        <button className="mt-8 bg-yellow-500 text-black px-10 py-4 rounded-full font-semibold hover:bg-yellow-400 hover:scale-105 transition duration-300 shadow-xl">
          View Full Menu
        </button>
      </div>
    </section>
    
    );
  }
  