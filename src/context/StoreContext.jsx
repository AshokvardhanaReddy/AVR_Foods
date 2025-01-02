import { createContext, useEffect, useState } from "react";

import { menu_list} from "../assests/assets";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

  const url = "https://srfrozenfoods-server.netlify.app/api/";
  // const url = process.env.SERVER_URL;
  const deliveryCharge = 25;
  const currency = `\u20B9\u00A0`;
  const dot = `\u25CF\u00A0`;

  const [userRole, setUserRole] = useState(false);
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(false);

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const deleteProductFromCart = (itemId) => {
    setCartItems((prevState) => {
      const { [itemId]: _, ...rest } = prevState;
      return rest;
    });
  };
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      try {
        if (cartItems[item] > 0) {
          let itemInfo = food_list.find((product) => product._id === item);
          totalAmount += itemInfo.price * cartItems[item];
        }
      } catch (error) {}
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    // const response = await axios.get(url + "/api/food/list");
    // setFoodList(response.data.data)
  };

  const loadCartData = async (token) => {
    // const response = await axios.post(url + "/api/cart/get", {}, { headers: token });
    // setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData({ token: localStorage.getItem("token") });
      }
    }
    loadData();
    async function loadFoodList() {
      await fetch(`${url}products`)
        .then((res) => res.json())
        .then((data) => setFoodList(data));
    }
    loadFoodList();
  }, [url]);

  const contextValue = {
    url,
    userRole,
    setUserRole,
    food_list,
    menu_list,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    token,
    setToken,
    loadCartData,
    setCartItems,
    deliveryCharge,
    currency,
    dot,
    deleteProductFromCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;