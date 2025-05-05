import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import Swal from 'sweetalert2'

const CartDrawer = ({ isOpen, onClose, cartItems}) => {
  const user=localStorage.getItem('user')
 
  const token =localStorage.getItem('token')
  const [orderData, setorderData] = useState()
  console.log(cartItems)
  const {food_list,removeFromCart,addToCart,getTotalCartAmount}=useContext(StoreContext)
  const handleOrder=()=>{
    let orderItems=[];
    food_list.map((item)=>{
    if (cartItems[item._id]?.quantity>0){
      let itemInfo=item;
      itemInfo["quantity"]=cartItems[item._id].quantity;
 
      orderItems.push(itemInfo);
    }
    })
    setorderData({userId:user,items:orderItems,amount:getTotalCartAmount()})
    console.log(orderItems);
   
    
  }
  const checkout=async()=>{
    try {
      await handleOrder(); // Assure que les données sont bien prêtes
      const response = await axios.post("http://localhost:4000/order/order/place", orderData);
      
      console.log(response);
  
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url); // Redirige vers Stripe ou autre
      }
    } catch (error) {
      console.log("Checkout error:", error);
    }
  }
  
  
  return (
    <AnimatePresence>
    {isOpen && (
      <>
        {/* Overlay étoilé */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-40 bg-[url('/stars.svg')] bg-cover bg-center"
          onClick={onClose}
        />
  
        {/* Drawer */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 w-full sm:w-[420px] h-full  z-50 shadow-2xl md:bg-white/20 bg-black/90 rounded-l-[2rem] flex flex-col px-6 py-8"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold text-yellow-400 tracking-wide drop-shadow-[0_0_8px_#facc15]">
              🛒 My Cart
            </h2>
            <button onClick={onClose} className="text-white text-2xl font-bold hover:scale-110 transition-transform">
              ×
            </button>
          </div>
  
          {/* Content */}
          {Object.keys(cartItems).length === 0 ? (
            <p className="text-[#f3e1d1] mt-14 text-center">Your Cart is Empty.</p>
          ) : (
            <div className="flex-1 overflow-y-auto mt-10 space-y-6 pr-2">
              {food_list?.map((item, idx) => {
                if (cartItems[item._id]?.quantity > 0)
                  return (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-gradient-to-r rounded-2xl p-4 border border-[#f2e8e2] shadow-lg"
                    >
                      <div className="flex items-center gap-4">
                        <img src={`http://localhost:4003/uploads/${item.image}`} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                        <div>
                          <h3 className="text-yellow-300 font-semibold">{item.name}</h3>
                          <div className="flex items-center mt-1 space-x-2">
                            <button
                              className="bg-[#eee0d9] text-[#2b1e17] px-2 rounded-full text-sm"
                              onClick={() => removeFromCart(item._id)}
                            >−</button>
                            <span className="font-medium text-[#f3e1d1]">{cartItems[item._id].quantity}</span>
                            <button
                              className="bg-[#eee0d9] text-[#2b1e17] px-2 rounded-full text-sm"
                              onClick={() => addToCart(item._id)}
                            >+</button>
                          </div>
                       
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[#f3e1d1] font-bold">{(item.price * cartItems[item._id].quantity).toFixed(2)} TND</p>
                        <button
                          className="text-yellow-500 text-xs hover:underline"
                          onClick={() => removeFromCart(item._id)}
                        >Delete</button>
                      </div>
                    </div>
                  );
              })}
            </div>
          )}
  
          {/* Footer */}
          <div className="pt-6 border-t border-[#f2e8e2] mt-6">
            <div className="flex justify-between text-lg font-semibold text-[#f3e1d1] mb-4">
              <span>Total</span>
              <span>{getTotalCartAmount()} TND</span>
            </div>
            <button
              onClick={() => {
                if (token) {
                  checkout();
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You have to Login First!",
                  });
                }
              }}
              className="w-full py-4 rounded-full bg-yellow-300  text-white font-bold transition-all shadow-xl hover:shadow-2xl animate-pulse"
            >
              Checkout
            </button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
  
  );
};

export default CartDrawer;
