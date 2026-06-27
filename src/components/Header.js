import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useSelector, useDispatch } from "react-redux";
import { updateLocation } from "../utils/locationSlice";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  const userLocation = useSelector((state) => state.location);

  const handleLocationDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(updateLocation({ lat: latitude, lng: longitude }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  const navLinks = [
    { name: "Search", icon: "fa-solid fa-magnifying-glass", path: "/" },
    { name: "Offers", icon: "fa-solid fa-percent", path: "/offers" },
    { name: "Support", icon: "fa-solid fa-life-ring", path: "/contact" },
  ];



  return (
    <nav className="fixed top-0 left-0 w-full h-20 bg-white shadow-[0_15px_40px_-20px_rgba(40,44,63,0.15)] z-50 flex items-center transition-all duration-300 font-sans">
      <div className="container mx-auto px-4 flex justify-between items-center h-full max-w-[1200px]">

        <div className="flex items-center gap-10 h-full">
          <Link to="/" className="flex-shrink-0 transition-transform duration-300 hover:scale-110 active:scale-95">
            <img
              className="h-12 w-auto"
              src={require("../assets/images/swiggy-logo.svg")}
              alt="logo"
            />
          </Link>

          <div
            className="hidden sm:flex items-center gap-2 cursor-pointer group py-2"
            onClick={handleLocationDetection}
          >
            <span className="font-extrabold text-[13px] text-[#3d4152] border-b-2 border-[#3d4152] group-hover:text-[#fc8019] group-hover:border-[#fc8019] transition-all">
              Other
            </span>
            <span className="text-[13px] text-[#686b78] truncate max-w-[250px] font-normal group-hover:text-[#3d4152] transition-colors">
              {userLocation.address || "Detecting location..."}
            </span>
            <i className="fa-solid fa-chevron-down text-[#fc8019] text-[10px] group-hover:translate-y-0.5 transition-transform"></i>
          </div>
        </div>

        <div className="hidden md:block">
          <ul className="flex items-center gap-12 font-medium text-[#3d4152] text-[16px]">
            {navLinks.map((link) => (
              <li key={link.name} className="relative group">
                <Link to={link.path} className="flex items-center gap-3 transition-colors hover:text-[#fc8019]">
                  <i className={`${link.icon} text-gray-500 group-hover:text-[#fc8019] transition-colors`}></i>
                  <span className="tracking-tight font-semibold">{link.name}</span>
                </Link>
                <span className="absolute -bottom-7 left-0 w-0 h-0.5 bg-[#fc8019] transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}

            <li className="relative group">
              <Link to="/cart" className="flex items-center gap-3 transition-colors hover:text-[#fc8019]">
                <div className="relative">
                  <i className="fa-solid fa-cart-shopping text-gray-500 group-hover:text-[#fc8019] transition-colors"></i>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-3 -right-3 bg-[#60b246] text-white text-[10px] font-black rounded-sm h-5 px-1.5 flex items-center justify-center border-2 border-white">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <span className="tracking-tight font-semibold">Cart</span>
              </Link>
              <span className="absolute -bottom-7 left-0 w-0 h-0.5 bg-[#fc8019] transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>
        </div>

        <div className="md:hidden flex items-center gap-6">
          <Link to="/cart" className="relative text-xl text-[#3d4152]">
            <i className="fa-solid fa-cart-shopping"></i>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#60b246] text-white text-[9px] font-bold rounded-full h-4 w-4 flex items-center justify-center uppercase">
                {cartItems.length}
              </span>
            )}
          </Link>
          <button className="text-2xl text-[#3d4152]" onClick={handleClick}>
            {visible ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars-staggered"></i>}
          </button>
        </div>
      </div>

      {visible && (
        <div className="fixed inset-0 top-20 bg-[#282c3f]/60 backdrop-blur-sm z-40 md:hidden animate-fade-in" onClick={handleClick}>
          <div
            className="bg-white w-[280px] h-full ml-auto p-8 shadow-2xl animate-fade-in-left flex flex-col gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-2 pb-6 border-b border-gray-100" onClick={handleLocationDetection}>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Address</span>
              <span className="text-[#fc8019] font-bold truncate text-sm">{userLocation.address}</span>
            </div>

            <ul className="flex flex-col gap-8">
              {navLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="flex items-center gap-5 text-[17px] font-bold text-[#3d4152]" onClick={handleClick}>
                    <i className={`${link.icon} text-gray-400 w-6`}></i> {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <button className="mt-auto bg-[#fc8019] text-white py-4 rounded-lg font-bold shadow-[0_8px_20px_-8px_#fc8019] active:scale-95 transition-all">
              Sign In
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
