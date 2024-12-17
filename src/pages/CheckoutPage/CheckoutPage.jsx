import React, { useContext, useEffect, useState } from 'react'
import './CheckoutPage.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import checked_image from "../../assests/checked.png";
import unchecked_image from  "../../assests/un_checked.png";

const CheckoutPage = () => {
    const [payment, setPayment] = useState("COD")
    const [data, setData] = useState({
        firstName: "",
        address: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
        phone: ""
    })

    const { getTotalCartAmount, food_list, cartItems, url, setCartItems,currency,deliveryCharge } = useContext(StoreContext);
   let token  = true;
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (e) => {
        e.preventDefault()
        let orderItems = [];
        food_list.map(((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        }))
        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryCharge,
            order_status : "Food Processing",
            payment_mode : payment
        }
        console.log(orderData);
          let response = await fetch(`${url}placed_orders`, {
            method : "POST",
            headers : {
              "Content-Type" : "application/json"
            },
            body : JSON.stringify(orderData)
          })
          navigate("/my-orders");
          setCartItems({});
    }

    useEffect(() => {
        if (!token) {
            alert("to place an order sign in first")
            navigate('/cart')
        }
        else if (getTotalCartAmount() === 0) {
            navigate('/cart')
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information :</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                </div>
                <input type="text" name='address' onChange={onChangeHandler} value={data.address} placeholder='Enter Address' required />
                <input type="text" name='landmark' onChange={onChangeHandler} value={data.landmark} placeholder='Landmark' required />
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                </div>
                <div className="multi-field">
                    <input type="number" name='pincode' onChange={onChangeHandler} value={data.pincode} placeholder='Pincode' required />
                <input type="number" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
                </div>
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details"><p>Subtotal</p><p>&#8377; &nbsp;{getTotalCartAmount()}</p></div>
                        <hr />
                        <div className="cart-total-details"><p>Delivery Fee</p><p>&#8377; &nbsp;{getTotalCartAmount() === 0 ? 0 : deliveryCharge}</p></div>
                        <hr />
                        <div className="cart-total-details"><b>Total</b><b>&#8377; &nbsp;{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryCharge}</b></div>
                    </div>
                </div>
                <div className="payment">
                    <h2>Payment Method</h2>
                    <div onClick={() => setPayment("COD")} className="payment-option">
                        <img src={payment === "COD" ? checked_image : unchecked_image} alt="" />
                        <p>COD</p>
                    </div>
                    <div onClick={() => setPayment("CC")} className="payment-option">
                        <img src={payment === "CC" ? checked_image : unchecked_image} alt="" />
                        <p>Online</p>
                    </div>
                </div>
                <button className='place-order-submit' type='submit'>{payment==="COD"?"Place Order":"Proceed To Payment"}</button>
            </div>
        </form>
    )
}

export default CheckoutPage;
