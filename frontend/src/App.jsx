import React, { useContext, useEffect, useState } from 'react'
import NotFound from './pages/404NotFound'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { StoreContext } from './context/StoreContext'
import MobileMenu from './components/Mobilemenu'
import CartDrawer from './components/CartDrawer'
import Loader from './components/Loader'
import About from './pages/About'
import Contact from './pages/Contact'
import Menu from './pages/Menu'
import ProfilePage from './pages/Profile'
import MyOrders from './pages/MyOrders'
import VerifyOrder from './pages/verify'
const App = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const {cartItems}=useContext(StoreContext)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    console.log(cartItems)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-gray-900 to-gray-800 ">
    <main className="flex-grow">
    <Navbar cartCount={cartItems.length}
        onCartClick={() => setCartOpen(true)}
        onMobileMenuClick={() => setMobileOpen(true)}/>
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} cart={cartItems} />
      <Routes>
   
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/myprofile" element={<ProfilePage />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/verify" element={<VerifyOrder />} />
          </Routes>
      
        <Footer/>
    </main> 
     </div>
  )
}

export default App