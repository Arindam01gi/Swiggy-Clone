import { useState } from "react";

const TopLayer = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const CDN_URL =
    "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

  const suggestionImages =
    props?.props?.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info || [];

  const imagesPerPage = {
    base: 3,
    md: 5,
    lg: 7
  };

  // Simplified pagination for demo - in real app would use a carousel library
  const maxIndex = Math.max(0, Math.ceil(suggestionImages.length / 7) - 1);

  const handlePrevClick = () => {
    setCurrentIndex(Math.max(currentIndex - 1, 0));
  };

  const handleNextClick = () => {
    setCurrentIndex(Math.min(currentIndex + 1, maxIndex));
  };

  return (
    <div className="w-full mt-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-extrabold text-[24px] text-[#282c3f] tracking-tight">What's on your mind?</h2>

        <div className="flex gap-2">
          <button
            className={`p-2 rounded-full transition-colors ${currentIndex === 0 ? "bg-gray-100 text-gray-300" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onClick={handlePrevClick}
            disabled={currentIndex === 0}
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button
            className={`p-2 rounded-full transition-colors ${currentIndex === maxIndex ? "bg-gray-100 text-gray-300" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            onClick={handleNextClick}
            disabled={currentIndex === maxIndex}
          >
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-4 pb-4 snap-x">
        {suggestionImages.map((image, index) => (
          <div key={image.id || index} className="flex-shrink-0 snap-start">
            <img
              src={CDN_URL + image.imageId}
              alt={`suggestion-${index}`}
              className="w-32 h-36 md:w-36 md:h-40 object-contain hover:scale-105 transition-transform cursor-pointer"
            />
          </div>
        ))}
      </div>

      <hr className="my-8 border-gray-100" />
    </div>
  );
};


export default TopLayer;
