export default function Contact() {
    return (
      <section className="min-h-screen mt-40 text-white py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-yellow-300 mb-8">Send Us a Signal</h2>
          <p className="text-gray-300 mb-12">Need help or wanna send us a cosmic compliment? Use the console below!</p>
  
          <form className="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10 shadow-md">
            <input
              type="text"
              placeholder="Your Intergalactic Name"
              className="w-full px-4 py-3 rounded-md bg-black/40 border border-yellow-100/20 text-white placeholder-gray-400"
            />
            <input
              type="email"
              placeholder="Your StarNet Address"
              className="w-full px-4 py-3 rounded-md bg-black/40 border border-yellow-100/20 text-white placeholder-gray-400"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-md bg-black/40 border border-yellow-100/20 text-white placeholder-gray-400"
            ></textarea>
            <button
              type="submit"
              className="bg-yellow-300 text-black font-bold px-6 py-3 rounded-full hover:scale-105 transition shadow-yellow-500/30 shadow-md"
            >
              Transmit Message
            </button>
          </form>
        </div>
      </section>
    );
  }
  