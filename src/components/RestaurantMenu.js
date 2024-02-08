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

  const {
    name,
    cuisines,
    costForTwoMessage,
    sla,
    areaName,
    feeDetails,
    totalRatingsString,
    avgRating,
  } = resInfo?.cards[0]?.card?.card?.info;

  const offerDetails =
    resInfo?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.offers;

  // console.log("abc", offerDetails);

  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  const carousel  =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card
      ?.carousel;

  const categories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      // || c.card?.card?.["@type"] ===
      // "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    );

  return (
    <div className="text-center  ">
      <div className="flex justify-center align-center ">
        <div className=" flex justify-between w-1/2 px-2 border-gray-200 border-b-2">
          <div className="w-3/4 text-left my-6">
            <h1 className="font-bold  text-xl">{name}</h1>
            <p className="text-slate-500 text-sm mt-2">{cuisines.join(" ,")}</p>
            <p className="text-slate-500 text-sm">
              {areaName}
              <span>
                &nbsp;,&nbsp;
                {sla?.lastMileTravelString}
              </span>
            </p>
            <p className="text-slate-500 text-sm mt-2">
              <span className="mr-2">
                <i className="fa-regular fa-person-biking font-bold"></i>
              </span>
              {feeDetails.message}
            </p>
          </div>

          <div className="w-1/4 pt-10">
            <button className=" min-w-[80px] border border-gray-200 text-center rounded-lg">
              <div className="my-2">
                <span className="text-green-600 ">
                  <span className="">
                    <i className="fa-solid fa-star"></i>
                  </span>
                  <span className="font-bold">{avgRating}</span>
                </span>
              </div>
              <hr className="w-3/4 ml-3 " />
              <div className="my-3 font-sans text-xs font-bold text-slate-400">
                {totalRatingsString}
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center align-center ">
        <div className="flex mt-3  w-1/2 gap-4">
          <div className="text-slate-700 flex items-center gap-2">
            <svg
              className="RestaurantTimeCost_icon__8UdT4"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <circle
                r="8.35"
                transform="matrix(-1 0 0 1 9 9)"
                stroke="#3E4152"
                strokeWidth="1.3"
              ></circle>
              <path
                d="M3 15.2569C4.58666 16.9484 6.81075 18 9.273 18C14.0928 18 18 13.9706 18 9C18 4.02944 14.0928 0 9.273 0C9.273 2.25 9.273 9 9.273 9C6.36399 12 5.63674 12.75 3 15.2569Z"
                fill="#3E4152"
              ></path>
            </svg>
            <span className="font-bold">{sla.slaString}</span>
          </div>
          <div className="text-slate-700 flex items-center gap-2">
            <svg
              className="RestaurantTimeCost_icon__8UdT4"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <circle
                cx="9"
                cy="9"
                r="8.25"
                stroke="#3E4152"
                strokeWidth="1.5"
              ></circle>
              <path
                d="M12.8748 4.495H5.6748V6.04H7.9698C8.7948 6.04 9.4248 6.43 9.6198 7.12H5.6748V8.125H9.6048C9.3798 8.8 8.7648 9.22 7.9698 9.22H5.6748V10.765H7.3098L9.5298 14.5H11.5548L9.1098 10.57C10.2048 10.39 11.2698 9.58 11.4498 8.125H12.8748V7.12H11.4348C11.3148 6.475 10.9698 5.905 10.4298 5.5H12.8748V4.495Z"
                fill="#3E4152"
              ></path>
            </svg>
            <span className="font-bold">{costForTwoMessage}</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center align-center ">
        <div className="flex mt-3 w-1/2 gap-3 cursor-pointer border-gray-200 border-b-2 pb-8">
          {offerDetails && offerDetails.length > 0 ? (
            <>
              {offerDetails.slice(0, 3).map((offer, index) => {
                // console.log("offerDetails", offerDetails);
                return (
                  <div
                    className="min-w-[200px] h-[64px] flex border border-slate-300 rounded-lg hover:min-w-[210px] hover:h-[68px]"
                    key={`${index}-offer`}
                  >
                    {offer?.info?.offerTag === "FLAT DEAL" ? (
                      <div className="vertical-writing text-center mx-1 mt-1 font-bold">
                        FLAT DEAL
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="p-1 flex flex-col justify-center">
                      <p className="flex text-sm gap-2 text-slate-600 font-bold">
                        {offer?.info?.offerLogo ? (
                          <img
                            src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/${offer?.info?.offerLogo}`}
                            className="w-[20px] h-[20px]"
                            alt=""
                          />
                        ) : (
                          <img
                            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_28,h_28/Store_Assets/Icons/OfferIconCart"
                            className="w-[20px] h-[20px]"
                            alt=""
                          />
                        )}

                        {offer.info.header}
                      </p>
                      <p className="small-text pt-2 text-slate-400 font-bold ">
                        {offer.info.couponCode} {offer.info.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    
        <div className="flex justify-center align-center">
          <div className="flex w-1/2 border-gray-200 border-b-2 my-4 pb-4">
            <ImageCarousel props={carousel} />
          </div>
        </div>
      
      {/* Categories Accordian  */}
      {categories.map((category, index) => (
        <RestaurantCategory
          data={category?.card?.card}
          key={category?.card?.card?.title}
          showItems={index === showIndex ? true : false}
          setShowIndex={() => setShowIndex(index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenu;
