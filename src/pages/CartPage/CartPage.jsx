import React, { useContext, useEffect, useState } from 'react'
import './CartPage.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import item_image from "../../assests/food.jpg";
import NoProducts from "../../components/NoProducts/NoProducts";
import { MdDeleteForever } from "react-icons/md";


const CartPage = () => {
  const {cartItems, food_list,getTotalCartAmount,deliveryCharge, deleteProductFromCart} = useContext(StoreContext);
  const [totalCartProducts, setTotalCartProducts] = useState( Object.keys(cartItems).length)

  const navigate = useNavigate();
  
 useEffect(()=>{
  setTotalCartProducts(Object.keys(cartItems).length);
 },[deleteProductFromCart, cartItems])

  return (
    <>
     {totalCartProducts === 0 ? <NoProducts/> : <div className='cart'>
    <div className="cart-items">
      <div className="cart-items-title">
        <p>Items</p> <p>Title</p> <p className = "cart-text-center" >Price</p> <p className = "cart-text-center" >Qty</p> <p className = "cart-text-center" >Total</p> <p className = "cart-text-center" >Action</p>
      </div>
      {food_list.forEach((item, index) => {
        if (cartItems[item._id]>0) {
          return (<div key={index}>
            <div className="cart-items-title cart-items-item">
              <img src={item_image} alt="item img" />
              <p>{item.name}</p>
              <p className = "cart-text-center" > &#8377;&nbsp;{item.price}</p>
              <p className = "cart-item-qty" >{cartItems[item._id]}</p>
              <p className = "cart-text-center" > &#8377; &nbsp;{item.price*cartItems[item._id]}</p>
              <button className='cart-item-delete delete-option' onClick={()=>deleteProductFromCart(item._id)}><MdDeleteForever className = "delete-icon" /></button>
            </div>
            <hr />
          </div>)
        }
      })}
    </div>
    <div className="cart-bottom">
      <div className="cart-total">
        <h2>Cart Details : </h2>
        <div>
          <div className="cart-total-details"><p>Subtotal</p><p>&#8377; &nbsp;{getTotalCartAmount()}</p></div>
          <hr />
          <div className="cart-total-details"><p>Delivery Fee</p><p>&#8377; &nbsp;{getTotalCartAmount()===0?0:deliveryCharge}</p></div>
          <hr />
          <div className="cart-total-details"><b>Total</b><b>&#8377; &nbsp;{getTotalCartAmount()===0?0:getTotalCartAmount()+deliveryCharge}</b></div>
        </div>
        <button onClick={()=>navigate('/checkout')}>PROCEED TO CHECKOUT</button>
      </div>
    </div>
  </div> }
    </>
    
  )
}

export default CartPage;
