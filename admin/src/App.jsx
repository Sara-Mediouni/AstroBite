import React from 'react'

import {Routes, Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import ListOrders from './Components/ListOrders'
import AddfoodForm from './Components/AddFoodForm'
import EditfoodForm from './Components/EditFoodForm'
import ListFood from './Components/ListFood'

const App = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar  />
      <div className="flex-1 flex flex-col">
        <Navbar/>
        <main className="flex-1 p-4 overflow-y-auto bg-gray-100">
          <Routes>
          <Route path="/addfood" element={<AddfoodForm/>} />
          <Route path="/editdrink" element={<EditfoodForm/>} />
         
          <Route path="/food" element={<ListFood />} />
            
          <Route path="/orders" element={<ListOrders />} />
   
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App