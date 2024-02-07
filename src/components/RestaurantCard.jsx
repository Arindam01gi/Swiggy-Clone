import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;

  // console.log("resData",resData)

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
    <div className="w-64 h-[270px] mx-0 my-2 rounded-xl image  ">
      <img
        className="w-[270px] h-[165px]  m-1 rounded-xl cursor-pointer"
        src={CDN_URL + cloudinaryImageId}
        alt="res-logo"
      />
      <h3 className=" mx-3 font-bold  font-sans text-base text-slate-700">
        {name}
      </h3>
      <h4 className="mx-3 font-bold text-sm text-slate-700">
        <span className="mr-2">
          <i className="fa-solid fa-star text-green-600"></i>
        </span>
        {avgRating} •<span className="ml-2">{sla.slaString}</span>
      </h4>
      <h4 className=" mx-3 my-1  text-sm text-slate-500">
        {cuisines.slice(0, 3).join(", ")}
        {cuisines.length > 3 ? " ..." : ""}
      </h4>
      <h4 className="mx-3 text-sm text-slate-500">{areaName}</h4>
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
