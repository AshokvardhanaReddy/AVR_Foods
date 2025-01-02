import React, { useEffect, useState } from 'react'
import './ListItems.css'
 import food_image from '../../assests/food.jpg';

 import { MdDeleteForever } from "react-icons/md";


const ListItems = () => {
  const [productList, setProductList] = useState([]);

  const url = "https://srfrozenfoods-server.netlify.app/api/products";

  const fetchList = async () => {
    await fetch(url)
    .then(response => response.json())
    .then(data => {
    setProductList(data);
    })
    .catch(error => console.error('Error fetching posts:', error));
 
  }
  const removeProduct =  async (productId) => {
   await fetch(`${url}/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
   await fetchList();
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b className = "list-item-center" >Category</b>
          <b className = "list-item-center" >Price</b>
          <b className = "list-item-center" >Action</b>
        </div>
        {productList.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={food_image} alt="food img" />
              <p>{item.name}</p>
              <p className = "list-item-center" >{item.category}</p>
              <p className = "list-item-center">&#8377;&nbsp; {item.price}</p>
              <button className='delete-option' onClick={() => removeProduct(item._id)}> <MdDeleteForever className = "delete-icon" /> </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ListItems;
