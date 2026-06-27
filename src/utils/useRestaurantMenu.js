import { useEffect, useState } from "react";
import { GET_MENU_API } from "../utils/constants";
import { useSelector } from "react-redux";

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);
    const location = useSelector((state) => state.location);

    useEffect(() => {
        fetchData();
    }, [location.lat, location.lng, resId]);

    const fetchData = async () => {
        try {
            const data = await fetch(GET_MENU_API(location.lat, location.lng, resId));
            const json = await data.json();
            setResInfo(json.data);
        } catch (error) {
            console.error("Error fetching menu:", error);
        }
    };

    return resInfo;
};

export default useRestaurantMenu;
