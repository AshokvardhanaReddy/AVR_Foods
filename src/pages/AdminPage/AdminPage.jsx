import React from "react";

import "./AdminPage.css";
import { NavLink, Outlet } from "react-router-dom";
import add_icon from "../../assests/add_icon.png";
import order_icon from "../../assests/order_icon.png";
import orders_icon from "../../assests/orders.png";

const AdminPage = () => {
  return (
  <>
    <hr/>
    <section className = "admin-container" >
      <div className="sidebar">
        <div className="sidebar-options">
          <NavLink
            to="/admin/add-product"
            className={({ isActive }) =>
              isActive ? "sidebar-option active" : "sidebar-option"
            }
          >
            <img src={add_icon} alt="" />
            <p>Add Product</p>
          </NavLink>
          <NavLink to="/admin/list-items" className="sidebar-option">
            <img src={order_icon} alt="" />
            <p>List Items</p>
          </NavLink>
          <NavLink to="/admin/customer-orders" className="sidebar-option">
            <img src={orders_icon} alt="" />
            <p>Orders</p>
          </NavLink>
        </div>
      </div >
     <div className  = "admin-outlet" >
     <Outlet />
     </div>
    </section>
  </>

  );
};

export default AdminPage;
