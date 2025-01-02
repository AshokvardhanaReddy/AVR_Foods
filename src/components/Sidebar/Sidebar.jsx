import React from 'react'
import  './Sidebar.css'
import { Link, Outlet } from 'react-router-dom'
import add_icon from "../../assests/add_icon.png";
import order_icon from "../../assests/order_icon.png";

const Sidebar = () => {

  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <Link to='/add-product'  className = {({isActive}) => (isActive ? "sidebar-option active" : "sidebar-option")} >
            <img src={add_icon} alt="icon image" />
            <p>Add Product</p>
        </Link>
        <Link to='list-items' className="sidebar-option">
            <img src={order_icon} alt="icon image" />
            <p>List Items</p>
        </Link>
        <Link to='customer-orders' className="sidebar-option">
            <img src={order_icon} alt="icon image" />
            <p>Orders</p>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
