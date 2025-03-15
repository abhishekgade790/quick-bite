import { RES_API } from "../utils/constants";
import { useState, useEffect } from "react";

const useFetch = () => {
  const [resInfo, setResInfo] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(RES_API);
      const data = await response.json();
      const fetchedRestaurants =
        data.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      setResInfo(fetchedRestaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return resInfo;
};

export default useFetch;
