import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {FaTrash} from 'react-icons/fa'
const ListOrders = () => {
    const [Orders,setOrders]=useState([])
    const token=localStorage.getItem('admin')

    const getorders=()=>{
      axios.get('http://localhost:4000/order/admin/list',
        {headers: {
          'Authorization':`Bearer ${token}`
          
        }}
      )
      .then((response)=>{
        console.log(response.data)
        setOrders(response.data)
      }).catch((error)=>{
        console.log('Error getting orders',error)
      })
    }
    const handleDelete=(orderId)=>{
      axios.delete(`http://localhost:4000/order/admin/${orderId}`,{
        headers: {
          'Authorization':`Bearer ${token}`
          
        }
      })
      .then((response)=>{
       console.log(response)
       toast.success(response.data.message)
       getorders()
      }).catch((error)=>{
        console.log('Error getting food',error)
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
          <h2 className="text-xl font-semibold text-yellow-500">n°{order._id}</h2>

           <span>Fullname: {order.user.fullname}</span>
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

        
   <div className='flex gap-5'> 
   <button className='delete' onClick={()=>handleDelete(order._id)}> <FaTrash /></button>
 
    </div>
   </div>
    
        
        )}
         </div>
        </div>
  )
}

export default ListOrders