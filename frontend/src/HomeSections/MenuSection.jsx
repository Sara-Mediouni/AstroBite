import { useEffect, useState } from "react";
import { assets } from "../assets/assets";

export default function SpecialOfferSection() {
  const calculateTimeLeft = () => {
    const target = new Date();
    target.setHours(target.getHours() + 6); // Offer ends in 6 hours
    const difference = target - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-36 text-white text-center">
    <h2 className="text-5xl font-bold mb-8 text-yellow-300 tracking-widest">
      Galactic Deal
    </h2>
    <p className="text-xl max-w-2xl mx-auto mb-8 text-white/80">
      Blast off into flavor with our stellar <span className="text-yellow-300 font-semibold">Star Combo</span> — a complete intergalactic feast:
      Burger + Fries + Soda + Cosmic Dessert.
    </p>
  
    {/* Countdown Timer */}
    <div className="mb-14 text-2xl text-yellow-400 font-mono">
      ⏳ Offer ends in:{" "}
      <span className="bg-yellow-300 text-black px-4 py-2 rounded-full mx-2">
        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
      </span>
    </div>
  
    <div className="flex flex-col md:flex-row justify-center items-center gap-16">
      <img
        src={assets.offer}
        alt="Star Combo"
        className="w-100 drop-shadow-2xl animate-float-slow"
      />
      <div className="text-left max-w-md">
        <ul className="text-white/90 space-y-4 text-xl">
          <li>Galaxy Burger</li>
          <li>Astro Fries</li>
          <li>Stellar Soda</li>
          <li>Cosmic Pizza</li>
        </ul>
        <div className="mt-8">
          <span className="text-4xl font-bold text-yellow-300">$12.99</span>
          <span className="text-white/60 ml-3 line-through">$16.99</span>
        </div>
        <button className="mt-8 px-8 py-4 bg-yellow-300 text-black font-bold rounded-full shadow hover:scale-105 transition-transform text-lg">
          Order the Combo
        </button>
      </div>
    </div>
  </section>
  
  );
}
