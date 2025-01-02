import React, { useState } from "react";
import "./AddProduct.css";
import upload_image from "../../assests/upload_area.png";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const AddItem = () => {
  const [productImage, setProductImage] = useState(false);
  const {menu_list, url} = useContext(StoreContext)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Samosa",
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!productImage) {
      alert("Image not selected");
      return null;
    }

    const productData = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      category: data.category,
      image: productImage,
    };

    // const url = "https://srfrozenfoods-server.netlify.app/api/products";
    const productPost = await fetch(`${url}products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    if(productPost.ok){
        setProductImage(false);
        setData({
            name: "",
            description: "",
            price: "",
            category: "Veg"
        })
    }
  };
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={
                !productImage ? upload_image : URL.createObjectURL(productImage)
              }
              alt="new Product Imag"
            />
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => {
              setProductImage(e.target.files[0]);
              e.target.value = "";
            }}
            hidden
          />
        </div>

        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            type="text"
            value={data.name}
            placeholder="Enter Product Name"
            name="name"
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="add-product-description flex-col">
          <p>Product description :</p>
          <textarea
            type="text"
            rows={6}
            placeholder="Product Description Under 15 Words"
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select name="category" onChange={onChangeHandler}>
              {menu_list.map((item) => <option key={item.menu_name} value={item.menu_name}>{item.menu_name}</option> )}
            </select>
          </div>

          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="Number"
              name="price"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="25"
            />
          </div>
        </div>

        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddItem;
