import React from "react";

const MyOrders = ({ orders, onOrderClick, onCancelOrder }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r mt-40 text-white p-6">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-extrabold">Welcome to Your Galaxy of Orders </h1>
        <p className="text-lg mt-2">Explore your orders and enjoy the flavors from across the universe!</p>
      </header>

      {/* Orders List */}
      <div className="space-y-6">
        {orders?.length === 0 ? (
          <p className="text-center text-lg">No orders yet. Ready to explore the galaxy of delicious food? 🌠</p>
        ) : (
          orders?.map((order, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-gradient-to-r from-pink-500 via-indigo-500 to-purple-500 rounded-lg p-6 shadow-lg hover:scale-105 transition-all"
            >
              {/* Image and order details */}
              <div className="flex items-center gap-4">
                <img
                  src={order.image}
                  alt={order.name}
                  className="w-20 h-20 rounded-lg object-cover border-2 border-white"
                />
                <div>
                  <h3 className="font-semibold text-xl">{order.name}</h3>
                  <p className="text-sm text-gray-200">Status: {order.status}</p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => onOrderClick(order.id)}
                  className="text-white bg-blue-600 py-2 px-6 rounded-lg hover:bg-blue-500 transition"
                >
                  View Details
                </button>
                <button
                  onClick={() => onCancelOrder(order.id)}
                  className="text-white bg-yellow-600 py-2 px-6 rounded-lg   transition"
                >
                  Cancel
                </button>
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
