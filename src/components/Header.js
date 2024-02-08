import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
// import {logo} from '../assets/images/logo'
const Header = () => {
  const [btnName, setBtnName] = useState("Log in");
  const [activeHeader,setActiveHeader] = useState("")
  const location = useLocation();





  const data = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between shadow-lg h-[80px] gap-24">
      <div className="justify-center items-center mx-3 p-3 w-1/4 flex ">
        <img className="h-[50px] w-[100px] hover:w-[120px]" src={require("../assets/images/swiggy-logo.svg")} alt="logo" />
      </div>
      <div className={`nav-items w-3/6 flex justify-center items-center`} >
        <ul className="flex p-4 m-4">
          <li className={`px-4 font-semibold hover:text-orange-500 ${activeHeader==='home'?"text-orange-500":""}`}>
            <Link to="/">Home</Link>
          </li>
          <li className={`px-4 font-semibold hover:text-orange-500 ${activeHeader==='about'?"text-orange-500":""}`}>
            <Link to="/about">About Me</Link>
          </li>
          {/* <li className="px-4 font-bold">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-4 font-bold">
            <Link to="/grocery">Grocery</Link>
          </li> */}
          <li className="px-4 font-bold text-green-500 hover:text-orange-500">
            <Link to="/cart">
            <span className="p-1">
              <i className="fas fa-cart-shopping"></i>
            </span>
            ({cartItems.length})
            </Link>
          </li>
          <button
            className="font-semibold hover:text-orange-500"
            onClick={() => {
              btnName === "Log in"
                ? setBtnName("Log out")
                : setBtnName("Log in");
            }}
          >
            {btnName}
          </button>
          {/* <li className="px-4 ">{data.loggedInUser}</li> */}
        </ul>
      </div>
    </div>
  );
};

export default Header;
