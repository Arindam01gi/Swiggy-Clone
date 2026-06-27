import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  const {
    cloudinaryImageId,
    name,
    cuisines,
    avgRating,
    sla,
    costForTwo,
    areaName,
  } = resData?.info;

  return (
    <div className="w-full group cursor-pointer transition-all duration-300">
      <div className="relative w-full h-[180px] overflow-hidden rounded-2xl shadow-[0_8px_16px_rgba(0,0,0,0.1)]">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={CDN_URL + cloudinaryImageId}
          alt={name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-white font-bold text-sm tracking-tight capitalize">View Details</span>
        </div>
      </div>

      <div className="mt-3 px-1">
        <h3 className="font-extrabold text-[18px] text-[#282c3f] tracking-tight truncate group-hover:text-[#fc8019] transition-colors">
          {name}
        </h3>

        <div className="flex items-center gap-2 mt-2">
          <div className={`flex items-center gap-1 px-1.5 py-1 rounded-md ${avgRating >= 4 ? 'bg-[#00ad1d]' : 'bg-[#db7c38]'} shadow-sm`}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="inline-block relative -top-[1px]">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="font-extrabold text-[13px] leading-none text-white">{avgRating}</span>
          </div>


          <span className="text-[#3e4152] font-black text-[14px] leading-none">•</span>
          <span className="font-extrabold text-[14px] text-[#3e4152] tracking-tight">{sla?.lastMileTravelString || sla?.slaString}</span>
          <span className="text-[#3e4152] font-black text-[14px] leading-none">•</span>
          <span className="font-extrabold text-[14px] text-[#3e4152] tracking-tight">{costForTwo}</span>
        </div>






        <p className="mt-1 text-[14px] text-[#686b78] truncate font-medium">
          {cuisines.join(", ")}
        </p>

        <p className="text-[14px] text-[#686b78] font-medium italic opacity-80 mt-0.5">
          {areaName}
        </p>
      </div>
    </div>
  );

};


export const withDeliveryTime = () => {
  return (props) => {
    const { resData } = props;

    // console.log(resData);
    // const { header , subHeader } = resData?.info?.aggregatedDiscountInfoV2;

    // console.log(resData?.info.sla);

    const discountInfo = resData?.info?.aggregatedDiscountInfoV3;

    const discountInfoNotEmpty =
      discountInfo && discountInfo.header && discountInfo.subHeader;

    return (
      <>

        {discountInfoNotEmpty && (
          <label className=" absolute text-white py-32 px-6 rounded-lg font-extrabold text-lg h-[20px]">
            {resData?.info?.aggregatedDiscountInfoV3?.header}
            {resData?.info?.aggregatedDiscountInfoV3?.subHeader}
          </label>
        )}

        <RestaurantCard {...props} />
      </>
    );
  };
};

export default RestaurantCard;
