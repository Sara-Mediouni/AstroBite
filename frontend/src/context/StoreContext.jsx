import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {}; // ou [] si ton panier est un tableau
  });
  const [food_list, setFoodList] = useState([]);

  const addToCart = (itemId) => {
    setcartItems((prev) => {
      const existingItem = prev[itemId];
  
      if (!existingItem) {
        return {
          ...prev,
          [itemId]: {
            quantity: 1,
           
          }
        };
      } else {
        return {
          ...prev,
          [itemId]: {
            ...existingItem,
            quantity: existingItem.quantity + 1
          }
        };
      }
    });
  };

  const removeFromCart = (itemId) => {
    setcartItems((prev) => {
      const currentItem = prev[itemId];
  
      if (!currentItem) return prev;
  
      if (currentItem.quantity > 1) {
        return {
          ...prev,
          [itemId]: {
            ...currentItem,
            quantity: currentItem.quantity - 1,
          },
        };
      } else {
        const updatedCart = { ...prev };
        delete updatedCart[itemId];
        return updatedCart;
      }
    });
  };
  
  const fetchFoodList=async()=>{
   await axios.get("http://localhost:4000/food/food/")
    .then((response)=>
      {setFoodList(response.data.foods)
    console.log(response.data)})
    .catch((error)=>{
      console.log(error)
    })
    
}
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item].quantity > 0) {
        const itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item].quantity;
        }
      }
    }
    return totalAmount.toFixed(2);
  };  
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);
  useEffect(()=>{
    
    async function loadData(){
      await fetchFoodList();
   

  }loadData();
  },[])
  const contextValue = {
    food_list,
    cartItems,
    setcartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
