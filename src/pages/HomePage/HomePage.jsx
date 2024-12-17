import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import PopularItems from '../../components/PopularItems/PopularItems'

const HomePage = () => {

  const [category,setCategory] = useState("All");

  return (
    <>
    <Header/>
    <PopularItems category = "Samosa" title = "Samosas" />
    <PopularItems category = "Veg" title = "Veg Items" />
    <PopularItems category = "Non Veg" title = "Non-Veg Items" />
    <PopularItems category = "Rolls" title = "Rolls" />
    </>
  )
}

export default HomePage;
