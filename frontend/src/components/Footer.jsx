export default function Footer() {
  return (
    <footer className=" text-white absolute bottom-0 w-full max-h-2xl py-10 border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <div className="text-yellow-300 font-bold tracking-wider text-lg">
          🚀 AstroBite © 2025
        </div>

        <ul className="flex space-x-6 text-sm text-gray-400">
          <li className="footer-link">Privacy Policy</li>
          <li className="footer-link">Terms</li>
          <li className="footer-link">Contact</li>
        </ul>
      </div>
    </footer>
  );
}
