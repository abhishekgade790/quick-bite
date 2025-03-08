import { RestaurantCard } from "./RestaurantCard";
import { useState, useEffect } from "react";
import ShimmerUI from "./shimmerUI";

const Body = () => {
  const [restaurantsList, setRestaurants] = useState([]);
  const [originalRestaurantsList, setOriginalRestaurants] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const filterTopRated = () => {
    document.querySelector(".top-rated-div").style.backgroundColor = "#333";
    document.querySelector(".top-rated-div").style.color = "white";
    document.querySelector(".filter-btn").style.color = "white";
    const filteredList = restaurantsList.filter(
      (res) => res.info.avgRating >= 4.6
    );
    setRestaurants(filteredList);
    setIsFiltered(true);
  };

  const resetFilter = () => {
    document.querySelector(".top-rated-div").style.backgroundColor = "white";
    document.querySelector(".filter-btn").style.color = "black";
    setRestaurants(originalRestaurantsList);
    setIsFiltered(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5204303&lng=73.8567437&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const data = await response.json();
      const fetchedRestaurants =
        data.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      setRestaurants(fetchedRestaurants);
      setOriginalRestaurants(fetchedRestaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
            e.target.value ? setIsSearch(true) : setIsSearch(false);
            setRestaurants(filteredList);
          }}
        />
        {searchValue ? (
          <i
            className="fas fa-times"
            onClick={() => {
              setSearchValue("");
              setRestaurants(originalRestaurantsList);
              setIsSearch(false);
            }}
          ></i>
        ) : (
          <i className="fas fa-search"></i>
        )}
      </div>
      <div className="filters-container">
        <div className="top-rated-div">
          <button className="filter-btn" onClick={filterTopRated}>
            Top Rated
          </button>
          {isFiltered && <i className="fas fa-times" onClick={resetFilter}></i>}
        </div>
      </div>
      <div className="res-container">
        {restaurantsList.map((res) => (
          <RestaurantCard key={res.info.id} resData={res} />
        ))}
      </div>
    </div>
  );
};

export default Body;
