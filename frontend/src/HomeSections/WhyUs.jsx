export default function WhyChooseUs() {
    const reasons = [
      { icon: "🪐", title: "Space-Fresh Ingredients", desc: "Every item is crafted with stellar-quality materials." },
      { icon: "🚀", title: "Lightspeed Delivery", desc: "We deliver faster than any Earth-bound competitor." },
      { icon: "👽", title: "Loved Across the Galaxy", desc: "Trusted by Martians, Saturnians & Earthlings alike." },
    ];
  
    return (
      <section className=" py-28 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-16 text-yellow-300 tracking-wider">Why AstroBite?</h2>
  
        <div className="flex flex-wrap justify-center gap-12 px-4">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-yellow-300/10 backdrop-blur-md p-6 rounded-2xl w-80 transform hover:scale-105 transition shadow-xl animate-float-slow"
            >
              <div className="text-5xl mb-4 drop-shadow-[0_0_10px_rgba(255,255,0,0.6)]">{reason.icon}</div>
              <h3 className="text-yellow-300 font-semibold text-xl mb-2">{reason.title}</h3>
              <p className="text-sm text-gray-300">{reason.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  