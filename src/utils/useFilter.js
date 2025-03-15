import { useState } from "react";

const useFilter = (restaurantsList, originalRestaurantsList) => {
  const [isFiltered, setIsFiltered] = useState(false);

  const filterTopRated = (setRestaurants) => {
    document.querySelector(".top-rated-div").style.backgroundColor = "#333";
    document.querySelector(".top-rated-div").style.color = "white";
    document.querySelector(".filter-btn").style.color = "white";

    const filteredList = restaurantsList.filter(
      (res) => res.info.avgRating >= 4.6
    );
    setRestaurants(filteredList);
    setIsFiltered(true);
  };

  const resetFilter = (setRestaurants) => {
    document.querySelector(".top-rated-div").style.backgroundColor = "white";
    document.querySelector(".filter-btn").style.color = "black";

    setRestaurants(originalRestaurantsList);
    setIsFiltered(false);
  };

  return { filterTopRated, resetFilter, isFiltered };
};

export default useFilter;
