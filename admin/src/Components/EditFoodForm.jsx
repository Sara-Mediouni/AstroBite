import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditfoodForm = () => {
  const [food, setfood] = useState();
  const foodId=localStorage.getItem('foodId')
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
    setfood((prev) => ({ ...prev, [name]: val }));
  };

 
  const getfood=()=>{
    axios.get(`http://localhost:4000/api/food/${foodId}`)
  .then((res)=>
    {
        setfood(res.data);
      toast.success(res.data.message)})

  .catch((error)=>toast.error('Error Adding the food',error))
  }
  const updatefood=async(e)=>{
    e.preventDefault();
    await axios.put(`http://localhost:4000/api/food/${foodId}`,food)
  .then((res)=>
    {console.log(res);
        toast.success('food updated successfully!')})
  .catch((error)=>toast.error('Error updating the food',error))
  }
useEffect(()=>{
getfood()
},[])
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit food</h2>
      <form onSubmit={(e)=>updatefood(e)} className="space-y-4">
        {/* Champs classiques */}
        {['name', 'description', 'price',"rating"].map((field) => (
           
          <div key={field}> 
          {food &&
           <> <label className="block mb-1 capitalize font-medium">{field}</label>
            <input
              type={field === 'price'|| field === 'rating'? 'number' : 'text'}
              name={field}
              value={food[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            /></>}
          </div>
        ))}

        {/* Catégories */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={food?.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          >
        <option value="">-- Select a category --</option>
            <option value="Espresso">Espresso</option>
            <option value="Latte">Latte</option>
            <option value="Cappuccino">Cappuccino</option>
            <option value="Mocha">Mocha</option>
            <option value="Cold Brew">Cold Brew</option>
            <option value="Frappuccino">Frappuccino</option>
            <option value="Tea">Tea</option>
            <option value="Smoothie">Smoothie</option>
          </select>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 font-medium">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Image</label>
          <img
            
            src={`http://localhost:4000/uploads/${food?.image}`}
            className="w-[100px] px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

    
        <button
          type="submit"
          className="w-full bg-yellow-400 text-white py-2 px-4 rounded-md   transition"
        >
          Edit food
        </button>
      </form>
    </div>
  );
};

export default EditfoodForm;
