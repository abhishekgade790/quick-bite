import { useState, useEffect } from "react";

const useFetchMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [offerCard, setOfferCard] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  useEffect(() => {
    if (resId) {
      fetchMenu();
    }
  }, [resId]); // Ensures re-fetching when resId changes

  const fetchMenu = async () => {
    try {
      setLoading(true);  // Start loading before the fetch
      const response = await fetch(`https://quickbite-proxy.onrender.com/menu/${resId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch menu data");
      }
      const json = await response.json();

      // Handle null or invalid responses gracefully
      setResInfo(json?.data?.cards[2]?.card?.card?.info || {});
      
      const offers = json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers || [];
      setOfferCard(offers);

      const fetchedMenu = json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR || { cards: [] };
      const allItems = fetchedMenu.cards.filter(
        (item) => item?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );

      setCategories(allItems);
    } catch (error) {
      setError("Error fetching menu: " + error.message); // Set error message
    } finally {
      setLoading(false); // Set loading to false after the fetch is done
    }
  };

  return { resInfo, offerCard, categories, loading, error };
};

export default useFetchMenu;
