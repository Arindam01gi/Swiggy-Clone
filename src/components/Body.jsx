import RestaurantCard, { withDeliveryTime } from "./RestaurantCard";
import { useState, useEffect } from "react";
import { SWIGGY_API_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import TopLayer from "./TopLayer";

const Body = () => {
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [suggestionData, setSuggestionData] = useState([]);
  const [restaurantChain, setRestaurantChain] = useState([]);
  const [restaurantChainHeader, setRestaurantChainHeader] = useState("");
  const [deliveryListHeader, setDeliveryListHeader] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

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
        <div className="w-3/4 mt-4 px-4">
          <p className="font-bold text-2xl flex justify-between">
            <span>{restaurantChainHeader}</span>
            <span>
              <span className={`p-3 cursor-pointer `} onClick={handlePrevClick}>
                <i
                  className={`fas fa-arrow-left fa-xs ${
                    currentIndex === 0 ? "text-gray-200" : "text-slate-600"
                  } `}
                ></i>
              </span>
              <span className={`p-3 cursor-pointer`} onClick={handleNextClick}>
                <i
                  className={`fas fa-arrow-right fa-xs  ${
                    currentIndex === maxIndex
                      ? "text-gray-200"
                      : "text-slate-600"
                  } `}
                ></i>
              </span>
            </span>
          </p>
          <div className="my-6 pb-4 flex flex-wrap gap-4 ">
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

      <div className="flex justify-center mt-6">
        <div className="w-3/4">
          <p className=" font-bold text-2xl px-4">{deliveryListHeader}</p>
          <div className="mt-4">
            <button
              className="border border-slate-300 px-4 py-2 mx-4 rounded-xl font-bold text-base text-slate-600"
              onClick={() => {
                const filteredList = listOfRestaurants.filter(
                  (res) => res.info.avgRating > 4.3
                );
                setFilteredRestaurant(filteredList);
              }}
            >
              Rating 4.3+
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-center align-center ">
        <div className="w-3/4 mt-4 px-4">
          <div className="my-6 pb-4  flex flex-wrap md:gap-4  xs:gap-1 overflow-hidden">
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
