import { useDispatch, useSelector } from "react-redux";
import { URL } from "../utils/url";
import {
  addItems,
  decrementItem,
  incrementItem,
  removeItems,
} from "../utils/cartSlice";

const ItemList = ({ items }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((store) => store.cart.items);

  const handleClick = (item) => {
    dispatch(addItems(item));
  };

  const handleIncrease = (item) => {
    dispatch(incrementItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItems(item));
  };

  console.log("cartItems", cartItems);

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 text-left border-gray-200 border-b-2 "
        >
          <div className="flex justify-between">
            <div className="w-9/12">
              <div className="font-semibold text-base text-gray-700">
                <span>{item?.card?.info?.name}</span>
              </div>
              <div>
                <p className="font-semibold text-base text-gray-700">
                  ₹
                  {item?.card?.info?.defaultPrice
                    ? item?.card?.info?.defaultPrice / 100
                    : item?.card?.info?.price / 100}
                </p>
                <p className="text-sm text-slate-500">
                  {item?.card?.info?.description}
                </p>
              </div>
            </div>
            <div className="w-3/12 px-6  relative">
              {item?.card?.info?.imageId ? (
                <div className="flex my-6">
                  <img
                    src={URL + item?.card?.info?.imageId}
                    className="w-28 rounded-md h-24"
                  />
                </div>
              ) : (
                ""
              )}

              <div className="absolute bottom-1 left-0 right-2 p-2 text-center  ">
                <button className="rounded-sm bg-white text-green-500 w-[96px] py-2 shadow-md">
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
                          <span className="text-black text-lg">&#8722;</span>
                        </div>
                        <div className="w-1/3 text-base font-medium">
                          {
                            cartItems.find(
                              (cartItem) =>
                                cartItem?.card?.info?.id === item.card.info.id
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
                              cartItem?.card?.info?.id === item.card.info.id
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
                            cartItem?.card?.info?.id === item.card.info.id
                        )?.quantity || "Add"}
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
