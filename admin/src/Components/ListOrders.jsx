import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ListOrders = () => {
    const [Orders,setOrders]=useState([])
    const getorders=()=>{
      axios.get('http://localhost:4000/api/order/list')
      .then((response)=>{
        console.log(response.data.data)
        setOrders(response.data.data)
      }).catch((error)=>{
        console.log('Error getting orders',error)
      })
    }
  useEffect(()=>{
    getorders()
  },[])
  return (
     <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-black mb-6">List of Orders</h1>
        <div className="flex justify-between mb-4">

        </div> <div  className="grid  text-black grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
        {Orders && Orders?.map((order,index)=>
          <div key={index} className="bg-yellow-100 flex-col flex shadow-md rounded-lg p-4 space-y-2">
          <h2 className="text-xl font-semibold text-yellow-500">{order.userId.fullname}</h2>
         
          <span>Country: {order.userId.country}</span>
          <span>Date: {order.date}</span>
          <span>Paid: {order.payment ? 'Yes': 'No'}</span>
          <span>Items: {order.items.map((item,index)=>
          <ul key={index}>
            <li>
             Name: {item.item.name}
            </li>
            <li>
             Quantity {item.quantity}
            </li>
         
          </ul>
          
          )}</span>
          <span>Amount: {order.amount}</span>

        

             </div> 
        
        )}
         </div>
        </div>
  )
}

export default ListOrders