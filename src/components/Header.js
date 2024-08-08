import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
// import {logo} from '../assets/images/logo'
const Header = () => {
  const [btnName, setBtnName] = useState("Log in");
  const [activeHeader, setActiveHeader] = useState("")
  const [visible, setVisible] = useState(false)
  const location = useLocation();

  const handleClick = () => {
    setVisible(!visible)
  }





  const data = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <>
    <div className="flex justify-between shadow-lg h-[80px] fixed top-0 z-20 bg-white w-full ">
      <div className="justify-center items-center mx-3 p-3 w-1/4 flex ">
        <img className="h-[50px] w-[100px] hover:w-[120px]" src={require("../assets/images/swiggy-logo.svg")} alt="logo" />
      </div>

      {/* Web Menu */}
      <div className={`nav-items w-3/6  justify-center items-center  invisible md:visible `} >
        <ul className="p-4 m-4 md:flex  justify-center">
          <li className={`px-4 font-semibold hover:text-orange-500 ${activeHeader === 'home' ? "text-orange-500" : ""}`}>
            <Link to="/">Home</Link>
          </li>
          <li className={`px-4 font-semibold hover:text-orange-500 ${activeHeader === 'about' ? "text-orange-500" : ""}`}>
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

      {/* Mobile Menu  */}
      <div className="visible md:hidden relative ">
        <div className="m-5 pt-2 " onClick={handleClick}>
          {visible ? <i className="fa fa-xmark"></i> : <i className="fas fa-bars"></i>}
        </div>
      </div>
    </div>
    {
          visible && <div className={` visible md:invisible fixed bg-white top-20 right-0 w-1/2 h-screen overflow-y-hidden z-20`} >
            <ul className="   ">
              <li className={`p-3 font-semibold hover:bg-orange-500 hover:text-white text-center ${activeHeader === 'home' ? "text-orange-500" : ""}`}>
                <Link to="/">Home</Link>
              </li>
              <li className={`p-3 font-semibold hover:bg-orange-500 hover:text-white text-center ${activeHeader === 'about' ? "bg-orange-500" : ""}`}>
                <Link to="/about">About Me</Link>
              </li>
              <li className="p-3 font-bold  hover:bg-orange-500 text-center hover:text-white">
                <Link to="/cart">
                  <span className="p-1">
                    <i className="fas fa-cart-shopping"></i>
                  </span>
                  ({cartItems.length})
                </Link>
              </li>
              <button
                className="font-semibold hover:bg-orange-500 hover:text-white p-3 w-full"
                onClick={() => {
                  btnName === "Log in"
                    ? setBtnName("Log out")
                    : setBtnName("Log in");
                }}
              >
                {btnName}
              </button>
              {/* <li className="p-6 ">{data.loggedInUser}</li> */}
            </ul>
          </div>
        }

    </>
  );
};

export default Header;
