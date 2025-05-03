export default function NotFound() {
    return (
      <section className="min-h-screen flex flex-col justify-center items-center  text-white px-6 text-center">
        <h1 className="text-[120px] md:text-[160px] font-extrabold text-yellow-300 leading-none">404</h1>
        <p className="text-2xl md:text-3xl font-bold tracking-widest mb-4">Lost in Space</p>
        <p className="text-white/70 text-lg max-w-md mb-8">
          The page you’re trying to reach drifted off into the cosmos. Let’s get you back to safety.
        </p>
        <button className="px-6 py-3 bg-yellow-300 text-black font-bold rounded-full shadow hover:scale-105 transition-transform">
          Return to Home
        </button>
      </section>
    );
  }
  