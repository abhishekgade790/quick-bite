import { RestaurantCard } from "./RestaurantCard";
import { useState, useEffect } from "react";
import ShimmerUI from "./shimmerUI";
import { Link } from "react-router-dom";
import useFetch from "../utils/useFetch";
import useFilter from "../utils/useFilter"; // ✅ Import custom hook

const Body = () => {
  const [restaurantsList, setRestaurants] = useState([]);
  const [originalRestaurantsList, setOriginalRestaurants] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  
  const fetchedRestaurants = useFetch();

  useEffect(() => {
    if (fetchedRestaurants) {
      setRestaurants(fetchedRestaurants);
      setOriginalRestaurants(fetchedRestaurants);
    }
  }, [fetchedRestaurants]);

  // ✅ Use the custom hook
  const { filterTopRated, resetFilter, isFiltered } = useFilter(
    restaurantsList,
    originalRestaurantsList
  );

  return originalRestaurantsList.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div className="body">
      <div className="search">
        <input
          type="text"
          placeholder="search"
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
          <i
            className="fas fa-times"
            onClick={() => {
              setSearchValue("");
              setRestaurants(originalRestaurantsList);
            }}
          ></i>
        ) : (
          <i className="fas fa-search"></i>
        )}
      </div>
      <div className="filters-container">
        <div className="top-rated-div">
          <button className="filter-btn" onClick={() => filterTopRated(setRestaurants)}>
            Top Rated
          </button>
          {isFiltered && (
            <i className="fas fa-times" onClick={() => resetFilter(setRestaurants)}></i>
          )}
        </div>
      </div>
      <div className="res-container">
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
