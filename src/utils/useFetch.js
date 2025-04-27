import { useState, useEffect } from "react";

const useFetch = () => {
  const [resInfo, setResInfo] = useState([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null);      

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://quickbite-proxy.onrender.com/restaurants");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        console.log("Fetched Data:", data); // 👈 Add console to check what you are getting

        const fetchedRestaurants =
          data.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

        setResInfo(fetchedRestaurants);
      } catch (error) {
        console.error("Fetch Error:", error); // 👈 Log error clearly
        setError("Error fetching data: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { resInfo, loading, error };
};

export default useFetch;
