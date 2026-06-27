import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";
import ImageCarousel from "./ImageCarousel";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(null);

  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  if (resInfo === null) {
    return <Shimmer />;
  }

  // Find the correct card for restaurant info
  const infoCard = resInfo?.cards?.find(card => card?.card?.card?.info)?.card?.card?.info ||
    resInfo?.cards[2]?.card?.card?.info ||
    resInfo?.cards[0]?.card?.card?.info;

  const {
    name,
    cuisines,
    costForTwoMessage,
    sla,
    areaName,
    feeDetails,
    totalRatingsString,
    avgRating,
  } = infoCard || {};

  const offerDetails =
    resInfo?.cards?.find(card => card?.card?.card?.gridElements?.infoWithStyle?.offers)?.card?.card?.gridElements?.infoWithStyle?.offers ||
    resInfo?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.offers;

  const regularCards = resInfo?.cards?.find(card => card?.groupedCard)?.groupedCard?.cardGroupMap?.REGULAR?.cards ||
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;

  const categories = regularCards?.filter(
    (c) =>
      c.card?.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );

  const carousel = regularCards?.find(c => c.card?.card?.carousel)?.card?.card?.carousel;

  if (!infoCard) return <Shimmer />;

  return (
    <div className="pt-24 pb-20 bg-white min-h-screen">
      <div className="container mx-auto max-w-[800px] px-4">
        {/* Restaurant Header */}
        <div className="flex justify-between items-start pb-8 border-b border-dashed border-gray-300">
          <div className="flex-1 pr-4">
            <h1 className="font-extrabold text-[24px] text-[#282c3f] tracking-tight mb-2 font-['Lexend']">{name}</h1>
            <p className="text-[14px] text-[#686b78] font-medium mb-1">{cuisines?.join(", ")}</p>
            <p className="text-[14px] text-[#686b78] font-medium">
              {areaName}, {sla?.lastMileTravelString}
            </p>

            <div className="flex items-center gap-2 mt-4 text-[#686b78] text-[13px] font-medium">
              <i className="fa-regular fa-person-biking text-lg"></i>
              <span>{feeDetails?.message}</span>
            </div>
          </div>

          <div className="flex-shrink-0 flex flex-col items-center justify-center p-3 border border-gray-200 rounded-2xl shadow-sm bg-white min-w-[80px]">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${avgRating >= 4 ? 'bg-[#00ad1d]' : 'bg-[#db7c38]'} shadow-sm mb-2`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="inline-block relative -top-[1px]">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
              <span className="font-extrabold text-[14px] text-white leading-none">{avgRating}</span>
            </div>


            <div className="pt-1 border-t border-gray-100 w-full text-center">
              <span className="text-[10px] font-black text-[#8b8d97] tracking-tight uppercase">{totalRatingsString}</span>
            </div>
          </div>

        </div>


        {/* Time and cost details */}
        <div className="flex items-center gap-8 py-6 text-[#282c3f]">
          <div className="flex items-center gap-3">
            <i className="fa-regular fa-clock text-xl"></i>
            <span className="font-extrabold text-[15px] uppercase tracking-wide">{sla.slaString}</span>
          </div>
          <div className="flex items-center gap-3">
            <i className="fa-solid fa-indian-rupee-sign text-lg border-2 border-[#282c3f] rounded-full w-6 h-6 flex items-center justify-center text-[10px]"></i>
            <span className="font-extrabold text-[15px] uppercase tracking-wide">{costForTwoMessage}</span>
          </div>
        </div>

        {/* Offers Carousel Section */}
        {offerDetails && offerDetails.length > 0 && (
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 mb-8 border-b border-gray-100 scroll-smooth items-stretch flex-nowrap">
            {offerDetails.map((offer, index) => (
              <div
                key={`${index}-offer`}
                className="flex-shrink-0 min-w-[240px] p-4 border border-gray-200 rounded-2xl flex flex-col justify-center gap-2 hover:bg-gray-50 transition-all cursor-pointer group shadow-sm bg-white border-l-4 border-l-[#fc8019]"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/${offer?.info?.offerLogo || 'Store_Assets/Icons/OfferIconCart'}`}
                    className="w-5 h-5 object-contain"
                    alt=""
                  />
                  <span className="font-extrabold text-[15px] text-[#282c3f] group-hover:text-[#fc8019] transition-colors tracking-tight">{offer?.info?.header}</span>
                </div>
                <span className="text-[11px] font-bold text-[#93959f]">{offer?.info?.couponCode} | {offer?.info?.description}</span>
              </div>
            ))}
          </div>
        )}


        {carousel && (
          <div className="mb-10 pb-10 border-b border-gray-100">
            <ImageCarousel props={carousel} />
          </div>
        )}

        {/* Categories Accordian  */}
        <div className="space-y-4">
          {categories.map((category, index) => (
            <RestaurantCategory
              data={category?.card?.card}
              key={category?.card?.card?.title}
              showItems={index === showIndex ? true : false}
              setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>

  );
};


export default RestaurantMenu;
