import React from 'react'
import './Footer.css'
import logo from "../../assests/logo.png";
import { FaFacebook, FaTwitter, FaLinkedinIn   } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <img className = "footer-company-logo" src={logo} alt="" />
      <div className="footer-content">
        <div className="footer-content-left">
          <h2>About</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        </div>

        <div className="footer-content-center">
            <h2>AVR Foods</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>

        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 - 7013332337</li>
                <li>srfrozenfoods2024@gamil.com</li>
            </ul>
            <div className="footer-social-icons">
                <i><FaFacebook /></i>
                <i><FaTwitter /></i>
                <i><FaLinkedinIn /></i>
            </div>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2024 © AVR Foods - All Right Reserved | Designed By Ashokvardhan</p>
    </div>
  )
}

export default Footer
