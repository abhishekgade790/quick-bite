import { RestaurantCard } from "./RestaurantCard";
import { useState, useEffect } from "react";
import ShimmerUI from "./shimmerUI";
import { Link } from "react-router-dom";
import useFetch from "../utils/useFetch";
import useFilter from "../utils/useFilter";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [restaurantsList, setRestaurants] = useState([]);
  const [originalRestaurantsList, setOriginalRestaurants] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const fetchedRestaurants = useFetch();
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (fetchedRestaurants) {
      setRestaurants(fetchedRestaurants);
      setOriginalRestaurants(fetchedRestaurants);
    }
  }, [fetchedRestaurants]);

  const { filterTopRated, resetFilter, isFiltered } = useFilter(
    restaurantsList,
    originalRestaurantsList
  );

  if (!isOnline) {
    return (
      <h1 className="text-center text-xl font-bold text-red-500 mt-10">
        Looks like you are offline! Check your internet connection.
      </h1>
    );
  }

  return originalRestaurantsList.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div className="flex flex-col px-10 py-5 min-h-screen items-center bg-gray-50">
      {/* Search Bar */}
      <div className="flex items-center bg-white w-full max-w-lg justify-between rounded-lg shadow-md hover:shadow-lg  border">
        <input
          className="w-full text-lg p-3 border-none rounded-lg outline-none "
          type="text"
          placeholder="Search for restaurants..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            const filteredList = originalRestaurantsList.filter((res) =>
              res.info.name.toLowerCase().includes(e.target.value.toLowerCase())
            );
            setRestaurants(filteredList);
          }}
        />
        {searchValue ? (
          <button
            className="text-gray-500 hover:text-gray-700 px-2"
            onClick={() => {
              setSearchValue("");
              setRestaurants(originalRestaurantsList);
            }}
          >
            ✖
          </button>
        ) : (
          <span className="text-gray-500 px-2">🔍</span>
        )}
      </div>

      {/* Filter Buttons */}
      <div className="mt-5 font-semibold px-5 py-2 bg-gray-100 text-gray rounded-md shadow-md hover:bg-gray-600 hover:text-white transition">
        <button className="px-1" onClick={() => filterTopRated(setRestaurants)}>
          Top Rated
        </button>
        {isFiltered && (
          <button
            className="ml-3 text-sm "
            onClick={() => resetFilter(setRestaurants)}
          >
            ✖
          </button>
        )}
      </div>

      {/* Restaurant List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-5">
        {restaurantsList.map((res) => (
          <Link key={res.info.id} to={"/restaurants/" + res.info.id}>
            <RestaurantCard resData={res} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
