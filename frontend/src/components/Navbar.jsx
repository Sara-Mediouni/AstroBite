import React, { useContext, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { StoreContext } from "../context/StoreContext";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../redux/authSlice";
import { RiAliensLine } from "react-icons/ri";
import {RxAvatar} from 'react-icons/rx'
import LoginPopup from "./LoginPopup";
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
const Navbar = ({ onCartClick,onMobileMenuClick }) => {
   const {cartItems}=useContext(StoreContext)
   const navigate=useNavigate()
   const dispatch=useDispatch()
   const token = useSelector((state) => state.auth.token);
   const [isAvOpen, setIsAvOpen] = useState(false);
   const [showLogin, setShowLogin] = useState(false);
   const [Type, setType] = useState('Login')
   const handleLogout = () => {
    dispatch(clearToken(token))
    localStorage.clear()
     console.log("Logout...");
     navigate('/')
   };
   const togglePopupType = (newType) => {
     setType(newType); // Change le type de popup (Login ou Signup)
   };
  return (
    <header className="min-w-screen fixed bg-white/20 top-0 left-0 z-50  shadow-md ">
    <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
    {/* Logo */}
    <h1 className="text-2xl md:text-3xl font-extrabold text-yellow-300 tracking-wide drop-shadow-[0_0_6px_#facc15] transform transition-all duration-500 hover:text-white">
      AstroBite
    </h1>

    {/* Navigation */}
    <nav className="hidden md:flex gap-10 font-medium text-white text-base">
      <a href="/" className="nav-link">
        Home
      </a>
      <a href="/menu" className="nav-link">
        Menu
      </a>
      <a href="/about" className="nav-link">
        About
      </a>
      <a href="/contact" className="nav-link">
        Contact
      </a>
    </nav>
        {/* Cart Icon */}
        <div className="relative mr-10 grid grid-cols-2 gap-10">
        <div className="relative flex justify-center items-center">
          <button
            onClick={onCartClick}
            className="nav-link text-2xl text-white"
            aria-label="Open cart"
          >
            <FiShoppingCart />
          </button>
          {cartItems && (
            <span className="absolute top-0 right-0 bg-yellow-500 text-white text-xs font-bold px-2 py-[1px] rounded-full shadow-md animate-bounce">
              {Object.keys(cartItems).length }
            </span>
          )}</div>
          <div className="flex items-center ml-auto">
        {token ? (
          <div className="relative">
            <button
              onClick={() => setIsAvOpen(!isAvOpen)}
              className="text-white font-bold flex items-center gap-2 px-5 py-2"
            >
               <RiAliensLine size={30}/>
            </button>
  
            {isAvOpen && (
              <div className="absolute right-0  w-48 bg-white border border-gray-200 rounded-xl shadow-xl">
                <Link
                  to="/myprofile"
                  className="block px-4 py-2 text-gray-700 hover:bg-yellow-300 rounded-t-xl"
                  onClick={() => setIsAvOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  to="/myorders"
                  className="block px-4 py-2 text-gray-700 hover:bg-yellow-300"
                  onClick={() => setIsAvOpen(false)}
                >
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsAvOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-yellow-300 rounded-b-xl"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          
            <button
              onClick={() => {
                setType("Login");
                setShowLogin(true);
              }}
              className="text-white nav-link font-bold rounded-full border-2 px-3 "
            >
             Login
            </button>
         
        
        )}
      </div>
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden text-xl text-white"
         onClick={onMobileMenuClick}>☰</div>
      </div>
      <LoginPopup
      isOpen={showLogin}
      type={Type}
      onClose={() => setShowLogin(false)}
      toggleType={togglePopupType}
    />
    </header>
  );
};

export default Navbar;
