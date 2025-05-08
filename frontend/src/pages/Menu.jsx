
import { useContext, useState,useEffect } from 'react';
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';


export default function Menu() {
 
  
  const [category, setCategory] = useState("")
  const [Food, setFood] = useState([])
  const [Categories, setCategories] = useState([])
  const {addToCart}=useContext(StoreContext)
  const getFood=()=>{
    const url = category
    ? `http://localhost:4000/food/food/category/${category}`
    : `http://localhost:4000/food/food`;
    axios.get(url)
    .then((response)=>{
      console.log(response.data);
      setFood(response.data.foods)
      
    }).catch((error)=>{
      console.log('Error',error)
    })
  }
  const getCategories=()=>{
    axios.get(`http://localhost:4000/food/food/getallcategories`)
    .then((response)=>{
      console.log(response);
      setCategories(response.data.uniqueCategories)
    }).catch((error)=>{
      console.log('Error',error)
    })
  }
 
  useEffect(() => {
    getCategories();
  }, []);
  
  useEffect(() => {
    getFood(); 
  }, [category]);
  
    return (
      <section className="min-h-screen mt-20 py-24 text-white text-center">
      {/* Categories */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-yellow-300 mb-6 tracking-widest drop-shadow-[0_0_6px_#facc15]">
          ✨ Choose a Category
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {Categories?.map((cat,idx) => (
            <button
              key={cat}
              onClick={()=>setCategory(cat)}
              className="bg-white/10 border border-yellow-400/30 text-yellow-100 px-5 py-2 rounded-full text-sm font-medium hover:bg-yellow-300 hover:text-black hover:shadow-[0_0_10px_#facc15] transition-all duration-300"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    
      {/* HoloMenu Title */}
      <h2 className="text-4xl font-bold text-yellow-300 mb-24 drop-shadow-[0_0_8px_#facc15]">🛸 HoloMenu</h2>
    
      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto px-4">
        {Food?.map((item, idx) => (
          <div
            key={item._id}
            className="bg-white/5 border border-yellow-200/10 rounded-xl p-6 shadow-md hover:scale-105 transition animate-float-medium"
          >
            <img src={`http://localhost:4003/uploads/${item.image}`} alt={item.name} className="w-32 h-32 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-yellow-300">{item.name}</h3>
            <p className="text-gray-300">{item.price}</p>
            <button onClick={()=>{addToCart(item._id)}}
            className="mt-4 bg-yellow-300 text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
              Add to Order
            </button>
          </div>
        ))}
      </div>
    </section>
    
    );
  }
  