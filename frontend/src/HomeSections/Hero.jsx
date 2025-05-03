import {assets} from '../assets/assets'
export default function Hero() {
  return (
    <section className="relative h-screen  text-white overflow-hidden flex items-center justify-center px-6">


    <div className="absolute inset-0 bg-[url('/stars.jpg')] bg-cover opacity-30 z-0" />


    <div className="absolute w-[600px] h-[600px] rounded-full border border-dashed border-yellow-500 animate-spin-slow" />
    <div className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-yellow-500 animate-spin-reverse" />

  
    <img src={assets.coke} className="absolute w-20 top-[15%] left-[10%] animate-float-medium" />
    <img src={assets.pizza} className="absolute w-20 bottom-[20%] right-[15%] animate-float-slow" />
    <img src={assets.fries} className="absolute w-20 top-[25%] right-[25%] animate-float-medium" />

   
    <div className="relative z-10 text-center">
      <div className="relative w-[300px] h-[300px] mx-auto rounded-full bg-gradient-to-tr from-yellow-500 to-yellow-600 shadow-2xl flex items-center justify-center">
        <img
          src={assets.burger}
          alt="Supreme Burger"
          className="w-72 animate-pulse-slow drop-shadow-[0_10px_30px_rgba(255,255,255,0.5)]"
        />
      </div>
      <h1 className="mt-10 text-6xl tracking-wider md:text-7xl font-extrabold bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 text-transparent bg-clip-text leading-tight">
        Galaxy of Taste
      </h1>
      <p className="mt-4 font-bold text-gray-300 text-lg max-w-xl mx-auto">
        You’re not just hungry — you're about to orbit a universe of flavor.
      </p>
      <button className="mt-8 bg-yellow-400 text-black px-10 py-4 rounded-full hover:bg-yellow-300 transition text-lg font-bold shadow-xl hover:scale-105">
        Launch Your Bite 🚀
      </button>
    </div>
  </section>
  );
}
