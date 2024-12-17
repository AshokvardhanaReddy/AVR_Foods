import {useState} from 'react'
import "./ProductsPage.css";

import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const ProductsPage = () => {
  const [category,setCategory] = useState("All");
  return (
    <div className = "products-container" >
         <ExploreMenu setCategory={setCategory} category={category}/>
         <FoodDisplay category={category}/>
    </div>
  )
}

export default ProductsPage;
