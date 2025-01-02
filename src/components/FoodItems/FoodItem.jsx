import React, { useContext } from 'react'
import './FoodItem.css'
import { StoreContext } from '../../context/StoreContext';
import add_icon_green from "../../assests/add_icon_green.png";
import add_icon_white from "../../assests/add_icon_white.png";
import remove_icon_red from "../../assests/remove_icon_red.png";

import { TiStarFullOutline } from "react-icons/ti";



const FoodItem = ({ image, name, price, desc , product, id }) => {
    // const [itemCount, setItemCount] = useState(0);
    const {cartItems,addToCart,removeFromCart,currency} = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={image} alt="food img" />
                {!cartItems[id]
                ? <img className='add' onClick={() => addToCart(id)} src={add_icon_white} alt="food img" />
                :<div className="food-item-counter">
                        <img src={remove_icon_red} onClick={()=>removeFromCart(id)} alt="" />
                        <p>{cartItems[id]}</p>
                        <img src={add_icon_green} onClick={()=>addToCart(id)} alt="" />
                    </div>
                }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p> 
                    <div className = "food-item-rating-star"  >
                        <p>5</p>
                        <TiStarFullOutline className='star-icon'  />
                    </div>
                </div>
                {/* <p className="food-item-desc">{desc}</p> */}
                <p className='food-item-desc' >Food provides essential nutrients for overall health and well-being</p>
                <p className="food-item-price">{currency}{price}</p>
            </div>
        </div>
    )
}

export default FoodItem


