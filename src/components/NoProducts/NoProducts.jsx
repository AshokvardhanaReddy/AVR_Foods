
import React from 'react';
import "./NoProducts.css";

import no_cart_image from "../../assests/no_cart.png";

const NoProducts = () => {
  return (
    <div className = "empty-cart" >
      <img className = "empty-cart-image" src = {no_cart_image} alt = "The List is Empty" />
      <h1 className = "empty-cart-heading" >There is No Products to Show</h1>
    </div>
  )
}

export default NoProducts
