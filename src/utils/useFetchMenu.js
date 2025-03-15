import { useState, useEffect } from "react";
import { MENU_API } from "./constants";

const useFetchMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  const [offerCard, setOfferCard] = useState([]);
  const [menuCard, setMenuCard] = useState([]);
  const [originalMenuCard, setOriginalMenuCard] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const data = await fetch(MENU_API + resId);
      const json = await data.json();

      setResInfo(json?.data?.cards[2]?.card?.card?.info);

      setOfferCard(
        json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers ||
          []
      );

      const fetchedMenu =
        json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

      const allItems = fetchedMenu
        .flatMap((category) => category?.card?.card?.itemCards || [])
        .filter((item) => item?.card?.info);

      setMenuCard(allItems);
      setOriginalMenuCard(allItems);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  return { resInfo, offerCard, menuCard, originalMenuCard, setMenuCard };
};

export default useFetchMenu;
