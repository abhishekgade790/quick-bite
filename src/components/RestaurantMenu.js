import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CDN_URL, OFFER_LOGO_URL } from "../utils/constants";
import useFetchMenu from "../utils/useFetchMenu";
import ShimmerUI from "./shimmerUI";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const { resInfo, offerCard, categories, loading, error } = useFetchMenu(resId);

  const [showIndex, setShowIndex] = useState(null);

  if (loading) {
    return <ShimmerUI />;
  }

  if (error) {
    return (
      <div className="text-center text-xl font-bold text-red-500 mt-10">
        {error}
      </div>
    );
  }

  if (!resInfo) {
    return (
      <div className="text-center text-xl font-bold mt-10">
        No restaurant info available.
      </div>
    );
  }

  const { name, cuisines, avgRating, areaName, costForTwoMessage, totalRatingsString, sla } = resInfo;

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:px-24">
      {/* Restaurant Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{name}</h1>
        <div className="mt-2 text-gray-600">
          <p className="font-semibold">{cuisines.join(", ")}</p>
          <p>Outlet: {areaName}</p>
          <p>{sla.slaString}</p>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <span className="bg-green-500 text-white px-3 py-1 rounded-md font-bold">
            ⭐ {avgRating} ({totalRatingsString})
          </span>
          <span className="text-gray-700">{costForTwoMessage}</span>
        </div>
      </div>

      {/* Offers */}
      {offerCard.length > 0 && (
        <div className="offer-container flex overflow-x-auto gap-4 p-4 scrollbar-hide">
          {offerCard.map(
            ({ info: { couponCode, header, offerLogo, offerIds } }) => (
              <div
                className="offer-card flex min-w-[260px] items-center gap-3 p-4 rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105"
                key={offerIds[0]}
              >
                <img
                  className="w-12 h-12 object-contain"
                  src={`${OFFER_LOGO_URL}${offerLogo}`}
                  alt="offer-logo"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{header}</h3>
                  <p className="text-sm text-gray-600">{couponCode}</p>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Restaurant Categories Accordion */}
      <div>
        {categories.map((category) => (
          <RestaurantCategory
            key={category?.card?.card?.categoryId}
            data={category?.card?.card}
            showItems={showIndex === category?.card?.card?.categoryId}
            setShowIndex={() =>
              setShowIndex((prevIndex) =>
                prevIndex === category?.card?.card?.categoryId
                  ? null
                  : category?.card?.card?.categoryId
              )
            }
          />
        ))}
      </div>
    </div>
  );
};

export default RestaurantMenu;
