export default function Testimonials() {
    const feedbacks = [
      { name: "Zork – Jupiter Colony", text: "Your fries... they changed my species." },
      { name: "Luna-X88 – Venus Station", text: "No one delivers this fast. I blinked, and boom – burger!" },
      { name: "Chakkar – Mars Dome", text: "Even our Emperor eats here. Praise the sauce!" },
    ];
  
    return (
      <section className=" py-24 px-4 text-white text-center">
        <h2 className="text-4xl font-bold mb-14 text-yellow-300 tracking-wider">Testimonials From the Stars</h2>
  
        <div className="flex flex-wrap justify-center gap-10">
          {feedbacks.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-md rounded-xl p-6 w-72 border border-yellow-200/10 shadow-md animate-float-slow"
            >
              <p className="text-gray-300 italic mb-4">"{item.text}"</p>
              <h4 className="text-yellow-200 font-semibold">{item.name}</h4>
            </div>
          ))}
        </div>
      </section>
    );
  }
  