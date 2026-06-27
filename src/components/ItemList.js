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

  const handleIncrease = (item) => dispatch(incrementItem(item));
  const handleDecrease = (item) => dispatch(removeItems(item));
  const handleAddItem = (item) => dispatch(addItems(item));

  return (
    <div className="bg-white">
      {items.map((item) => {
        const itemInCart = cartItems.find((cartItem) => cartItem?.card?.info?.id === item.card.info.id);
        const { name, price, defaultPrice, description, imageId, itemAttribute, ratings } = item.card.info;
        const avgRating = ratings?.aggregatedRating?.rating;

        return (
          <div
            key={item.card.info.id}
            className="flex justify-between items-start py-8 border-b border-gray-100 last:border-0 group animate-fade-in"
          >
            <div className="flex-1 pr-8">
              <div className="flex items-center gap-2 mb-2">
                {itemAttribute?.vegClassifier === "VEG" ? (
                  <div className="w-[18px] h-[18px] border-2 border-green-600 flex items-center justify-center p-0.5 rounded-sm"><div className="w-2 h-2 bg-green-600 rounded-full"></div></div>
                ) : (
                  <div className="w-[18px] h-[18px] border-2 border-red-600 flex items-center justify-center p-0.5 rounded-sm"><div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[10px] border-b-red-600"></div></div>
                )}
                {avgRating && (
                  <span className="flex items-center gap-1 text-[#ee9c00] text-[12px] font-extrabold ml-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="#ee9c00">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    {avgRating}
                  </span>
                )}
              </div>

              <h3 className="text-[18px] font-extrabold text-[#3e4152] mb-1 font-['Lexend'] tracking-tight">{name}</h3>
              <p className="text-[15px] font-extrabold text-[#3e4152] mb-3">₹{((price || defaultPrice) / 100).toFixed(2)}</p>

              <p className="text-[14px] text-[#282c3f] opacity-45 font-medium leading-relaxed max-w-sm line-clamp-2">
                {description}
              </p>
            </div>


            <div className="relative">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-md group-hover:shadow-lg transition-all border border-gray-50">
                {imageId ? (
                  <img
                    src={URL + imageId}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    alt={name}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                    <i className="fa-solid fa-utensils text-gray-200 text-2xl"></i>
                  </div>
                )}
              </div>

              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-9">
                {itemInCart ? (
                  <div className="bg-white flex items-center justify-between border border-gray-200 rounded-lg shadow-xl px-2 h-full w-full overflow-hidden">
                    <button
                      onClick={() => handleDecrease(item)}
                      className="text-[#60b246] font-black text-xl hover:scale-110 transition-transform w-8 h-full flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-[#60b246] font-black text-sm tabular-nums">{itemInCart.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item)}
                      className="text-[#60b246] font-black text-xl hover:scale-110 transition-transform w-8 h-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAddItem(item)}
                    className="bg-white text-[#60b246] font-black text-[14px] rounded-lg shadow-xl border border-gray-200 w-full h-full hover:bg-gray-50 transition-all uppercase tracking-tight flex items-center justify-center"
                  >
                    Add
                  </button>
                )}
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ItemList;
