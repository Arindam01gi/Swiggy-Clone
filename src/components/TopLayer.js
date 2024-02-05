import { useState } from "react";

const TopLayer = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const CDN_URL =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

  const suggestionImages =
    props?.props?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info;

  const imagesPerPage = 7;
  const maxIndex = Math.ceil(suggestionImages.length / imagesPerPage) - 1;
  const startIndex = currentIndex * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = suggestionImages.slice(startIndex, endIndex);

  const handlePrevClick = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex(Math.min(currentIndex + 1, maxIndex));
  };

  return (
    <>
      <div className="w-3/4 mt-4 px-4">
        <p className="font-bold text-2xl flex justify-between">
          <span>What's on your mind?</span>
          <span>
            <span
              className={`p-3 cursor-pointer `}
              onClick={handlePrevClick}
            >
              <i className={`fas fa-arrow-left fa-xs ${currentIndex === 0 ? "text-gray-200" : "text-slate-600"} `} ></i>
            </span>
            <span
              className={`p-3 cursor-pointer`}
              onClick={handleNextClick}
            >
              <i className={`fas fa-arrow-right fa-xs  ${currentIndex === maxIndex ? "text-gray-200" : "text-slate-600"} `}></i>
            </span>
          </span>
        </p>

        <div className="my-4 pb-4 gap-4 flex">
        {currentImages.map((image, index) => (
            <img
              key={image.id}
              src={CDN_URL + image.imageId}
              alt={`image-${index}`}
              className="w-[144px] h-[180px]"
            />
          ))}
        </div>

        <hr className="w-full"/>
      </div>
    </>
  );
};

export default TopLayer;
