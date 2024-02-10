import { Carousel } from "@material-tailwind/react";

const CDN_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

const ImageCarousel = ({ props }) => {
  console.log(props);
  return (
    <>
      <Carousel className="rounded-xl gap-5" navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}>
           {props?.map((image)=>(
            <img src={`${CDN_URL}${image?.creativeId}`} alt="carousel" className="h-full max-w-[403px] object-cover" key={image?.creativeId}/>
           ))
        }
         </Carousel>
    </>
  );
};
export default ImageCarousel;
