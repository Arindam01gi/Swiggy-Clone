import { useDispatch, useSelector } from "react-redux";
import {
  addItems,
  decrementItem,
  incrementItem,
  removeItems,
} from "../utils/cartSlice.js";

const Cart = () => {
  const CDN_URL =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  console.log("cartItems", cartItems);

  const handleClick = (item) => {
    dispatch(addItems(item));
  };
  const handleIncrease = (item) => {
    dispatch(incrementItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItems(item));
  };

  return (
    <>
      <div className="bg-slate-300 flex justify-center h-screen relative top-16 ">
        <div className=" w-full md:w-1/3 bg-white flex justify-center my-3">
          <div className=" w-full text-center mt-2 mx-2">
            <p className="font-bold text-xl text-slate-500 p-2 ">Cart</p>

            <hr />

            <div className="my-3">
              {cartItems && cartItems.length > 0 ? (
                <>
                  {cartItems.map((item, index) => (
                    <div
                      className="my-3 px-6 shadow-lg p-3 flex  justify-between gap-2"
                      key={`${index}-cart`}
                    >
                      <p>
                        {item?.card?.info?.imageId ? (
                          <img
                            key={`image-${index}`}
                            src={CDN_URL + item?.card?.info?.imageId}
                            alt={`image-${index}`}
                            className="w-[50px] h-auto object-contain"
                          />
                        ) : (
                          ""
                        )}
                      </p>
                      <p className="p-1 text-sm text-slate-500 font-normal mt-2 text-left">
                        {item?.card?.info?.name}
                      </p>
                      <div className=" text-center  ">
                        <button className="rounded-sm bg-white text-green-500 w-[96px] mt-2 border border-slate-300">
                          {cartItems && cartItems.length > 0 ? (
                            cartItems.find(
                              (cartItem) =>
                                cartItem?.card?.info?.id === item.card.info.id
                            ) ? (
                              <div className="flex justify-between">
                                <div
                                  className="w-1/3"
                                  onClick={() => handleRemoveItem(item)}
                                >
                                  <span className="text-black text-lg">
                                    &#8722;
                                  </span>
                                </div>
                                <div className="w-1/3 text-base font-medium">
                                  {
                                    cartItems.find(
                                      (cartItem) =>
                                        cartItem?.card?.info?.id ===
                                        item.card.info.id
                                    ).quantity
                                  }
                                </div>
                                <div
                                  className="w-1/3 text-base font-medium"
                                  onClick={() => handleIncrease(item)}
                                >
                                  <span className="">+</span>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="flex justify-center align-center"
                                onClick={() => handleClick(item)}
                              >
                                <div className="w-1/3 text-base font-medium">
                                  {cartItems.find(
                                    (cartItem) =>
                                      cartItem?.card?.info?.id ===
                                      item.card.info.id
                                  )?.quantity || "Add"}
                                </div>
                              </div>
                            )
                          ) : (
                            <div
                              className="flex justify-center align-center"
                              onClick={() => handleClick(item)}
                            >
                              <div className="w-1/3 text-base font-medium">
                                {cartItems.find(
                                  (cartItem) =>
                                    cartItem?.card?.info?.id ===
                                    item.card.info.id
                                )?.quantity || "Add"}
                              </div>
                            </div>
                          )}
                        </button>
                      </div>
                      <p className="p-2 text-sm text-slate-500 font-normal mt-2">
                        {/* ₹{((item?.card?.info?.price / 100) * item.quantity).toFixed(2)} */}
                        ₹
                        {((item?.card?.info?.defaultPrice
                          ? item?.card?.info?.defaultPrice / 100
                          : item?.card?.info?.price / 100) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </>
              ) : (
                <div> Please add item.</div>
              )}
            </div>

            <button className="bg-green-400 text-white m-4 px-4 py-3 rounded-lg shadow-lg">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
