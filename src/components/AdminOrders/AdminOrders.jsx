import React, { useContext, useEffect, useState } from 'react'
import './AdminOrders.css'
import parcel_image from "../../assests/parcel_icon.png";
import { StoreContext } from '../../context/StoreContext';

const AdminOrders = () => {
  const {url, currency} = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await fetch(`${url}placed_orders`).then((res)=> res.json()).then((data)=>setOrders(data))
  }

  const statusHandler = async (event, orderId) => {
    const response = fetch(`${url}placed_orders/${orderId}`, {
      method : "PUT",
      headers : {
      "Content-Type" : "application/json"
      },
      body : JSON.stringify({order_status : event.target.value})
    })
  }
  useEffect(() => {
    fetchAllOrders();
  }, [statusHandler])

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={parcel_image} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity
                  }
                  else {
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              {/* <p className='order-item-name'>{order.address.firstName + " " + order.address.lastName}</p>
              <div className='order-item-address'>
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p> */}
            </div>
            <p>{currency}{order.amount}</p>
            <p>Items: {order.items.length}</p>
            <select onChange={(e) => statusHandler(e, order._id)} value={order.order_status} name="" id="">
              <option value="Food Processing"  >Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminOrders;
