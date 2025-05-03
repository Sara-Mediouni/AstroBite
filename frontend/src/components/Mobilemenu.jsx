import React from "react";
import { FiX } from "react-icons/fi";

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-40 bg-[#fffaf7] text-[#4b2e2e] transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex justify-between mt-13 items-center p-6 border-b">
        <h2 className="text-xl font-bold">Menu</h2>
     
        <button onClick={onClose} className="text-[#e76f51] text-2xl font-bold hover:scale-110 right-0">×</button>
       
      </div>

      <nav className="flex flex-col items-start px-6 py-4 gap-6 font-medium text-lg">
        <a href="/" onClick={onClose}>Home</a>
        <a href="/menu" onClick={onClose}>Menu</a>
        <a href="#about" onClick={onClose}>About</a>
        <a href="#contact" onClick={onClose}>Contact</a>
      </nav>
    </div>
  );
};

export default MobileMenu;
