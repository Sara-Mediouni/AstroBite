import React from "react";
import {useState, useEffect} from "react"
import axios from 'axios'
const MyOrders = () => {
  const [orders, setOrders] = useState([])
  const userId=localStorage.getItem('user')
  const [newStatus, setnewStatus] = useState("Cancelled")
  const getmyorders=()=>{
    axios.get(`http://localhost:4000/order/order/userorders/${userId}`)
    .then((response)=>
      {setOrders(response.data.data);
      console.log(response.data)
    })
    .catch((error)=>console.log(error))
  }
  const onCancelOrder=(orderId)=>{
    axios.post(`http://localhost:4000/order/order/status`,{orderId,newStatus})
    .then((response)=>
      {getmyorders();
      console.log(response.data)
    })
    .catch((error)=>console.log(error))
  }
  
  useEffect(()=>{
   getmyorders();
  },[userId])
  return (
    <div className="min-h-screen bg-gradient-to-r mt-40 text-white p-6">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold">Welcome to Your Galaxy of Orders </h1>
        <p className="text-lg mt-2">Explore your orders and enjoy the flavors from across the universe!</p>
      </header>

      {/* Orders List */}
      <div className=" grid grid-cols-2 gap-12">
  {orders?.length === 0 ? (
    <p className="text-center text-lg text-white/70">
      No orders yet. Ready to explore the galaxy of delicious food? 🌠
    </p>
  ) : (
    orders?.map((order, idx) => (
      <div
    data-testid={`order-${order._id}`}
    key={order._id}
    className="min-w-[220px] px-auto border border-white/10 backdrop-blur-md bg-white/10 rounded-lg p-6 shadow-xl hover:scale-[1.02] transition-transform space-y-4"
  >
    {/* Items in the order */}
    <div className="flex flex-col items-start gap-6 w-full">
      {order.items.map((item, index) => (
        <div key={index} className="flex items-center gap-4">
          <img
            src={`http://localhost:4003/uploads/${item.item.image}`}
            alt={item.item.name}
            className="w-20 h-20 rounded-lg object-cover border-2 border-yellow-300 shadow"
          />
          <div>
            <h3 className="font-bold text-lg text-yellow-300">{item.item.name}</h3>
            <p className="text-sm text-white/80">
              Quantity: <span className="text-white font-semibold">{item.quantity}</span>
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* Status & Actions */}
    <div className="flex flex-col md:justify-between justify-start md:items-center items-start gap-10 mt-4">
    <p className="text-sm text-white/80">Total: {order.amount}</p>
      <p className="text-sm text-white/80">
        Status:{" "}
        <span className="font-semibold">
          {order.status === "Pending" ? "🕒" : ""} {order.status}
        </span>
      </p>
      {order.status === "Cancelled" ? <></> :
       <button
        data-testid={`cancel-${order._id}`}
        onClick={() => onCancelOrder(order._id)}
        className="bg-red-500 hover:bg-red-400 text-white font-semibold px-5 py-2 rounded-full transition"
      >
        Cancel
      </button>}
     
    </div>
  </div>
    ))
  )}
</div>


      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="text-sm">Want to try something new? Explore the galaxy and order now! 🌟</p>
      </footer>
    </div>
  );
};

export default MyOrders;
