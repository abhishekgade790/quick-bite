import { useState } from "react";

const useFilter = (restaurantsList, originalRestaurantsList) => {
  const [isFiltered, setIsFiltered] = useState(false);

  const filterTopRated = (setRestaurants) => {
    const filteredList = restaurantsList.filter(
      (res) => res.info.avgRating >= 4.6
    );
    setRestaurants(filteredList);
    setIsFiltered(true);
  };

  const resetFilter = (setRestaurants) => {
    setRestaurants(originalRestaurantsList);
    setIsFiltered(false);
  };

  return { filterTopRated, resetFilter, isFiltered };
};

export default useFilter;
