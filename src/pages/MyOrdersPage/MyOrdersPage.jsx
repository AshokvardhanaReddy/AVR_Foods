import React, { useContext, useEffect, useState } from "react";
import "./MyOrdersPage.css";

import { StoreContext } from "../../context/StoreContext";
import parcel_icon from "../../assests/parcel_icon.png";

const MyOrdersPage = () => {
  const [data, setData] = useState([]);
  const { url, currency, dot } = useContext(StoreContext);
  let token = true;
  
  const fetchOrders = async () => {
    await fetch(`${url}placed_orders`)
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="my-orders">
      <h2>My Orders :</h2>
      <div className="container">
        {data.map((order, index) => {
          return (
            <div key={index} className="my-orders-order">
              <img src={parcel_icon} alt="" />
              <p className="my-order-items-name">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p>
                {currency}
                {order.amount}
              </p>
              <p>Items: {order.items.length}</p>
              <p className="my-order-status">
                {dot}
                {order.order_status}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrdersPage;
