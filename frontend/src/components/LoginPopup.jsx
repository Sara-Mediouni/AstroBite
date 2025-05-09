import React, { useEffect, useState } from "react";
import { AnimatePresence ,motion} from "framer-motion";
import axios from "axios";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../redux/authSlice";
import { jwtDecode } from "jwt-decode";

const LoginPopup = ({ isOpen, onClose, type, toggleType }) => {
  const [form, setForm] = useState({});
  const [error, setError] = useState(""); // Ajout d'un état pour les erreurs
  const url = type === "Login" ? "login" : "register";
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null); 
      }, 3000); 

      return () => clearTimeout(timer); 
    }
  }, [error]);
  const Login = () => {
    
    axios
      .post(`http://localhost:4000/user/user/${url}`, form)
      .then((response) => {
        if (response.data.success) {
          dispatch(setToken(response.data.token));
          dispatch(setUser(jwtDecode(response.data.token).id));

          onClose();
          navigate("/");
        } else setError(response?.data?.message || "An Error has Occured.");
      })
      .catch((error) => {
        setError(error.response?.data?.message || "An Error has Occured.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Login();
  };

  return (
    <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-white/60 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
        >
          {/* Close button */}
          <button
            className="absolute top-3 right-3 text-[#1f1f2e] hover:text-[#fce588] transition-transform"
            onClick={onClose}
          >
            ×
          </button>
  
          {/* Title */}
          <h2 className="text-2xl font-bold text-[#1f1f2e] mb-4 text-center">
            {type === "Login" ? <>Welcome back </> : <>Welcome</>}
          </h2>
  
          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {type === "Signup" && (
              <>
              <label className="label-input block" for="fullname">Full Name</label>
                <input
                  id="fullname"
                  type="text"
                  value={form?.fullname}
                  placeholder="Full Name"
                  onChange={handleChange}
                  name="fullname"
                  className="input-style"
                />
                <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-3 justify-center items-start">
                <label className="label-input block" for="city">City</label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={form?.city}
                    placeholder="City"
                    onChange={handleChange}
                    className="input-style"
                  />

                  </div>
                  <div className="flex flex-col gap-3 justify-center items-start">
                  <label className="label-input" for="address">Adress</label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={form?.address}
                    placeholder="Address"
                    onChange={handleChange}
                    className="input-style"
                  />
                </div>
                </div>
               
                <label className="label-input">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={form?.phone}
                    placeholder="Phone"
                    onChange={handleChange}
                    className="input-style"
                  />
                
            
              </>
            )}
            <label className="label-input">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={form?.email}
              className="input-style"
            />
             <label className="label-input">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form?.password}
              onChange={handleChange}
              className="input-style"
            />
            {type === "Signup" && (
             <> <label className="label-input">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                value={form?.confirmPassword}
                name="confirmPassword"
                className="input-style"
              /></>
            )}
            <button
              type="submit"
              className="button-login"
            >
              {type === "Login" ? "Log In" : "Sign Up"}
            </button>
          </form>
  
          {/* Error messages */}
          {error && (
            <div data-testid="error" className="mt-4 p-3 text-yellow-600 bg-yellow-100 rounded-lg text-center">
              {error}
            </div>
          )}
  
          <div className="text-center text-sm text-[#1f1f2e] mt-4">
            {type === "Login" ? (
              <>
                Don’t have an account?{" "}
                <button
                  onClick={() => toggleType("Signup")}
                  className="text-[#fce588] hover:underline font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already a member?{" "}
                <button
                  onClick={() => toggleType("Login")}
                  className="text-[#fce588] hover:underline font-medium"
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  
  
  );
};

export default LoginPopup;
