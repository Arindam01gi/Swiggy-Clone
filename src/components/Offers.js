import { useState, useEffect } from "react";
import { GET_RESTAURANTS_API } from "../utils/constants";
import RestaurantCard, { withDeliveryTime } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Offers = () => {
    const [offersList, setOffersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useSelector((state) => state.location);
    const RestaurantCardWithOffer = withDeliveryTime(<RestaurantCard />);

    useEffect(() => {
        fetchOffers();
    }, [location.lat, location.lng]);

    const fetchOffers = async () => {
        try {
            setLoading(true);
            const data = await fetch(GET_RESTAURANTS_API(location.lat, location.lng));
            const json = await data.json();

            const restaurants = json?.data?.cards?.find(
                (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
            )?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

            // Filter restaurants that have some form of offer/discount
            const restaurantsWithOffers = restaurants.filter(res =>
                res?.info?.aggregatedDiscountInfoV3 ||
                res?.info?.aggregatedDiscountInfoV2 ||
                res?.info?.costForTwo
            );

            setOffersList(restaurantsWithOffers);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching offers:", error);
            setLoading(false);
        }
    };

    if (loading) return <Shimmer />;

    return (
        <main className="pt-32 pb-20 bg-white min-h-screen">
            <div className="container mx-auto px-4 max-w-[1200px]">
                <header className="mb-12">
                    <h1 className="text-[28px] font-extrabold text-[#282c3f] tracking-tight font-['Lexend']">
                        Offers for you
                    </h1>
                    <p className="text-[#686b78] font-medium text-[15px] mt-1 italic opacity-80">
                        Explore best deals and early access offers in {location.address}
                    </p>
                </header>

                {offersList.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                            <i className="fa-solid fa-percent text-3xl text-gray-300"></i>
                        </div>
                        <h2 className="text-xl font-extrabold text-[#282c3f]">No Offers Available</h2>
                        <p className="text-gray-500 mt-2">We couldn't find any active deals in your area right now.</p>
                        <Link to="/" className="mt-8 bg-[#fc8019] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">
                            Browse All Restaurants
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
                        {offersList.map((restaurant) => (
                            <Link
                                key={restaurant.info.id}
                                to={"/restaurant/" + restaurant.info.id}
                                className="transition-all duration-500 hover:scale-[0.96]"
                            >
                                <div className="relative">
                                    <RestaurantCardWithOffer resData={restaurant} />
                                    <div className="absolute top-3 left-3 bg-[#fc8019] text-white text-[10px] font-black px-2 py-1 rounded shadow-md uppercase tracking-wider animate-bounce">
                                        Active Offer
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};


export default Offers;
