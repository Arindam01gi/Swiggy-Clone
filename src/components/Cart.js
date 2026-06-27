import { useDispatch, useSelector } from "react-redux";
import {
  addItems,
  decrementItem,
  incrementItem,
  removeItems,
  clearCart,
} from "../utils/cartSlice.js";
import { Link } from "react-router-dom";

const Cart = () => {
  const CDN_URL = "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
  const cartItems = useSelector((store) => store.cart.items);
  const userLocation = useSelector((state) => state.location);
  const dispatch = useDispatch();

  const handleIncrease = (item) => dispatch(incrementItem(item));
  const handleDecrease = (item) => dispatch(removeItems(item));
  const handleClearCart = () => dispatch(clearCart());

  const calculateSubtotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = item?.card?.info?.price || item?.card?.info?.defaultPrice;
      return acc + (price / 100) * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = subtotal > 0 ? 40 : 0;
  const platformFee = subtotal > 0 ? 5 : 0;
  const gst = subtotal * 0.05;
  const total = subtotal + deliveryFee + platformFee + gst;

  if (cartItems.length === 0) {
    return (
      <main className="pt-32 pb-20 bg-white min-h-screen">
        <div className="container mx-auto px-4 flex flex-col items-center justify-center">
          <div className="w-[300px] h-[300px] bg-no-repeat bg-center bg-contain opacity-80 mb-6"
            style={{ backgroundImage: "url('https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_ybi7jt')" }}>
          </div>
          <h2 className="text-xl font-extrabold text-[#282c3f] font-['Lexend']">Your cart is empty</h2>
          <p className="text-gray-400 font-medium text-sm mt-1">You can go to home page to view more restaurants</p>
          <Link to="/" className="mt-8 bg-[#fc8019] text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all active:scale-95">
            See Restaurants Near You
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left: Cart Items & Address */}
          <div className="flex-grow lg:w-[65%] space-y-8">
            {/* Address Placeholder Section */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-start gap-6">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                <i className="fa-solid fa-location-dot text-[#282c3f] text-xl"></i>
              </div>
              <div>
                <h3 className="font-extrabold text-[18px] text-[#282c3f] font-['Lexend'] mb-1">Delivery Address</h3>
                <p className="text-[#686b78] text-[14px] font-medium mb-1 truncate max-w-[400px]">
                  {userLocation.address}
                </p>
                <span className="text-[#fc8019] text-[12px] font-extrabold uppercase tracking-widest cursor-pointer hover:underline">Change</span>
              </div>
            </div>

            {/* Items Section */}
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-xl font-extrabold text-[#282c3f] font-['Lexend'] tracking-tight">Cart Items ({cartItems.length})</h2>
                <button onClick={handleClearCart} className="text-red-500 font-bold text-sm hover:underline">Clear Cart</button>
              </div>

              <div className="space-y-8">
                {cartItems.map((item) => (
                  <div key={item.card.info.id} className="flex items-center gap-6 group">
                    <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                      {item?.card?.info?.imageId ? (
                        <img src={CDN_URL + item.card.info.imageId} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt="" />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center"><i className="fa-solid fa-utensils text-gray-300"></i></div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-1">
                        {item?.card?.info?.itemAttribute?.vegClassifier === "VEG" ? (
                          <i className="fa-solid fa-leaf text-green-500 text-[10px]"></i>
                        ) : (
                          <i className="fa-solid fa-circle text-red-500 text-[10px]"></i>
                        )}
                        <h4 className="font-bold text-[15px] text-[#3e4152]">{item.card.info.name}</h4>
                      </div>
                      <span className="font-bold text-[#686b78] text-sm italic">₹{((item?.card?.info?.price || item?.card?.info?.defaultPrice) / 100).toFixed(2)}</span>
                    </div>

                    <div className="flex items-center border border-gray-200 rounded-lg p-1 gap-4 shadow-sm">
                      <button onClick={() => handleDecrease(item)} className="px-3 py-1 text-[#fc8019] font-black text-xl hover:bg-gray-50 rounded-md transition-colors">−</button>
                      <span className="font-extrabold text-[#fc8019] text-sm">{item.quantity}</span>
                      <button onClick={() => handleIncrease(item)} className="px-3 py-1 text-[#fc8019] font-black text-xl hover:bg-gray-50 rounded-md transition-colors">+</button>
                    </div>

                    <div className="w-24 text-right">
                      <span className="font-extrabold text-[#3e4152]">₹{(((item?.card?.info?.price || item?.card?.info?.defaultPrice) / 100) * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Bill Details */}
          <div className="lg:w-[35%]">
            <div className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 sticky top-28">
              <h3 className="font-extrabold text-lg text-[#282c3f] font-['Lexend'] mb-8 tracking-tight">Bill Details</h3>

              <div className="space-y-4 text-[#686b78] font-medium text-[14px]">
                <div className="flex justify-between items-center">
                  <span>Item Total</span>
                  <span className="text-[#3e4152] font-semibold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delivery Fee | 2.1 kms</span>
                  <span className="text-[#3e4152] font-semibold">₹{deliveryFee.toFixed(2)}</span>
                </div>
                <hr className="border-dashed border-gray-200 my-2" />
                <div className="flex justify-between items-center">
                  <span>Platform Fee</span>
                  <span className="text-[#3e4152] font-semibold">₹{platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>GST and Restaurant Charges</span>
                  <span className="text-[#3e4152] font-semibold">₹{gst.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-[#282c3f]">
                <div className="flex justify-between items-center">
                  <span className="font-black text-[#282c3f] uppercase tracking-wide">To Pay</span>
                  <span className="font-black text-[#282c3f] text-lg">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full mt-8 bg-[#60b246] hover:bg-[#53a43d] text-white py-4 rounded-xl font-black text-[15px] uppercase tracking-widest shadow-lg shadow-green-100 transition-all hover:-translate-y-0.5 active:translate-y-0 active:scale-95">
                Proceed to Pay
              </button>

              <p className="mt-6 text-[10px] text-[#8b8d97] italic text-center font-medium">By placing this order, you agree to our Terms and Conditions.</p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Cart;

