import RestaurantCard, { withDeliveryTime } from "./RestaurantCard";
import { useState, useEffect } from "react";
import { SWIGGY_API_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import TopLayer from "./TopLayer";
import { Button } from "@material-tailwind/react";

const Body = () => {
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [suggestionData, setSuggestionData] = useState([]);
  const [restaurantChain, setRestaurantChain] = useState([]);
  const [restaurantChainHeader, setRestaurantChainHeader] = useState("");
  const [deliveryListHeader, setDeliveryListHeader] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeButton, setActiveButton] = useState(null);

  const RestaurantCardWithOffer = withDeliveryTime(<RestaurantCard />);

  const restaurantPerPage = 4;
  const maxIndex = Math.ceil(restaurantChain.length / restaurantPerPage) - 1;
  const startIndex = currentIndex * restaurantPerPage;
  const endIndex = startIndex + restaurantPerPage;
  const currentRestaurant = restaurantChain.slice(startIndex, endIndex);

  useEffect(() => {
    fetchData();
  }, []);

  const onlineStatus = useOnlineStatus();
  // console.log("body rendered");
  const fetchData = async () => {
    const data = await fetch(SWIGGY_API_URL);
    const json = await data.json();

    // console.log(json.data.cards);

    setListOfRestraunt(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurant(
      json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setSuggestionData(json?.data);
    setRestaurantChain(
      json?.data?.cards[1].card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setRestaurantChainHeader(json?.data?.cards[1].card?.card?.header?.title);
    setDeliveryListHeader(json?.data?.cards[2]?.card?.card?.title);
  };

  const handlePrevClick = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex(Math.min(currentIndex + 1, maxIndex));
  };

  const handleRating = () => {
    const filterData = listOfRestaurants.filter(
      (res) => res.info.avgRating > 4.3
    );
    setFilteredRestaurant(filterData);
    setActiveButton("rating");
  };

  const handleFastDelivery = () => {
    const filterData = listOfRestaurants.filter(
      (res) => res.info?.sla?.deliveryTime < 40
    );
    setFilteredRestaurant(filterData);
    setActiveButton("delivery");
  };

  const handleFastVeg = () => {
    const filterData = listOfRestaurants.filter((res) => res.info.veg == true);
    setFilteredRestaurant(filterData);
    setActiveButton("veg");
  };

  const handleAll = () => {
    const filterData = listOfRestaurants;
    setFilteredRestaurant(filterData);
    setActiveButton("all");
  };

  if (onlineStatus === false) {
    return (
      <h1>
        Looks like you are offline!! Please check your internet connectivity.
      </h1>
    );
  }

  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className=" overflow-x-hidden">
      {/* <div className="flex justify-between p-4 m-4">
        <div className="search">
          <input
            type="text"
            className="border border-solid border-gray-500 h-10 "
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
          className="border text-white rounded-lg h-10 px-4 py-1"
           style={{backgroundColor:"#FF8702"}}
            onClick={() => {
              const filteredRestaurant = listOfRestaurants.filter((res) =>
                res.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              console.log(filteredRestaurant);
              setFilteredRestaurant(filteredRestaurant);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="bg-gray-200 px-4 py-2 mx-2 rounded-md"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res.info.avgRating > 4.4
            );
            setFilteredRestaurant(filteredList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div> */}
      <div className="flex justify-center align-center ">
        <TopLayer props={suggestionData} />
      </div>
      <div className="flex justify-center align-center ">
        <div className="w-3/4 xl:w-4/5 tablet:w-11/12">
          <p className="font-bold text-2xl flex justify-between mt-4 px-4">
            <span>{restaurantChainHeader}</span>
            <span className="flex gap-2 ">
              <span
                className={` cursor-pointer active ${
                  currentIndex === 0 ? "bg-gray-200" : "bg-slate-300"
                }`}
                onClick={handlePrevClick}
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  aria-hidden="true"
                  strokecolor="rgba(2, 6, 12, 0.92)"
                  fillcolor="rgba(2, 6, 12, 0.92)"
                >
                  <path
                    d="M7.46869 3.43394C7.79171 3.13249 8.29794 3.14998 8.59939 3.473C8.90083 3.79602 8.88334 4.30225 8.56033 4.60369L5.0839 7.84795C4.94511 7.97748 4.82252 8.0921 4.71414 8.19502L15.0937 8.19502C15.5355 8.19502 15.8937 8.5532 15.8937 8.99502C15.8937 9.43685 15.5355 9.79502 15.0937 9.79502L4.6665 9.79502C4.78625 9.90939 4.92436 10.0386 5.08389 10.1875L8.51791 13.3922C8.84092 13.6937 8.8584 14.1999 8.55695 14.5229C8.2555 14.8459 7.74927 14.8634 7.42626 14.5619L3.95463 11.3221C3.54648 10.9413 3.18179 10.601 2.92647 10.2871C2.64873 9.94573 2.41671 9.53755 2.41672 9.01769C2.41672 8.49783 2.64874 8.08965 2.92648 7.74824C3.18181 7.43439 3.54649 7.09412 3.95465 6.7133L7.46869 3.43394Z"
                    fill="rgba(2, 6, 12, 0.92)"
                    fillOpacity="0.92"
                  ></path>
                </svg>
                {/* <i
                  className={`fas fa-arrow-left fa-xs ${
                    currentIndex === 0 ? "text-gray-200" : "text-slate-600"
                  } `}
                ></i> */}
              </span>
              <span className={` cursor-pointer active ${
                    currentIndex === maxIndex
                      ? "bg-gray-200"
                      : "bg-slate-300"
                  } `} onClick={handleNextClick}>
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  aria-hidden="true"
                  strokecolor="rgba(2, 6, 12, 0.92)"
                  fillcolor="rgba(2, 6, 12, 0.92)"
                >
                  <path
                    d="M10.5164 3.43418C10.1934 3.13273 9.68714 3.15022 9.3857 3.47324C9.08425 3.79626 9.10174 4.30249 9.42476 4.60394L12.9012 7.84819C13.04 7.97772 13.1626 8.09234 13.2709 8.19527L2.89142 8.19527C2.44959 8.19527 2.09142 8.55344 2.09142 8.99527C2.09142 9.4371 2.44959 9.79527 2.89142 9.79527L13.3186 9.79527C13.1988 9.90964 13.0607 10.0388 12.9012 10.1877L9.46718 13.3924C9.14416 13.6939 9.12668 14.2001 9.42813 14.5231C9.72958 14.8462 10.2358 14.8636 10.5588 14.5622L14.0304 11.3224C14.4386 10.9415 14.8033 10.6012 15.0586 10.2874C15.3364 9.94598 15.5684 9.5378 15.5684 9.01793C15.5684 8.49807 15.3363 8.08989 15.0586 7.74849C14.8033 7.43463 14.4386 7.09437 14.0304 6.71354L10.5164 3.43418Z"
                    fill="rgba(2, 6, 12, 0.92)"
                    fillOpacity="0.92"
                  ></path>
                </svg>
                {/* <i
                  className={`fas fa-arrow-right fa-xs  ${
                    currentIndex === maxIndex
                      ? "text-gray-200"
                      : "text-slate-600"
                  } `}
                ></i> */}
              </span>
            </span>
          </p>
          <div className="mt-2 pb-4 px-4 flex  xl:gap-x-3 md:gap-x-3  md:flex-row md:flex-wrap  flex-col ">
            {currentRestaurant?.map((restaurant) => (
              <Link
                key={restaurant.info.id}
                to={"restaurant/" + restaurant.info.id}
              >
                <RestaurantCardWithOffer resData={restaurant} />
              </Link>
            ))}
          </div>
          <hr className="w-full" />
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div className="w-3/4 xl:w-4/5 tablet:w-11/12">
          <p className=" font-bold text-2xl px-4">{deliveryListHeader}</p>
          <div className="mt-2 flex ml-3 ">
            <Button
              className={`border border-slate-300 px-4 py-2 mx-2 rounded-md font-semibold text-sm text-slate-700 ${
                activeButton === "all" ? "bg-slate-300" : ""
              }`}
              onClick={handleAll}
            >
              All
            </Button>
            <Button
              className={`border border-slate-300 px-4 py-2 mx-2 rounded-md font-semibold text-sm text-slate-700 ${
                activeButton === "rating" ? "bg-slate-300" : ""
              }`}
              onClick={handleRating}
            >
              Rating 4.3+
            </Button>
            <Button
              className={`border border-slate-300 px-4 py-2 mx-2 rounded-md font-semibold text-sm text-slate-700 ${
                activeButton === "veg" ? "bg-slate-300" : ""
              }`}
              onClick={handleFastVeg}
            >
              Veg
            </Button>
            <Button
              className={`border border-slate-300 px-4 py-2 mx-2 rounded-md font-semibold text-sm text-slate-700 ${
                activeButton === "delivery" ? "bg-slate-300" : ""
              }`}
              onClick={handleFastDelivery}
            >
              Fast Delivery
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-center align-center ">
        <div className="w-3/4 xl:w-4/5 tablet:w-11/12 mt-4 px-4">
          <div className=" pb-4  flex  xl:gap-x-3 md:gap-x-4  md:flex-row md:flex-wrap  flex-col overflow-hidden">
            {filteredRestaurant?.map((restaurant) => (
              <Link
                key={restaurant.info.id}
                to={"restaurant/" + restaurant.info.id}
              >
                <RestaurantCardWithOffer resData={restaurant} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
