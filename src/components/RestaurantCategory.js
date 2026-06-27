import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {


  const handleSubmit = () => {
    setShowIndex();
  };

  return (
    <div className="w-full">
      <div className="bg-white border-b-[16px] border-[#f1f1f6] last:border-b-0">
        <div className="p-5 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors select-none" onClick={handleSubmit}>
          <span className="font-extrabold text-[18px] text-[#3e4152] font-['Lexend'] tracking-tight">
            {data.title} ({data.itemCards?.length || 0})
          </span>
          <span className={`text-[#3e4152] text-xl transition-transform duration-300 ${showItems ? 'rotate-180' : ''}`}>
            <i className="fa-solid fa-chevron-down"></i>
          </span>
        </div>

        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showItems ? 'max-h-[5000px] opacity-100 px-5 pb-5' : 'max-h-0 opacity-0'}`}>
          <ItemList items={data.itemCards || []} />
        </div>
      </div>
    </div>


  );
};
export default RestaurantCategory;
