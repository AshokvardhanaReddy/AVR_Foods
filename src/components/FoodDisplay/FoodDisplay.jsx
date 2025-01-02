import React, { useContext } from 'react'
import './FoodDisplay.css'
import FoodItem from '../FoodItems/FoodItem'
import { StoreContext } from '../../context/StoreContext'
import food_image from "../../assests/food.jpg";


const FoodDisplay = ({category}) => {

  const {food_list} = useContext(StoreContext);


  return (
    <div className='food-display' id='food-display'>
      <h2>{category ===  "All" ? `${category} Items :` : `List of ${category} Items :`} </h2>
      <div className='food-display-list'>
        {food_list.forEach((item)=>{
          if (category==="All" || category===item.category) {
            return <FoodItem key={item._id} image={food_image} name={item.name} desc={item.description} price={item.price} product = {item} id = {item._id} />
          }
        })}
      </div>
    </div>
  )
}

export default FoodDisplay

