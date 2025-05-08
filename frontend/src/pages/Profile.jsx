import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const [UserData, setUserData] = useState({})
  const user=localStorage.getItem('user')
  const countries = useSelector((state) => state.country.countries);

 
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullname: "",
    country:"",
    city:"",

    email: "",
    phone: "",
    address: "",
  });
  const getuser=()=>{
    
    axios.get(`http://localhost:4000/user/user/getuser/${user}`)
    .then((response)=>{
      console.log(response)
      setUserData(response.data.user)
    })
    .catch((error)=>console.log("error getting user",error))
  }
  const handleEditUser=()=>{
    
    axios.put(`http://localhost:4000/user/user/updateuser/${user}`,profile)
    .then((response)=>{
      console.log(response)
      
    })
    .catch((error)=>console.log("error editing user",error))
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
    
      console.log('Updated Profile:', profile);
      handleEditUser()
    }
  };
  useEffect(()=>{
    getuser();
   },[])
   useEffect(()=>{
     console.log(UserData)
     
     setProfile(UserData)
   },[UserData])
  return (
    <div className="min-h-screen p-8 mt-50 text-white font-sans">
      <div className="max-w-4xl mx-auto bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 backdrop-blur-md">
        <h2 className="text-3xl font-extrabold text-yellow-400 mb-8 text-center drop-shadow-[0_0_8px_#facc15] tracking-wide">
           Galactic Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["fullname", "email", "phone", "address","city"].map((field) => (
            <div key={field}>
              <label for={field} className="block text-sm font-semibold text-yellow-300 mb-1 capitalize">
                {field}
              </label>
              <input
                id={field}
                type={field === "email" ? "email" : "text"}
                name={field}
                value={profile[field]}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full px-4 py-2 rounded-xl bg-white/5 border border-yellow-400/20 text-yellow-100 placeholder-gray-400 focus:outline-none transition-all duration-200 ${
                  isEditing
                    ? "focus:ring-2 focus:ring-yellow-400"
                    : "cursor-default"
                }`}
              />
            </div>
          ))}
          <div>
            <label className="block text-brown-500 font-medium mb-1">Country</label>
            <select
             
              name="country"
              
              onChange={handleChange}
              readOnly={!isEditing}
              className={`w-full px-4 py-2 rounded-xl bg-white/5 border border-yellow-400/20 text-black placeholder-gray-400 focus:outline-none transition-all duration-200 ${
                  isEditing
                    ? "focus:ring-2 focus:ring-yellow-400"
                    : "cursor-default"
                }`}
            >
              <option>Select country</option>
              {countries.map((country,index)=> 
              <option key={index} value={country}>{country}</option>)}
             
            </select>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={handleEditToggle}
            className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-8 rounded-full shadow-md transition duration-300"
          >
            {isEditing ? "Save" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
