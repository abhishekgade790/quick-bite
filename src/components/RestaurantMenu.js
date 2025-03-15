import { useEffect, useState } from "react";
import { CDN_URL, MENU_API } from "../utils/constants";
import { useParams } from "react-router-dom";
import useFetchMenu from "../utils/useFetchMenu";

const RestaurantMenu = () => {
  const [searchValue, setSearchValue] = useState("");
  const { resId } = useParams();

  const { resInfo, offerCard, menuCard, originalMenuCard, setMenuCard } =
    useFetchMenu(resId);

  if (!resInfo) {
    return <div>Loading...</div>;
  }

  const {
    name,
    cuisines,
    avgRating,
    areaName,
    costForTwoMessage,
    totalRatingsString,
    sla,
  } = resInfo;
  return (
    <div className="restaurant-menu-wrapper">
      <div className="resInfoContainer">
        <div className="resName-label">
          <h1>{name}</h1>
        </div>
        <div className="res-rating-div">
          <div className="rating-label">
            ⭐{avgRating}({totalRatingsString}) • {costForTwoMessage}
          </div>
          <div className="cuisines-label">{cuisines.join(", ")}</div>
          <div>Outlet {areaName}</div>
          <div>{sla.slaString}</div>
        </div>
      </div>

      <div className="offer-container">
        {offerCard &&
          offerCard.map((offer) => {
            const { couponCode, header, offerLogo, offerIds } = offer.info;
            return (
              <div className="offer-card" key={offerIds[0]}>
                <div className="offer-logo">
                  <img
                    src={
                      "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" +
                      offerLogo
                    }
                    alt="offer-logo"
                  />
                </div>
                <div className="offer-header">
                  <h3>{header}</h3>
                  <p>{couponCode}</p>
                </div>
              </div>
            );
          })}
      </div>

      {/* Menu */}

      <div className="menu-container">
        <h1>Menu</h1>
        <div className="search-dish">
          <input
            type="text"
            placeholder="Search Dishes"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              const filterMenu = originalMenuCard.filter((menu) =>
                menu.card.info.name
                  .toLowerCase()
                  .includes(e.target.value.toLowerCase())
              );
              setMenuCard(filterMenu);
            }}
          />
        </div>
        <div className="menu-items">
          {menuCard &&
            menuCard.map((menu) => {
              const {
                category,
                defaultPrice,
                description,
                id,
                imageId,
                name,
                ratings,
              } = menu?.card?.info;

              return (
                <div key={id}>
                  <div className="menu-item">
                    <div className="menu-data">
                      <h3>
                        {name} - {category}
                      </h3>
                      <p>₹{defaultPrice / 100}</p>
                      <p>
                        ⭐{ratings.aggregatedRating.rating}(
                        {ratings.aggregatedRating.ratingCountV2})
                      </p>
                      <p>{description}</p>
                    </div>
                    <div className="menu-item-image">
                      <img src={CDN_URL + imageId} alt={name} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
