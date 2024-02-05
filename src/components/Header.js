import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
const Header = () => {
  const [btnName, setBtnName] = useState("Log in");

  const data = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between shadow-lg">
      <div className="justify-center">
        <img className="max-h-20" src={LOGO_URL} alt="logo" />
      </div>
      <div className="nav-items">
        <ul className="flex p-4 m-4">
          <li className="px-4 font-bold">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4 font-bold">
            <Link to="/about">About Me</Link>
          </li>
          {/* <li className="px-4 font-bold">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-4 font-bold">
            <Link to="/grocery">Grocery</Link>
          </li> */}
          <li className="px-4 font-bold text-green-500">
            <Link to="/cart">
            <span className="p-1">
              <i className="fas fa-cart-shopping"></i>
            </span>
            ({cartItems.length})
            </Link>
          </li>
          <button
            className="font-bold"
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
