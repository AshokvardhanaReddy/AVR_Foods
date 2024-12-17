import { useContext, useEffect, useState, useRef } from "react";
import { FaCartPlus, FaRegUserCircle, FaShoppingBag } from "react-icons/fa";
import { TbMenu2, TbLogout } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";

import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import logo from "../../assests/logo_1.png";

const Navbar = ({ setShowLogin }) => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const { getTotalCartAmount, token, userRole, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken(false);
    navigate("/");
  };

  const handleMenu = () => {
    setHamburgerMenu((prevState) => !prevState);
  };

  return (
    <div className="navbar">
      <NavLink to="/">
        <img className="logo" src={logo} alt="" />
      </NavLink>
      <ul className={hamburgerMenu ? "hamburger-menu" : "navbar-menu"}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) => (isActive ? "active" : "")}
          
        >
          Menu
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Products
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </NavLink>
        {token && userRole ? <NavLink to = "/admin" className = {({isActive}) => (isActive ? "active" : "") }  >Admin Panel</NavLink> : "" }
        
      </ul>
      <div className="navbar-right">
        <i className="navbar-menu-icon" onClick={handleMenu}>
          {!hamburgerMenu ? <TbMenu2 /> : <IoMdClose />}
        </i>

        <NavLink to="/cart" className="navbar-search-icon">
          <i>
            <FaCartPlus />
          </i>
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div>
        </NavLink>

        {!token ? (
          <button
            onClick={() => {
              setShowLogin(true);
            }}
          >
            sign in
          </button>
        ) : (
          <div className="navbar-profile">
            <i>
              <FaRegUserCircle />
            </i>
            <ul className="navbar-profile-dropdown">
              <li onClick={() => {token && userRole ? navigate("/admin/customer-orders") : navigate("/my-orders")}}>
                <i>
                  <FaShoppingBag />
                </i>
                <p>Orders</p>
              </li>

              <hr />
              <li onClick={logout}>
                <i>
                  <TbLogout />
                </i>
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
