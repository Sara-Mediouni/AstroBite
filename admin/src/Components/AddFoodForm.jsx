import React, { useState } from 'react';
import axios from 'axios';

const AddfoodForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    rating:''
  
  });

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value;
  
    setFormData((prev) => {
      const updated = { ...prev, [name]: val };
     
      return updated;
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append all fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== '' && value !== null) {
        data.append(key, value);
      }
    });

    try {
      await axios.post('http://localhost:4000/api/food/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('food Added Successfully');
    } catch (err) {
      console.error('Error uploading food:', err);
      alert('Error uploading food');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add food</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champs classiques */}
        {["name", "description", "price","rating"].map((field) => (
          <div key={field}>
            <label className="block mb-1 capitalize font-medium">{field}</label>
            <input
              type={field === "price" ||field === "rating" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            
              
            />
          </div>
        ))}

        {/* Catégories */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
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
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-white py-2 px-4 rounded-md   transition"
        >
          Add food
        </button>
      </form>
    </div>
  );
};

export default AddfoodForm;
