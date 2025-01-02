import React, { useContext } from 'react';
import {useNavigate} from "react-router-dom";
import "./PopularItems.css";
import item_image from "../../assests/food.jpg";
import { StoreContext } from '../../context/StoreContext';
import FoodItems from '../FoodItems/FoodItem';

const PopularItems = ({title, category}) => {

  const {food_list} = useContext(StoreContext)
  const navigate = useNavigate();

  // const items_list = food_list.filter((item) => {
  //   if(item.category === category){
  //     return item;
  //   }
  // })

  const items_list = food_list.filter((item) => item.category === category);


  const handleShowAll = () => {
      navigate("/products")
  }

  return (
    <section className = "popular-items-container" >
        <div className = "popular-items-heading">
            <h2>Popular {title} : </h2>
            <p onClick={handleShowAll} >See All</p>
        </div>
        <div className = "popular-items-list" >
          {items_list.map((item) => {
            return <FoodItems key={item._id} image = {item_image} name={item.name} desc={item.description} price={item.price} id={item._id}  />
          })}
        </div>
      
    </section>
  )
}

export default PopularItems
