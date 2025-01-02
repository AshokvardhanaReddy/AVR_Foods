import React, { useState } from 'react'
import Header from '../../components/Header/Header'
import PopularItems from '../../components/PopularItems/PopularItems'

const HomePage = () => {

  // const [category,setCategory] = useState("All");

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
