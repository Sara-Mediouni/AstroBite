import React from 'react'

import {Routes, Route, useLocation} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import ListOrders from './Components/ListOrders'
import AddfoodForm from './Components/AddFoodForm'
import EditfoodForm from './Components/EditFoodForm'
import ListFood from './Components/ListFood'
import ProtectedRoute from './Components/ProtectedRoutes'
import Login from './Components/Login'
import LoginRoute from './Components/LoginRoute'

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';
  return (
    <div className="flex h-screen overflow-hidden bg-white">
       {!isLoginPage && <Sidebar />}
      <div className="flex-1 flex flex-col">
      {!isLoginPage && <Navbar />}
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <Routes>
          <Route path="/" element={<LoginRoute><Login/></LoginRoute>}/>
          <Route path="/addfood" element={<ProtectedRoute><AddfoodForm/></ProtectedRoute>} />
          <Route path="/editfood" element={<ProtectedRoute><EditfoodForm/></ProtectedRoute>} />
         
          <Route path="/food" element={<ProtectedRoute><ListFood /></ProtectedRoute>} />
            
          <Route path="/orders" element={<ProtectedRoute><ListOrders/></ProtectedRoute>} />
   
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App