import RestaurantCard, { withDeliveryTime } from "./RestaurantCard";
import { useState, useEffect } from "react";
import { GET_RESTAURANTS_API } from "../utils/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import TopLayer from "./TopLayer";
import { useDispatch, useSelector } from "react-redux";
import { updateLocation } from "../utils/locationSlice";

const Body = () => {
  const [listOfRestaurants, setListOfRestraunt] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [suggestionData, setSuggestionData] = useState([]);
  const [restaurantChain, setRestaurantChain] = useState([]);
  const [restaurantChainHeader, setRestaurantChainHeader] = useState("");
  const [deliveryListHeader, setDeliveryListHeader] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeButton, setActiveButton] = useState("all");

  const location = useSelector((state) => state.location);
  const dispatch = useDispatch();

  const RestaurantCardWithOffer = withDeliveryTime(<RestaurantCard />);

  const restaurantPerPage = 4;
  const maxIndex = Math.ceil(restaurantChain.length / restaurantPerPage) - 1;
  const startIndex = currentIndex * restaurantPerPage;
  const endIndex = startIndex + restaurantPerPage;
  const currentRestaurant = restaurantChain.slice(startIndex, endIndex);

  useEffect(() => {
    // Auto detect location on first load
    if (location.lat === 22.6150956 && location.lng === 88.4185765) {
      handleLocationDetection();
    }
  }, []);

  useEffect(() => {
    fetchData(location.lat, location.lng);
  }, [location.lat, location.lng]);


  const onlineStatus = useOnlineStatus();

  const fetchData = async (lat, lng) => {
    try {
      const data = await fetch(GET_RESTAURANTS_API(lat, lng));
      const json = await data.json();

      const mainCards = json?.data?.cards;

      // Try to find the address from the API response
      const cityCard = mainCards.find(c => c?.card?.card?.localCityName);
      if (cityCard) {
        dispatch(updateLocation({ lat, lng, address: cityCard.card.card.localCityName }));
      } else {
        // Fallback: look for a header that might contain the city
        const chainHeader = mainCards.find(c => c?.card?.card?.header?.title)?.card?.card?.header?.title;
        if (chainHeader && chainHeader.includes("Top restaurant chains in ")) {
          const city = chainHeader.replace("Top restaurant chains in ", "");
          dispatch(updateLocation({ lat, lng, address: city }));
        }
      }

      // Find the correct cards (Swiggy API structure changes based on location)
      const resGrid = mainCards.find(c => c?.card?.card?.gridElements?.infoWithStyle?.restaurants)?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      const chainGrid = mainCards.find(c => c?.card?.card?.id === "top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle?.restaurants || resGrid;

      setListOfRestraunt(resGrid || []);
      setFilteredRestaurant(resGrid || []);
      setSuggestionData(json?.data);
      setRestaurantChain(chainGrid || []);
      setRestaurantChainHeader(mainCards.find(c => c?.card?.card?.header?.title)?.card?.card?.header?.title || "Top restaurant chains");
      setDeliveryListHeader(mainCards.find(c => c?.card?.card?.title)?.card?.card?.title || "Restaurants with online food delivery");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleLocationDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(updateLocation({ lat: latitude, lng: longitude }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get your location. Please enable location permissions.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
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
    setFilteredRestaurant(listOfRestaurants);
    setActiveButton("all");
  };

  if (onlineStatus === false) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold text-red-500">
          Looks like you are offline!!
        </h1>
        <p>Please check your internet connectivity.</p>
      </div>
    );
  }

  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <main className="overflow-x-hidden pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4 max-w-[1200px]">

        {/* TopLayer Section */}
        <section className="mb-14">
          <TopLayer props={suggestionData} />
        </section>

        {/* Restaurant Chains Section */}
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="font-extrabold text-[24px] text-[#282c3f] tracking-tight">{restaurantChainHeader}</h2>
              <p className="text-[14px] text-[#686b78] mt-1 font-medium italic">Handpicked favorites in your neighborhood</p>
            </div>
            <div className="flex gap-3">
              <button
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${currentIndex === 0 ? "bg-gray-100 text-gray-300" : "bg-[#e2e2e7] text-[#282c3f] hover:bg-[#d4d4d9]"
                  }`}
                onClick={handlePrevClick}
                disabled={currentIndex === 0}
              >
                <i className="fa-solid fa-arrow-left text-sm"></i>
              </button>
              <button
                className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 ${currentIndex === maxIndex ? "bg-gray-100 text-gray-300" : "bg-[#e2e2e7] text-[#282c3f] hover:bg-[#d4d4d9]"
                  }`}
                onClick={handleNextClick}
                disabled={currentIndex === maxIndex}
              >
                <i className="fa-solid fa-arrow-right text-sm"></i>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentRestaurant?.map((restaurant) => (
              <Link
                key={restaurant.info.id}
                to={"restaurant/" + restaurant.info.id}
                className="transition-all duration-500 hover:scale-[0.96]"
              >
                <RestaurantCardWithOffer resData={restaurant} />
              </Link>
            ))}
          </div>
        </section>

        <hr className="my-12 border-gray-100" />

        {/* Filters & Regular List Section */}
        <section>
          <div className="mb-10">
            <h2 className="font-extrabold text-[24px] text-[#282c3f] tracking-tight mb-6">{deliveryListHeader}</h2>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div className="flex flex-wrap gap-3 overflow-x-auto no-scrollbar pb-2">
                <button
                  className={`px-5 py-2 rounded-full border text-[14px] font-bold transition-all shadow-sm flex-shrink-0 ${activeButton === "all" ? "bg-[#282c3f] text-white border-[#282c3f]" : "bg-white text-[#282c3f] border-[#e2e2e7] hover:bg-gray-50"
                    }`}
                  onClick={handleAll}
                >
                  All
                </button>
                <button
                  className={`px-5 py-2 rounded-full border text-[14px] font-bold transition-all shadow-sm flex-shrink-0 ${activeButton === "rating" ? "bg-[#282c3f] text-white border-[#282c3f]" : "bg-white text-[#282c3f] border-[#e2e2e7] hover:bg-gray-50"
                    }`}
                  onClick={handleRating}
                >
                  Ratings 4.3+
                </button>
                <button
                  className={`px-5 py-2 rounded-full border text-[14px] font-bold transition-all shadow-sm flex-shrink-0 ${activeButton === "veg" ? "bg-[#282c3f] text-white border-[#282c3f]" : "bg-white text-[#282c3f] border-[#e2e2e7] hover:bg-gray-50"
                    }`}
                  onClick={handleFastVeg}
                >
                  Pure Veg
                </button>
                <button
                  className={`px-5 py-2 rounded-full border text-[14px] font-bold transition-all shadow-sm flex-shrink-0 ${activeButton === "delivery" ? "bg-[#282c3f] text-white border-[#282c3f]" : "bg-white text-[#282c3f] border-[#e2e2e7] hover:bg-gray-50"
                    }`}
                  onClick={handleFastDelivery}
                >
                  Fast Delivery
                </button>
              </div>

              {/* Body Search Bar */}
              <div className="relative group max-w-md w-full">
                <input
                  type="text"
                  placeholder="Search for restaurants..."
                  className="w-full px-12 py-3 bg-[#e2e2e7] bg-opacity-40 rounded-2xl border border-transparent focus:bg-white focus:border-[#fc8019] focus:ring-4 focus:ring-[#fc8019] focus:ring-opacity-10 transition-all outline-none font-medium text-[15px] text-[#282c3f]"
                  value={searchText}
                  onChange={(e) => {
                    const text = e.target.value;
                    setSearchText(text);
                    const filtered = listOfRestaurants.filter((res) =>
                      res.info.name.toLowerCase().includes(text.toLowerCase())
                    );
                    setFilteredRestaurant(filtered);
                  }}
                />
                <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#fc8019] transition-colors"></i>
                {searchText && (
                  <button onClick={() => { setSearchText(""); setFilteredRestaurant(listOfRestaurants); }} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors">
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>
            </div>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {filteredRestaurant?.map((restaurant) => (
              <Link
                key={restaurant.info.id}
                to={"restaurant/" + restaurant.info.id}
                className="transition-all duration-500 hover:scale-[0.96]"
              >
                <RestaurantCardWithOffer resData={restaurant} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};


export default Body;
