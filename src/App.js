
import{ useState } from 'react';
import { Routes, Route } from "react-router-dom";

import './App.css';

import Nav from './pages/Navbar/Navbar';

import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from './pages/ProductsPage/ProductsPage';
import CartPage from "./pages/CartPage/CartPage";
import LoginPage from './pages/LoginPage/LoginPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import MyOrdersPage from "./pages/MyOrdersPage/MyOrdersPage";
import AdminPage from './pages/AdminPage/AdminPage';


import AddProduct from "./components/AddProduct/AddProduct";
import ListItems from './components/ListItems/ListItems';
import AdminOrders from "./components/AdminOrders/AdminOrders";
import Footer from './components/Footer/Footer';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPage setShowLogin={setShowLogin} /> : <></>}
      <Nav setShowLogin={setShowLogin} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path = "/checkout" element = {<CheckoutPage/>} />
        <Route path='/my-orders' element={<MyOrdersPage />} />

        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<AddProduct />} />
          <Route path = "add-product" element={<AddProduct />} />
          <Route path="list-items" element={<ListItems />} />
          <Route path="customer-orders" element={<AdminOrders />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
