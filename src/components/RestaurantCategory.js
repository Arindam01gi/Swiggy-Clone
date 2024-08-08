import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {


  const handleSubmit = () => {
    setShowIndex();
  };

  return (
    <div>
      <div className="md:w-1/2 w-11/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 ">
        <div className="flex justify-between" onClick={handleSubmit}>
          <span className="font-bold text-base text-slate-700">
            {data.title} ({  data.itemCards.length})
          </span>
          <span className="cursor-pointer">
            {showItems ? (
              <i className="fa-thin fa-angle-up font-bold"></i>
            ) : (
              <i className="fa-thin fa-angle-down font-bold"></i>
            )}
          </span>
        </div>

        {showItems && <ItemList items={data.itemCards} />}
      </div>
    </div>
  );
};
export default RestaurantCategory;
