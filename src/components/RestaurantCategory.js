import ItemList from "./ItemList";

const RestaurantCategory = ({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex((prevIndex) =>
      prevIndex === data?.categoryId ? null : data?.categoryId
    );
  };

  return (
    <div className="bg-white  text-gray-700 p-4 my-4 shadow-sm">
      <div
        className="flex justify-between cursor-pointer font-bold"
        onClick={handleClick}
      >
        <span>
          {data?.title} ({data?.itemCards?.length || 0})
        </span>
        <span className="text-gray-700">▼</span>
      </div>

      {showItems && <ItemList items={data?.itemCards} />}
    </div>
  );
};

export default RestaurantCategory;
