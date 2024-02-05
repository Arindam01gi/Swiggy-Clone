
import { useEffect ,useState } from "react";
import { RESTAURANT_ITEM_API } from "../utils/constants";

const useRestaurantMenu = (resId) =>{
    useEffect(() => {
        fetchData()
    },[])

   const [resInfo,setResInfo] = useState(null);


    const fetchData = async () =>{
        const data = await fetch(RESTAURANT_ITEM_API + resId)
        const json = await data.json();
        setResInfo(json.data);
    }

    return resInfo;
}

export default useRestaurantMenu;