import { useState, useEffect } from "react";
import { MENU_API } from "./constants";

const useFetchMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [offerCard, setOfferCard] = useState([]);
  const [menuCard, setMenuCard] = useState([]);
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, [resId]); // Ensures re-fetching when resId changes

  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_API + resId);
      const json = await data.json();

      setResInfo(json?.data?.cards[2]?.card?.card?.info);

      setOfferCard(
        json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers ||
          []
      );

      const fetchedMenu = json?.data?.cards[4]?.groupedCard?.cardGroupMap
        ?.REGULAR || { cards: [] };

      const allItems = fetchedMenu.cards.filter(
        (item) =>
          item?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      );

      setMenuCard(allItems);
      setcategories(allItems);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  return { resInfo, offerCard, menuCard, categories, setMenuCard };
};

export default useFetchMenu;
